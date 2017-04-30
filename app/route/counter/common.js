'use strict';

function _(azbn) {
	
	var log_tag = 'counter/common';
	azbn.echo_dev('Handler loaded', log_tag);
	
	var handler = function(req, res) {
		
		var q = req.query;
		
		// if(q.login == 'login' && q.pass == 'pass') {
		
		/*
		q = {
			h : hostname
			p : port
			lt : localtime
		}
		*/
		q.ip = req.ip;
		
		azbn.mdl('nedb.counter.common').insert({
			created_at : azbn.now(),
			created_at_str : azbn.formattime(),
			q : q,
		});
		
		res.send('');
		
	}
	
	return handler;
}

module.exports = _;