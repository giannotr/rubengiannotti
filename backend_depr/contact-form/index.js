var nodemailer = require('nodemailer');

var CONFIG = {
	SMTP_USERNAME: process.env.SMTP_USERNAME || 'smtp_username',
	SMTP_PASSWORD: process.env.SMTP_PASSWORD || 'smtp_password',
	SMTP_HOST: process.env.SMTP_HOST || 'smtp.mailtrap.io',
	SMTP_PORT: parseInt(process.env.SMTP_PORT) || 465,
	SMTP_FROM_NAME: process.env.SMTP_FROM_NAME || 'Ruben Giannotti',
	SMTP_FROM_EMAIL: process.env.SMTP_FROM_EMAIL || 'no-reply@rubengiannotti.com',
	SMTP_FROM_SUBJECT: process.env.SMTP_FROM_SUBJECT || 'Contact form submitted on rubengiannotti.com',
	SMTP_TO: process.env.SMTP_TO || 'mail@rubengiannotti.com,ruben.giannotti@gmx.net',
	REQUIRED_FIELDS: process.env.REQUIRED_FIELDS || 'name,email,message',
	SUCCESS_MESSAGE: process.env.SUCCESS_MESSAGE || 'Thank you, We have received your message',
}

var smtpConfig = {
	host: CONFIG.SMTP_HOST,
	port: CONFIG.SMTP_PORT,
	auth: {
		user: CONFIG.SMTP_USERNAME,
		pass: CONFIG.SMTP_PASSWORD,
	}
}

var transporter = nodemailer.createTransport(smtpConfig);
var now = new Date();

function sendNotification(formData, res) {
	var subject = `${CONFIG.SMTP_FROM_SUBJECT}: ${now.toDateString()}`;

	if(formData['subject'] !== undefined) {
		subject = formData['subject'];
	}

	var mailBody = '';

	for(var key in formData) {
		if (formData.hasOwnProperty(key)) { 
			if(key === 'g-recaptcha-response' || key === 'submit' || key === 'gdpr') continue;
			mailBody += `${key}: ${formData[key]}<br />`;
		}
	}

	transporter.sendMail({
		from: '"mailer.rubengiannotti.com" <' + CONFIG.SMTP_FROM_EMAIL + '>',
		to: CONFIG.SMTP_TO,
		replyTo: formData.email,
		subject: subject,
		html: mailBody,
	}, (error) => {
		if (error) {
			return res.status(500).send(JSON.stringify({
				success: false,
				message: 'Email failed. Please Try Again.',
			}));
		}

		return res.status(200).send(JSON.stringify({
			success: true,
			message: CONFIG.SUCCESS_MESSAGE,
		}));
	});
}

function sendConfirmation(formData) {
	var subject = 'Ihre Kontaktanfrage auf rubengiannotti.com';
	var mailBody = `
Hallo ${formData.name},
<br /><br />
vielen Dank für Ihre Nachricht! Ich werde versuchen, Sie schnellstmöglich zu beantworten.
<br /><br />
Freundlich grüßend,
<br /><br />
Ruben Giannotti
<br /><br />
---
<br /><br />
Ihre Nachricht [${now.toDateString()}]:
<br /><br />
${formData.message}
`;

	transporter.sendMail({
		from: '"' + CONFIG.SMTP_FROM_NAME + '" <' + CONFIG.SMTP_FROM_EMAIL + '>',
		to: formData.email,
		subject: subject,
		html: mailBody.trim(),
	});
}

exports.onSubmit = (req, res) => {
	res.set('Access-Control-Allow-Origin', '*');
	res.set('Access-Control-Allow-Methods', 'GET,POST');
	res.set('Access-Control-Allow-Headers', 'Content-Type');

	var formData = req.body;
	var requiredFields = CONFIG.REQUIRED_FIELDS.split(',');
		
	for (var i = 0; i < requiredFields.length; i++) {
		var field = requiredFields[i].trim();

		if(formData[field] == '') {
			res.send(JSON.stringify({
				success: false,
				message: `${field} field is required`,
			}));
			res.status(200).end();
			return;
		}
	}

	sendNotification(formData, res);
	sendConfirmation(formData);
};
