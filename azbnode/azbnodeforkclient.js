'use strict';

function AzbNodeForkClient(azbn) {
	
	var log_name = 'AzbNodeForkClient';
	
	var ctrl = {};
	
	var fork = require('child_process').fork;
	
	ctrl.run = function(command, data, cb) {
		
		if(command && command != '') {
			
			if(data) {
				data = JSON.stringify(data);
			} else {
				data = JSON.stringify({});
			}
			
			var _process = fork(__dirname + '/../' + azbn.mdl('cfg').path.fork + command, [
				data
			], {
				cwd : __dirname,
			});
			
			_process.on('message', function(msg){
				
				if(msg.status == 0) {
					
					_process.kill();
					cb(msg);
					
				}
				
			});
			
		} else {
			
			cb({});
			
		}
		
	};
	
	return ctrl;
	
}

module.exports = AzbNodeForkClient;