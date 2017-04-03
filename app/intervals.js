'use strict';

var NeDB = require('nedb');

var createIntervals = function(azbn) {
	
	
	var taskLoader_period = azbn.mdl('cfg').base_interval;
	//var taskPause = 128;
	
	
	var setTask = function(item){
		
		item.data = JSON.parse(item.data);
		
		azbn.mdl('fork').run(item.path, item.data, function(_process, _result){
			
			if(_result.status == 0) {
				_process.kill();
			}
			
		});
		
	};
	
	
	var runCommand = function(item){
		
		item.data = JSON.parse(item.data);
		
		azbn.mdl('cli').run(item.path, item.data, function(result){
			
			console.log(JSON.stringify(result));
			
		});
		
	}
	
	
	var __connectToTelegramMessageDB = function(){
		
		var actualdb = azbn.get('nedb.tgmessages.actualdb');
		var datestr = '';//('' + new Date().getFullYear() + )
		var nowdate = new Date();
		
		var y = '' + (nowdate.getFullYear() + 0);
		var m = '' + (nowdate.getMonth() + 1);
		var d = '' + (nowdate.getDate() + 0);
		var h = '' + (nowdate.getHours() + 0);
		var i = '' + (nowdate.getMinutes() + 0);
		
		if(m.length === 1) {
			m = '0' + m;
		}
		
		if(d.length === 1) {
			d = '0' + d;
		}
		
		if(h.length === 1) {
			h = '0' + h;
		}
		
		if(i.length === 1) {
			i = '0' + i;
		}
		
		datestr = parseInt(datestr + y + m + d + h + i);
		
		if(datestr == actualdb) {
			
		} else {
			
			actualdb = datestr;
			
			azbn.set('nedb.tgmessages.actualdb', actualdb);
			
			azbn.load('nedb.tgmessages', new NeDB({filename : azbn.mdl('cfg').path.app + '/nedb/tgmessages/' + actualdb + '.nedb'}));
			azbn.mdl('nedb.tgmessages').loadDatabase();
			//azbn.mdl('nedb.entity').ensureIndex({fieldName : 'uid'});
			
		}
		
	};
	
	
	var appTasks = setInterval(function(){
		
		
		__connectToTelegramMessageDB();
		
		
	}, taskLoader_period * 5);
	
	
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
		
		azbn.mdl('mysql').query("SELECT * FROM `" + azbn.mdl('cfg').mysql.t.cli + "` WHERE (status > 0 AND ((lastact + period) < " + _now + ")) ORDER BY id", function(_err, rows, fields) {
			
			if (_err) {
				
				azbn.mdl('winston').warn('Error on load clies: ' + _err);
				
			} else if(rows.length == 0) {
				
				//azbn.mdl('winston').info('No clies in DB!');
				
			} else {
				
				for(var i = 0; i < rows.length; i++) {
					
					(function(item){
						
						var __now = Math.floor(azbn.now() / 1000);
						
						azbn.mdl('mysql').query("UPDATE `" + azbn.mdl('cfg').mysql.t.cli + "` SET lastact = " + __now + " WHERE id = '" + item.id + "'", function (__err, __uresult) {
							
							if(__err) {
								
								azbn.mdl('winston').error('Error on update cli #' + item.id + ': ' + __err);
								
							} else {
								
								//azbn.mdl('winston').info('Set task #' + item.id);
								runCommand(item);
								
							}
							
						});
						
					})(rows[i]);
					
				}
				
			}
			
		});
		
	}, taskLoader_period);
	
	
	__connectToTelegramMessageDB();
	
	
}

module.exports = createIntervals;