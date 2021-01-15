import * as request from 'request';
import * as querystring from 'querystring';

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
	if(res && typeof res === 'object') {
		console.log('res is not null and an object');
		if(res.hasOwnProperty('set') && typeof res.set === 'function') {
			console.log('res has property set and set is a function');
			res.set('Access-Control-Allow-Origin', '*');
			res.set('Access-Control-Allow-Methods', 'GET,POST');
			res.set('Access-Control-Allow-Headers', 'Content-Type');
			const ip = (req.headers['x-forwarded-for'] || req.connection.remoteAddress || '').split(',')[0].trim();
			verifyCaptcha(req.body, ip, res);
		}
	}
}
