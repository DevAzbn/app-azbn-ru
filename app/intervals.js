'use strict';

var intr = {
	
};

var task_fnc = {
	
};

var createIntervals = function(azbn) {
	
	var getUid = function(_item) {
		return '_' + parseInt(_item.id);
	}
	
	var add = function(id, time, fnc) {
		intr[id] = setInterval(fnc, time || 1000);
	}
	
	var clear = function(id) {
		clearInterval(intr[id]);
	}
	
	add(getUid({id:0}), 21000, function(){
		
		azbn.mdl('mysql').query("SELECT * FROM `" + azbn.mdl('cfg').mysql.t.fork + "` WHERE 1 ORDER BY id", function(_err, rows, fields) {
			
			if (_err) {
				
				azbn.mdl('winston').warn('Error on load forks: ' + _err);
				
				throw _err;
				
			} else if(rows.length == 0) {
				
				azbn.mdl('winston').warn('No forks in DB!');
				
			} else {
				
				for(var i = 0; i < rows.length; i++) {
					
					var item = rows[i];
					
					(function(item){
						
						var _path = item.path;
						var _period = parseInt(item.period);
						var _status = parseInt(item.status);
						var _on_start = parseInt(item.on_start);
						
						var uid = getUid(item);
						
						if(_status > 0) {
							
							if(intr[uid]) {
								
								
								
							} else {
								
								clear(uid);
								
								task_fnc[uid] = function(){
									
									azbn.mdl('fork').run(_path, {}, function(_process, _result){
										
										if(_result.status == 0) {
											_process.kill();
										}
										
									});
									
									/*
									azbn.mdl('taskq').add(function(afterTask){
										
										//azbn.mdl('winston').info('add task ' + _path);
										
										azbn.mdl('fork').run(_path, {}, function(_process, _result){
											
											if(_result.status < 1) {
												_process.kill();
											}
											
											afterTask(null);
											
										});
										
									}, azbn.mdl('cfg').taskq_pause, function(res){
										
										// res[0]
										
									});
									*/
									
								};
								
								if(_on_start) {
									task_fnc[uid]();
								}
								
								add(uid, _period, task_fnc[uid]);
								
							}
							
						} else {
							
							if(intr[uid]) {
								
								clear(uid);
								delete intr[uid];
								delete task_fnc[uid];
								
							} else {
								
							}
							
						}
						
					})(rows[i]);
					
				}
				
			}
			
		});
		
	});
	
}

module.exports = createIntervals;