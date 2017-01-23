'use strict';

function AzbNodeForkClient(azbn) {
	
	var log_name = 'AzbNodeForkClient';
	
	var ctrl = {};
	
	var fork = require('child_process').fork;
	
	ctrl.log = function(command) {
		
		if(command && command != '') {
			
			
			
		} else {
			
			
			
		}
		
	}
	
	ctrl.run = function(command, data, cb) {
		
		if(command && command != '') {
			
			ctrl.log(command);
			
			if(data) {
				data = JSON.stringify(data);
			} else {
				data = JSON.stringify({});
			}
			
			data = new Buffer(data).toString('base64');
			
			var _process = fork(__dirname + '/../' + azbn.mdl('cfg').path.fork + '/' + command, [
				data
			], {
				cwd : __dirname + '/../',
			});
			
			_process.on('message', function(msg){
				
				cb(_process, msg);
				
			});
			
		} else {
			
			ctrl.log(command);
			
			cb({});
			
		}
		
	};
	
	return ctrl;
	
}

module.exports = AzbNodeForkClient;