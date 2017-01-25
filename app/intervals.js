'use strict';

var createIntervals = function(azbn) {
	
	var taskLoader_period = 7777;
	//var taskPause = 128;
	
	var setTask = function(item){
		
		item.data = JSON.parse(item.data);
		
		azbn.mdl('fork').run(item.path, item.data, function(_process, _result){
			
			if(_result.status == 0) {
				_process.kill();
			}
			
		});
		
	};
	
	var taskLoader = setInterval(function(){
		
		var _now = Math.floor(azbn.now() / 1000);
		
		azbn.mdl('mysql').query("SELECT * FROM `" + azbn.mdl('cfg').mysql.t.fork + "` WHERE (status > 0 AND ((lastact + period) < " + _now + ")) ORDER BY id", function(_err, rows, fields) {
			
			if (_err) {
				
				azbn.mdl('winston').warn('Error on load forks: ' + _err);
				
			} else if(rows.length == 0) {
				
				//azbn.mdl('winston').info('No forks in DB!');
				
			} else {
				
				for(var i = 0; i < rows.length; i++) {
					
					(function(item){
						
						var __now = Math.floor(azbn.now() / 1000);
						
						azbn.mdl('mysql').query("UPDATE `" + azbn.mdl('cfg').mysql.t.fork + "` SET lastact = " + __now + " WHERE id = '" + item.id + "'", function (__err, __uresult) {
							
							if(__err) {
								
								azbn.mdl('winston').error('Error on update fork #' + item.id + ': ' + __err);
								
							} else {
								
								//azbn.mdl('winston').info('Set task #' + item.id);
								setTask(item);
								
							}
							
						});
						
					})(rows[i]);
					
				}
				
			}
			
		});
		
	}, taskLoader_period);
	
}

module.exports = createIntervals;