'use strict';

//process.chdir(process.cwd());

var app_id = 2;

var azbn = require('./../../../../../azbnode/LoadAzbnode')({
		root_module : module,
		mdls :{
			include : {
				mysql : true,
				vk : true,
				async : true,
				//antigate : true,
			},
		},
	});

var data = azbn.mdl('fork').parseCliData(process.argv);


azbn.mdl('mysql').connect(function(err){
	
	if(err) {
		
		azbn.mdl('winston').warn('Could not connect to mysql: ' + err);
		
		azbn.mdl('fork').killMe(process, 0, {
			error : err,
		});
		
	} else {
		
		azbn.mdl('vk').loadApps(function(){
			
			var _now = azbn.now_sec();
			//var _moment__border__1iteration = _now - (40 * 60);
			
			azbn.mdl('mysql').query("" +
				"SELECT " +
					"`" + azbn.mdl('cfg').mysql.t.vk.token + "`.id AS token_id, " +
					"`" + azbn.mdl('cfg').mysql.t.vk.token + "`.app_id, " +
					"`" + azbn.mdl('cfg').mysql.t.vk.token + "`.user_id, " +
					"`" + azbn.mdl('cfg').mysql.t.vk.token + "`.access_token, " +
					"`" + azbn.mdl('cfg').mysql.t.vk.addvkfr + "`.lastact, " +
					"`" + azbn.mdl('cfg').mysql.t.vk.addvkfr + "`.p " +
				"FROM " +
					"`" + azbn.mdl('cfg').mysql.t.vk.token + "`, " +
					"`" + azbn.mdl('cfg').mysql.t.vk.addvkfr + "` " +
				"WHERE " +
					"1 " +
					"AND " +
					"(`" + azbn.mdl('cfg').mysql.t.vk.addvkfr + "`.lastact < '" + _moment__border__1iteration + "') " +
					"AND " +
					"(`" + azbn.mdl('cfg').mysql.t.vk.token + "`.stop_at > '" + _now + "') " +
					"AND " +
					"(`" + azbn.mdl('cfg').mysql.t.vk.token + "`.user_id = `" + azbn.mdl('cfg').mysql.t.vk.addvkfr + "`.user_id) " +
					"AND " +
					"(`" + azbn.mdl('cfg').mysql.t.vk.token + "`.app_id = '" + app_id + "') " +
					"AND " +
					"(`" + azbn.mdl('cfg').mysql.t.vk.addvkfr + "`.status = '1') " +
				"ORDER BY " +
					"`" + azbn.mdl('cfg').mysql.t.vk.addvkfr + "`.lastact" +
				"", function(_err, rows, fields) {
				
				if (_err) {
					
					azbn.mdl('winston').error(_err);
					
					azbn.mdl('fork').killMe(process, 0, {
						error : _err,
					});
					
				} else if(rows.length == 0) {
					
					azbn.mdl('fork').killMe(process);
					
				} else {
					
					azbn.mdl('winston').info('Loaded ' + rows.length + ' accounts');
					
					var async_arr = [];
					
					for(var i = 0; i < rows.length; i++) {
						
						(function(item){
							
							async_arr.push(function(callback){
								
								callback(null, null);
								/*
								mainRequest(item, function(){
									azbn.sleep(azbn.mdl('cfg').taskq_pause);
									callback(null, null);
								});
								*/
								
							});
							
						})(rows[i]);
						
					}
					
					azbn.mdl('async').series(async_arr, function (__err, __results) {
						azbn.mdl('fork').killMe(process, 0, {
							error : __err,
							results : __results,
						});
					});
					
				}
				
			});
			
		});
		
	}
});

process.on('exit', function() {
	//azbn.mdl('winston').warn(__filename + ' is stoped');
});

/*
process.on('message', function(msg) {
	console.log(msg);
});
*/