'use strict';

function _(azbn) {
	
	var log_tag = 'oauth2';
	azbn.echo_dev('Handler loaded', log_tag);
	
	var handler = function(req, res) {
		
		var _p = req.params;
		
		switch(_p.uid) {
			
			case 'youtube' : {
				
				var _GOOGLE_OBJECTS_
					, googleClient = require('../../' + azbn.mdl('cfg').path.bound + '/google/createClient')
				;
				
				var scopes = [
					'https://www.googleapis.com/auth/youtube',
					'https://www.googleapis.com/auth/youtube.upload',
					'https://www.googleapis.com/auth/youtube.readonly',
					'https://www.googleapis.com/auth/youtube.force-ssl',
					'https://www.googleapis.com/auth/youtubepartner',
					'https://www.googleapis.com/auth/youtubepartner-channel-audit',
					'https://www.googleapis.com/auth/userinfo.email',
					'https://www.googleapis.com/auth/userinfo.profile',
					'https://www.googleapis.com/auth/calendar',
				];
				
				res.redirect(301, googleClient.genAuthURL(scopes));
				
			}
			break;
			
			default : {
				
				res.send(log_tag);
				
			}
			break;
			
		}
		
	}
	
	return handler;
}

module.exports = _;