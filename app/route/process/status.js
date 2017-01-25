'use strict';

function _(azbn) {
	
	var log_tag = 'process/status';
	azbn.mdl('winston').info('Handler loaded', log_tag);
	
	var handler = function(req, res) {
		
		var m = {};
		
		var _m = process.memoryUsage();
		
		for(var i in _m) {
			m[i] = Math.ceil((_m[i]) / (1024 * 1024));
		}
		
		res.send(m);
		
	}
	
	return handler;
}

module.exports = _;