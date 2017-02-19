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


var mainRequest = function(item, cb){
	
	var _now = azbn.now_sec();
	var _lastact = 30 + Math.floor(Math.random() * (180 + 1 - 30)) + _now;
	var __moment__10days = _now - (azbn.mdl('cfg').vk.period.border10days);
	
	azbn.mdl('mysql').query("UPDATE `" + azbn.mdl('cfg').mysql.t.vk.invite2gr + "` SET lastact = '" + _lastact + "' WHERE user_id = '" + item.user_id + "'", function (__err, __result) {});
	
	var acc = azbn.mdl('vk').account(item);
	
	if(acc) {
		
		azbn.mdl('mysql').query("" +
			"SELECT " +
				"* " +
			"FROM " +
				"`" + azbn.mdl('cfg').mysql.t.log.invite2gr + "` " +
			"WHERE " +
				"1 " +
				"AND " +
				"(user_id = '" + item.user_id + "') " +
				"AND " +
				"(created_at > '" + __moment__10days + "') " +
				"AND " +
				"(success_at = '0') " +
			"ORDER BY " +
					"created_at " +
		"", function(_err, rows, fields) {
			
			if (_err) {
				
				azbn.mdl('winston').error(_err);
				
				cb();
				
			} else if(rows.length == 0) {
				
				cb();
				
			} else {
				
				//cb();
				
				item.p = JSON.parse(item.p) || {};
				
				var ids_arr = [];
				var ids_arr_str = '';
				
				rows.forEach(function(_inv){
					
					ids_arr.push(_inv.to_user_id);
					
				});
				
				ids_arr_str = ids_arr.join(',');
				
				var req = {
					group_id : item.p.group_id,
					user_ids : ids_arr_str,
				};
				
				acc.request('groups.isMember', req, function(resp) {
					
					if(azbn.is_def(resp.error) && !azbn.is_null(resp.error)) {
						
						if(resp.error.error_code == 5) {
							azbn.mdl('mysql').query("UPDATE `" + azbn.mdl('cfg').mysql.t.vk.invite2gr + "` SET lastact = lastact + " + azbn.mdl('cfg').vk.period.on_auth_error + " WHERE user_id = '" + item.user_id + "'", null);
						}
						
						azbn.mdl('vk').saveError(app_id, item.user_id, resp.error, cb);
						
					} else {
						
						if(resp.response.length) {
							
							var items = [];
							for(var i in resp.response) {
								var pr = resp.response[i];
								if(pr.member) {
									items.push(pr.user_id);
								} else {
									
								}
							}
							
							var items_str = items.join(',');
							
							azbn.mdl('mysql').query("UPDATE `" + azbn.mdl('cfg').mysql.t.log.invite2gr + "` SET success_at = '" + azbn.now_sec() + "' WHERE user_id = '" + item.user_id + "' AND to_user_id IN (" + items_str + ") AND success_at = 0", function (__err, __result) {
								cb();
							});
							
						}
						
					}
					
				});
				
				//console.log(req);
				
			}
			
		});
		
	} else {
		
		cb();
		
	}
	
}


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
					"`" + azbn.mdl('cfg').mysql.t.vk.invite2gr + "`.lastact, " +
					"`" + azbn.mdl('cfg').mysql.t.vk.invite2gr + "`.p " +
				"FROM " +
					"`" + azbn.mdl('cfg').mysql.t.vk.token + "`, " +
					"`" + azbn.mdl('cfg').mysql.t.vk.invite2gr + "` " +
				"WHERE " +
					"1 " +
					//"AND " +
					//"(`" + azbn.mdl('cfg').mysql.t.vk.invite2gr + "`.lastact < '" + _moment__border__1iteration + "') " +
					"AND " +
					"(`" + azbn.mdl('cfg').mysql.t.vk.token + "`.stop_at > '" + _now + "') " +
					"AND " +
					"(`" + azbn.mdl('cfg').mysql.t.vk.token + "`.user_id = `" + azbn.mdl('cfg').mysql.t.vk.invite2gr + "`.user_id) " +
					"AND " +
					"(`" + azbn.mdl('cfg').mysql.t.vk.token + "`.app_id = '" + app_id + "') " +
					"AND " +
					"(`" + azbn.mdl('cfg').mysql.t.vk.invite2gr + "`.status = '1') " +
				"ORDER BY " +
					"`" + azbn.mdl('cfg').mysql.t.vk.invite2gr + "`.lastact" +
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
								
								//azbn.sleep(azbn.mdl('cfg').taskq_pause);
								//console.log(item);
								//callback(null, null);
								
								mainRequest(item, function(){
									azbn.sleep(azbn.mdl('cfg').taskq_pause);
									callback(null, null);
								});
								
								
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