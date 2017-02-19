'use strict';

//process.chdir(process.cwd());

var app_id = 1;

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


var needFriendship = function(item, req, cb) {
	
	var acc = azbn.mdl('vk').account(item);
	
	acc.request('friends.add', req, function(resp) {
		
		if(azbn.is_def(resp.error) && !azbn.is_null(resp.error)) {
			
			azbn.mdl('vk').saveError(app_id, item.user_id, resp.error, null);
			
			switch(resp.error.error_code) {
				
				case 5 : {
					
					azbn.mdl('mysql').query("UPDATE `" + azbn.mdl('cfg').mysql.t.vk.addvkfr + "` SET lastact = lastact + " + azbn.mdl('cfg').vk.period.on_auth_error + ", status = '0' WHERE user_id = '" + item.user_id + "'", cb);
					
				}
				break;
				
				case 14 : {
					
					azbn.mdl('fork').run('antigate/fromurl', { captcha_url : resp.error.captcha_img }, function(_process, _result){
						
						_process.kill();
						
						if(_result.captcha) {
							
							req.captcha_sid = resp.error.captcha_sid;
							req.captcha_key = _result.captcha.result;
							
							needFriendship(item, req, cb);
							
						} else {
							
							cb();
							
						}
						
					});
					
				}
				break;
				
				default : {
					
					cb();
					
				}
				break;
				
			}
			
		} else {
			
			azbn.mdl('winston').info('Sended request to user #' + req.user_id);
			
			var to_log = {
				user_id : item.user_id,
				to_user_id : req.user_id,
				created_at : azbn.now_sec(),
			};
			
			azbn.mdl('mysql').query("INSERT INTO `" + azbn.mdl('cfg').mysql.t.log.addvkfr + "` SET ? ", to_log, function(err, result) {
				
				cb();
				
			});
			
		}
		
	});
	
};


var mainRequest = function(item, cb){
	
	var _lastact = 30 + Math.floor(Math.random() * (180 + 1 - 30)) + azbn.now_sec();
	
	azbn.mdl('mysql').query("UPDATE `" + azbn.mdl('cfg').mysql.t.vk.addvkfr + "` SET lastact = '" + _lastact + "' WHERE user_id = '" + item.user_id + "'", function (__err, __result) {});
	
	var acc = azbn.mdl('vk').account(item);
	
	if(acc) {
		
		var o = JSON.parse(item.p) || {};
		var _method = '';
		
		switch(o.sort) {
			
			case 2:{
				_method = 'friends.getSuggestions';
				o = {
					filter : 'mutual',
					count : 200,
				};
			}
			break;
			
			default:{
				_method = 'users.search';
				o.count = 200;
			}
			break;
			
		};
		
		acc.request(_method, o, function(resp) {
			
			if(azbn.is_def(resp.error) && !azbn.is_null(resp.error)) {
				
				if(resp.error.error_code == 5) {
					azbn.mdl('mysql').query("UPDATE `" + azbn.mdl('cfg').mysql.t.vk.addvkfr + "` SET lastact = lastact + " + azbn.mdl('cfg').vk.period.on_auth_error + ", status = '0' WHERE user_id = '" + item.user_id + "'", null);
				}
				
				azbn.mdl('vk').saveError(app_id, item.user_id, resp.error, cb);
				
			} else if(resp.response.items && resp.response.items.length > 0) {
				
				azbn.mdl('winston').info('Getted people for user #' + item.user_id);
				
				var max = resp.response.items.length - 1;
				var min = 0;
				var rand = min + Math.floor(Math.random() * (max + 1 - min));
				
				var selected = resp.response.items[rand];
				
				azbn.sleep(100);
				
				var req = { user_id : selected.id };
				
				needFriendship(item, req, function(error, callback){
					cb();
				});
				
			} else {
				
				cb();
				
			}
			
		});
		
	} else {
		
		cb();
		
	}
	
};


azbn.mdl('mysql').connect(function(err){
	
	if(err) {
		
		azbn.mdl('winston').warn('Could not connect to mysql: ' + err);
		
		azbn.mdl('fork').killMe(process, 0, {
			error : err,
		});
		
	} else {
		
		azbn.mdl('vk').loadApps(function(){
			
			var _now = azbn.now_sec();
			var _moment__border__1iteration = _now - (40 * 60);
			
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