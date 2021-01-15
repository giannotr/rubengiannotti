import axios from 'axios';
import querystring from 'querystring';

const CONFIG = {
	RECAPTCHA_SECRET_KEY: process.env.RECAPTCHA_SECRET_KEY || '',
}

function verifyCaptcha(data, ip, res) {
	let endpoint = 'https://www.google.com/recaptcha/api/siteverify?';

	endpoint += querystring.stringify({
		'secret': CONFIG.RECAPTCHA_SECRET_KEY,
		'response': data['g-recaptcha-response'],
		'remoteip': ip,
	});

	/*
	const endpoint = `https://www.google.com/recaptcha/api/siteverify?${
		querystring.stringify({
			'secret': CONFIG.RECAPTCHA_SECRET_KEY,
			'response': data['g-recaptcha-response'],
			'remoteip': ip,
		})
	}`;
	*/

	if(data['g-recaptcha-response'] === undefined || data['g-recaptcha-response'] === '' || data['g-recaptcha-response'] === null) {
		return res.status(200).send(JSON.stringify({
			success: false,
			message: 'No captcha selected',
		}));
	}

	axios.get(endpoint).then(function(response) {
		const { success } = response.data;
		if(success !== undefined && !success) {
			return res.status(200).send(JSON.stringify({
				success: false,
				message: 'Invalid captcha. Please try again',
			}));
		} else if(success) {
			return res.status(200).send(JSON.stringify({
				success: true,
				message: 'Captcha is verified',
			}));
		}
	}).catch(function(error) {
		return res.status(200).send(JSON.stringify({
			success: false,
			message: error,
		}));
	});
}

module.exports = (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET,POST');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
	const ip = (req.headers['x-forwarded-for'] || req.connection.remoteAddress || '').split(',')[0].trim();
	verifyCaptcha(req.body, ip, res);
}
