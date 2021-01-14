import request from 'request';
import querystring from 'querystring';

var CONFIG = {
	RECAPTCHA_SECRET_KEY: process.env.RECAPTCHA_SECRET_KEY || '',
}

function verifyCaptcha(data, ip, res) {
	var endpoint = 'https://www.google.com/recaptcha/api/siteverify?';

	endpoint += querystring.stringify({
		'secret': CONFIG.RECAPTCHA_SECRET_KEY,
		'response': data['g-recaptcha-response'],
		'remoteip': ip,
	});

	if (data['g-recaptcha-response'] === undefined || data['g-recaptcha-response'] === '' || data['g-recaptcha-response'] === null) {
		return res.status(200).send(JSON.stringify({
			success: false,
			message: 'No captcha selected',
		}));
	}
		
	request(endpoint, function (error, response, body) {
		body = JSON.parse(body);
				
		// Success will be true or false depending upon captcha validation.
		if (body.success !== undefined && !body.success) {
			return res.status(200).send(JSON.stringify({
				success: false,
				message: 'Invalid captcha. Please try again',
			}));
		} else if(body.success) {
			return res.status(200).send(JSON.stringify({
				success: true,
				message: 'Captcha is verified',
			}));
		}
	});
}

module.exports = (req, res) => {
	res.set('Access-Control-Allow-Origin', '*');
	res.set('Access-Control-Allow-Methods', 'GET,POST');
	res.set('Access-Control-Allow-Headers', 'Content-Type');

	var ip = (req.headers['x-forwarded-for'] || req.connection.remoteAddress || '').split(',')[0].trim();

	verifyCaptcha(req.body, ip, res);
}
