import nodemailer from "nodemailer";

var transport = nodemailer.createTransport({
	host: "sandbox.smtp.mailtrap.io",
	port: 2525,
	auth: {
		// todo all creds on .env
		user: "bd66d20bde818d",
		pass: "46ad50e410f048",
	},
});
