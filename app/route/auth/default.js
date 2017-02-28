'use strict';

function _(azbn) {
	
	var log_tag = 'oauth2';
	azbn.echo_dev('Handler loaded', log_tag);
	
	var handler = function(req, res) {
		
		var q = req.query;
		
		if(q.login == 'login' && q.pass == 'pass') {
			
			var sess = req.session;
			
			if(sess.is_auth) {
				sess.is_auth++;
			} else {
				sess.is_auth = 1;
			}
			//sess.save(function(error){});
			res.send('' + sess.is_auth);
			
		} else {
			
			res.redirect(301, '/');
			
		}
		
	}
	
	return handler;
}

module.exports = _;