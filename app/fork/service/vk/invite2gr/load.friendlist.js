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
	
	item.p = JSON.parse(item.p) || {};
	
	var acc = azbn.mdl('vk').account(item);
	
	if(acc) {
		
		var req = {
			user_id : item.user_id,
			order : 'random',
			count : 500,
		};
		
		acc.request('friends.get', req, function(resp) {
			
			if(azbn.is_def(resp.error) && !azbn.is_null(resp.error)) {
				
				if(resp.error.error_code == 5) {
					azbn.mdl('mysql').query("UPDATE `" + azbn.mdl('cfg').mysql.t.vk.invite2gr + "` SET lastact = lastact + " + azbn.mdl('cfg').vk.period.on_auth_error + ", status = '0' WHERE user_id = '" + item.user_id + "'", null);
				}
				
				azbn.mdl('vk').saveError(app_id, item.user_id, resp.error, cb);
				
			} else {
				
				if(resp.response.items.length) {
					
					var friend_arr = {};
					
					for(var i = 0; i < resp.response.items.length; i++) {
						
						friend_arr[resp.response.items[i]] = 1;
						
					}
					
					var items_str = resp.response.items.join(',');
					
					azbn.mdl('mysql').query("" +
						"SELECT " +
							"* " +
						"FROM " +
							"`" + azbn.mdl('cfg').mysql.t.log.invite2gr + "` " +
						"WHERE " +
							"1 " +
							//azbn.mdl('cfg').mysql.t.log.invite2gr + "`
							"AND " +
							"`" + azbn.mdl('cfg').mysql.t.log.invite2gr + "`.user_id = '" + item.user_id + "' " +
							"AND " +
							"`" + azbn.mdl('cfg').mysql.t.log.invite2gr + "`.group_id = '" + (item.p.group_id || 39329195) + "' " +
							"AND " +
							"`" + azbn.mdl('cfg').mysql.t.log.invite2gr + "`.to_user_id IN (" + items_str + ") " +
						"ORDER BY " +
							"`" + azbn.mdl('cfg').mysql.t.log.invite2gr + "`.id" +
						"", function(_err, rows, fields) {
						
						if (_err) {
							
							azbn.mdl('winston').error(_err);
							
							cb();
							
						} else {
							
							var __item_arr = [];
							
							if(rows.length > 0) {
								for(var i = 0; i < rows.length; i++) {
									
									var __id = rows[i].to_user_id;
									
									if(friend_arr[__id]) {
										friend_arr[__id] = 0;
										delete friend_arr[__id];
									}
									
								}
							}
							
							var __friend_arr = [];
							
							for(var i in friend_arr) {
								
								if(friend_arr[i]) {
									__friend_arr.push(i);
								}
								
								
							}
							
							var new_ids_str = __friend_arr.join(',');
							
							var req2 = {
								group_id : item.p.group_id || 39329195,
								user_ids : new_ids_str,
							};
							
							acc.request('groups.isMember', req2, function(resp2) {
								
								if(azbn.is_def(resp2.error) && !azbn.is_null(resp2.error)) {
									
									if(resp2.error.error_code == 5) {
										azbn.mdl('mysql').query("UPDATE `" + azbn.mdl('cfg').mysql.t.vk.invite2gr + "` SET lastact = lastact + " + azbn.mdl('cfg').vk.period.on_auth_error + ", status = '0' WHERE user_id = '" + item.user_id + "'", null);
									}
									
									azbn.mdl('vk').saveError(app_id, item.user_id, resp2.error, cb);
									
								} else {
									
									var items = [];
									for(var i in resp2.response) {
										var pr = resp2.response[i];
										if(pr.member) {
											
										} else {
											items.push(pr.user_id);
										}
									}
									
									item.p.friends = items;
									var h_str = JSON.stringify(item.p);
									
									azbn.mdl('mysql').query("UPDATE `" + azbn.mdl('cfg').mysql.t.vk.invite2gr + "` SET p = '" + h_str + "' WHERE user_id = '" + item.user_id + "'", function (__err, __result) { //lastact = '" + ds + "', 
										cb();
									});
									
								}
								
							});
							
						}
						
					});
					
				} else {
					
					cb();
					
				}
				
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