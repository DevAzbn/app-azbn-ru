'use strict';

function _(azbn) {
	
	var log_tag = 'process/forever.restart';
	azbn.echo('Handler loaded', log_tag);
	
	var handler = function(req, res) {
		
		//var _p = req.params;
		//process.exit(parseInt(_p.uid) || 0);
		
		var spawn = require('child_process').spawn;
		var forever_restart = spawn('forever', ['restart', azbn.mdl('cfg').process.file]);
		
		res.send('command <forever restart> sended');
	}
	
	return handler;
}

module.exports = _;