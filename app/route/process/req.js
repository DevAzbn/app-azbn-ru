'use strict';

function _(azbn) {
	
	var log_tag = 'process/req';
	azbn.echo_dev('Handler loaded', log_tag);
	
	var handler = function(req, res) {
		
		res.send(req);
		
	}
	
	return handler;
}

module.exports = _;