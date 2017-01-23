'use strict';

function _(azbn) {
	
	var log_tag = 'oauth2callback';
	azbn.mdl('winston').info('Handler loaded', log_tag);
	
	var handler = function(req, res) {
		
		var _p = req.params;
		
		switch(_p.uid) {
			
			case 'youtube' : {
				
				var code = req.query.code;
				
				if(code && code != '') {
					
					azbn.mdl('fork').run('youtube/save.token', {code : code}, function(_process, _result){
						
						if(_result.status == 0) {
							
							_process.kill();
							res.send(_result);
							
						}
						
					});
					
				} else {
					
					res.send('no code');
					
				}
				
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