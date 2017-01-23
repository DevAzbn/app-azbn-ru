'use strict';

function _(azbn) {
	
	var log_tag = 'process/fork';
	azbn.mdl('winston').info('Handler loaded', log_tag);
	
	var handler = function(req, res) {
		
		var _p = req.params;
		
		azbn.mdl('taskq').add(function(afterTask){
			
			azbn.mdl('fork').run(_p.uid, {}, function(resp){
				res.send(resp);
				afterTask('default');
			});
			
		}, azbn.mdl('cfg').taskq_pause, function(res){
			
			// res[0]
			
		});
		
	}
	
	return handler;
}

module.exports = _;