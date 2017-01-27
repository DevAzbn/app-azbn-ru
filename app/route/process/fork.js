'use strict';

function _(azbn) {
	
	var log_tag = 'process/fork';
	azbn.echo_dev('Handler loaded', log_tag);
	
	var handler = function(req, res) {
		
		var _p = req.query;
		
		azbn.mdl('taskq').add(function(afterTask){
			
			azbn.mdl('fork').run(_p.uid, {}, function(_process, _result){
				
				if(_result.status == 0) {
					
					_process.kill();
					res.send(_result);
					
					afterTask('default');
					
				}
				
			});
			
		}, azbn.mdl('cfg').taskq_pause, function(res){
			
			// res[0]
			
		});
		
	}
	
	return handler;
}

module.exports = _;