'use strict';

//process.chdir(process.cwd());

//var async = require('async');

var app_id = 3;

var azbn = require('./../../../../../azbnode/LoadAzbnode')({
		root_module : module,
		mdls :{
			include : {
				mysql : true,
				vk : true,
				async : true,
				//tg : true,
				//webclient : true,
				//https : true,
			},
		},
	});

var data = azbn.mdl('fork').parseCliData(process.argv);

var updateUserInfo = function(item, _item, cb) {

	var acc = azbn.mdl('vk').account(item);

	if(acc) {

		var __req = {
			user_id : _item.to_user_id,
		};

		acc.request('friends.delete', __req, function(resp) {

			if(azbn.is_def(resp.error) && !azbn.is_null(resp.error)) {

				azbn.mdl('vk').saveError(app_id, item.user_id, resp.error, cb);

			} else {

				var _now = azbn.now_sec();

				azbn.mdl('mysql').query("UPDATE `" + azbn.mdl('cfg').mysql.t.log.addvkfr + "` SET success_at = '" + (- _now) + "' WHERE id = '" + _item.id + "'", function (_err, uresult) {
					cb();
				});

			}

		});

	} else {

		cb();

	}

}

var findBadFriends = function(item, cb) {

	var acc = azbn.mdl('vk').account(item);

	if(acc) {

		var _now = azbn.now_sec();
		var _moment__border__9d = _now - (9 * 24 * 60 * 60);
		var _next = 30 + Math.floor(Math.random() * (180 + 1 - 30)) + _now;

		azbn.mdl('mysql').query("UPDATE `" + azbn.mdl('cfg').mysql.t.vk.unaddvkfr + "` SET lastact = '" + _next + "' WHERE user_id = '" + item.user_id + "'", function (_err, uresult) {
			//cb();
		});

		azbn.mdl('mysql').query("" +
			"SELECT " +
				"* " +
			"FROM " +
				"`" + azbn.mdl('cfg').mysql.t.log.addvkfr + "`" +
			"WHERE " +
				"user_id = '" + item.user_id + "' " +
				"AND " +
				"created_at < '" + _moment__border__9d + "' " +
				"AND " +
				"success_at = '0' " +
			"ORDER BY " +
				"RAND() " +
			"LIMIT 1 " +
			"", function(_err, rows, fields) {

			if (_err) {

				azbn.mdl('winston').error(_err);

				cb();

			} else if(rows.length == 0) {

				cb();

			} else {

				var async_arr = [];

				for(var i = 0; i < rows.length; i++) {

					(function(_item){

						async_arr.push(function(callback){

							updateUserInfo(item, _item, function(){
								azbn.sleep(azbn.mdl('cfg').taskq_pause);
								callback(null, null);
							});

						});

					})(rows[i]);

				}

				azbn.mdl('async').series(async_arr, function (__err, __results) {
					cb();
				});

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
			var _moment__border__10min = _now - (10 * 60);

			azbn.mdl('mysql').query("" +
				"SELECT " +
					"`" + azbn.mdl('cfg').mysql.t.vk.token + "`" + ".* " +
				"FROM " +
					"`" + azbn.mdl('cfg').mysql.t.vk.token + "`, " +
					"`" + azbn.mdl('cfg').mysql.t.vk.unaddvkfr + "` " +
				"WHERE " +
					"`" + azbn.mdl('cfg').mysql.t.vk.unaddvkfr + "`" + ".lastact < '" + _moment__border__10min + "' " +
					"AND " +
					"`" + azbn.mdl('cfg').mysql.t.vk.token + "`" + ".stop_at > '" + _now + "' " +
					"AND " +
					"`" + azbn.mdl('cfg').mysql.t.vk.token + "`" + ".user_id =  " + "`" + azbn.mdl('cfg').mysql.t.vk.unaddvkfr + "`" + ".user_id " +
					"AND " +
					"`" + azbn.mdl('cfg').mysql.t.vk.token + "`" + ".app_id = '" + app_id + "' " +
					"AND " +
					"`" + azbn.mdl('cfg').mysql.t.vk.unaddvkfr + "`" + ".status = '1' " +
				"ORDER BY " +
					"`" + azbn.mdl('cfg').mysql.t.vk.unaddvkfr + "`" + ".lastact " +
				"", function(_err, rows, fields) {

				if (_err) {

					azbn.mdl('winston').error(_err);

					azbn.mdl('fork').killMe(process, 0, {
						error : _err,
					});

				} else if(rows.length == 0) {

					//azbn.mdl('winston').info('No forks in DB!');

					azbn.mdl('fork').killMe(process);

				} else {

					var async_arr = [];

					for(var i = 0; i < rows.length; i++) {

						(function(item){

							async_arr.push(function(callback){

								findBadFriends(item, function(){
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