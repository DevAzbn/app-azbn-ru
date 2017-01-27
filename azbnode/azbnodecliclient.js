'use strict';

function AzbNodeCliClient(azbn) {
	
	var log_name = 'AzbNodeCliClient';

	var ctrl = {};

	var spawn = require('child_process').spawn;

	ctrl.log = function(command) {

		//if(command && command != '') {
		//
		//
		//
		//} else {
		//
		//
		//
		//}

	}

	ctrl.run = function(command, _data, cb) {

		ctrl.log(command);

		if(command && command != '') {

			var command_arr = command.split(' ');
			var command_root = command_arr.shift();

			var resp = {
				stdout : [],
				stderr : [],
				code : null,
				timing : 0,
			};

			var timing = new (azbn.mdl('timing')).createTiming(command);

			var cmd_process = spawn(command_root, command_arr);

			cmd_process.stdout.on('data', function(data){
				resp.stdout.push(data.toString('utf8'));
			});

			cmd_process.stderr.on('data', function(data){
				resp.stderr.push(data.toString('utf8'));
			});

			cmd_process.on('close', function(code){
				resp.timing = timing.end();
				resp.code = code;
				cb(resp);
			});

		} else {

			cb({});

		}

	};
	
	return ctrl;
	
}

module.exports = AzbNodeCliClient;