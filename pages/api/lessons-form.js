import nodemailer from 'nodemailer';

const CONFIG = {
	SMTP_USERNAME: process.env.SMTP_USERNAME || 'smtp_username',
	SMTP_PASSWORD: process.env.SMTP_PASSWORD || 'smtp_password',
	SMTP_HOST: process.env.SMTP_HOST || 'smtp.mailtrap.io',
	SMTP_PORT: parseInt(process.env.SMTP_PORT) || 465,
	SMTP_FROM_NAME: process.env.SMTP_FROM_NAME || 'Ruben Giannotti',
	SMTP_FROM_EMAIL: process.env.SMTP_FROM_EMAIL || 'no-reply@rubengiannotti.com',
	SMTP_FROM_SUBJECT: 'Buchungsanfrage für Unterricht (rubengiannotti.com)',
	SMTP_TO: process.env.SMTP_TO || 'mail@rubengiannotti.com,ruben.giannotti@gmx.net',
	REQUIRED_FIELDS: 'year,month,day,selectedTime,email',
	SUCCESS_MESSAGE: process.env.SUCCESS_MESSAGE || 'Thank you, We have received your message',
}

const smtpConfig = {
	host: CONFIG.SMTP_HOST,
	port: CONFIG.SMTP_PORT,
	auth: {
		user: CONFIG.SMTP_USERNAME,
		pass: CONFIG.SMTP_PASSWORD,
	}
}

const transporter = nodemailer.createTransport(smtpConfig);

function genLessonDateTime(data) {
	const { year, month, day, selectedTime } = data;
	const lessonDate = new Date(year, month, day);
	console.log(`${lessonDate.toDateString()}, ${selectedTime}`);
	return `${lessonDate.toDateString()}, ${selectedTime}`;
}

function sendNotification(formData, res) {
	const { email } = formData;
	const lessonDateTime = genLessonDateTime(formData);
	const subject = `${CONFIG.SMTP_FROM_SUBJECT}: ${lessonDateTime}`;
	const mailBody = `E-Mail: ${email} // Termin: ${lessonDateTime}`;

	transporter.sendMail({
		from: '"mailer.rubengiannotti.com" <' + CONFIG.SMTP_FROM_EMAIL + '>',
		to: CONFIG.SMTP_TO,
		replyTo: email,
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
	const lessonDateTime = genLessonDateTime(formData);
	const subject = `${CONFIG.SMTP_FROM_SUBJECT}: ${lessonDateTime}`;
	const mailBody = `
Hallo!
<br /><br />
vielen Dank für Ihre Anfrage für Online-Unterricht. Der angefragte Termin ist: ${lessonDateTime}.
<br /><br />
Ich werde den Termin umgehend prüfen und (hoffentlich) bestätigen. Sie erhalten von mir zusätzlich Informationen zum Honorar und zur technischen Infrastruktur.
<br /><br />
Diese können Sie wiederum prüfen und mir im gleichen Zug ggf. mitteilen, welche Unterrichtsthemen Sie vorrangig interessieren.
<br /><br />
Freundlich grüßend,
<br /><br />
Ruben Giannotti
<br /><br />
	`;

	transporter.sendMail({
		from: '"' + CONFIG.SMTP_FROM_NAME + '" <' + CONFIG.SMTP_FROM_EMAIL + '>',
		to: formData.email,
		subject: subject,
		html: mailBody.trim(),
	});
}

module.exports = (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET,POST');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

	const formData = req.body;
	const requiredFields = CONFIG.REQUIRED_FIELDS.split(',');
		
	for (let i = 0; i < requiredFields.length; i++) {
		const field = requiredFields[i].trim();

		if(!(formData[field] || formData[field] === 0)) {
			res.send(JSON.stringify({
				success: false,
				message: `${field} is required`,
			}));
			res.status(200).end();
			return;
		}
	}

	sendConfirmation(formData);
	sendNotification(formData, res);
};
