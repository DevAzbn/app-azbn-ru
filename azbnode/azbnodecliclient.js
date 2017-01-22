/*
запросы в консоль AzbNode
*/

function AzbNodeCliClient(azbn) {
	
	var log_name = 'AzbNodeCliClient';
	
	var ctrl = this;
	
	ctrl.run = function(command, cb) {
		
		if(command && command != '') {
			
			var command_arr = command.split(' ');
			var command_root = command_arr.shift();
			
			var resp = {
				stdout : [],
				stderr : [],
				code : null,
			};
			
			var spawn = require('child_process').spawn;
			
			var cmd_process = spawn(command_root, command_arr);
			
			cmd_process.stdout.on('data', function(data){
				resp.stdout.push(data.toString('utf8'));
			});
			
			cmd_process.stderr.on('data', function(data){
				resp.stderr.push(data.toString('utf8'));
			});
			
			cmd_process.on('close', function(code){
				resp.code = code;
				cb(resp);
			});
			
		} else {
			
			cb('');
			
		}
		
	};
	
	return ctrl;
	
}

module.exports = AzbNodeCliClient;