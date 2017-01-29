'use strict';

function AzbNodeForkClient(azbn) {
	
	var log_name = 'AzbNodeForkClient';
	
	var ctrl = {};
	
	var fork = require('child_process').fork;

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
		
	};
	
	ctrl.killMe = function(p, status, o) {
		
		o = o || {};
		o.status = status || 0;
		p.send(o);
		
	};
	
	ctrl.run = function(command, data, cb) {

		ctrl.log(command);

		if(command && command != '') {

			var timing = new (azbn.mdl('timing')).createTiming(command);

			var _process = fork(__dirname + '/../' + azbn.mdl('cfg').path.fork + '/' + command, [
				ctrl.getCliData(data)
			], {
				cwd : __dirname + '/../',
			});
			
			_process.on('message', function(msg){

				if(msg.status == 0) {
					msg.timing = timing.end();
				}

				cb(_process, msg);
				
			});
			
		} else {
			
			cb({});
			
		}
		
	};
	
	ctrl.getCliData = function(o) {
		
		var _o = null;
		
		if(o) {
			_o = JSON.stringify(o);
		} else {
			_o = JSON.stringify({});
		}
		
		return new Buffer(_o).toString('base64');
		
	};
	
	ctrl.parseCliData = function(a) {
		if(a && a[2]) {
			return JSON.parse(new Buffer(a[2], 'base64').toString('utf8'));
		} else {
			return {};
		}
	};
	
	return ctrl;
	
}

module.exports = AzbNodeForkClient;