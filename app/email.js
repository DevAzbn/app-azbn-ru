'use strict';

var nodemailer = require('nodemailer');

function createEmail(azbn) {
	
	var ctrl = {};
	
	ctrl.send = function(acc, msg, cb) {

		var transporter = nodemailer.createTransport(acc.transport);

		var mailOptions = {
			from : acc.login,
			to : msg.email,
			subject : msg.subject,
			html : msg.body,
		};

		console.log(JSON.stringify(mailOptions));

		// send mail with defined transport object
		transporter.sendMail(mailOptions, function(_err, info){

			if(_err){

				azbn.mdl('winston').error('Error: ' + _err);

			} else {

				azbn.echo_dev('Message sent to ' + item.email + ': ' + info.response);

			}

			transporter.close();

			cb();

		});

	};
	
	return ctrl;
	
}

module.exports = createEmail;

