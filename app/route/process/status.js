'use strict';

function _(azbn) {
	
	var log_tag = 'process/status';
	azbn.mdl('winston').info('Handler loaded', log_tag);
	
	var handler = function(req, res) {
		
		azbn.mdl('taskq').add(function(afterTask){
			
			azbn.mdl('fork').run('test', {}, function(_process, _result){
				
				if(_result.status == 0) {
					
					res.send(_result);
					_process.kill();
					
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