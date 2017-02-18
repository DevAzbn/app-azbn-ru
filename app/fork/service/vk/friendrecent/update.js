'use strict';

//process.chdir(process.cwd());

//var async = require('async');

var app_id = 1;

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

var updateUserInfo = function(item, cb) {

	var acc = azbn.mdl('vk').account(item);

	if(acc) {

		var __req = {
			count : 333,
		};

		acc.request('friends.getRecent', __req, function(resp) {

			if(azbn.is_def(resp.error) && !azbn.is_null(resp.error)) {

				azbn.mdl('vk').saveError(app_id, item.user_id, resp.error, cb);

			} else {

				var _now = azbn.now_sec();

				var ids_str = resp.response.join(',');

				azbn.mdl('mysql').query("UPDATE `" + azbn.mdl('cfg').mysql.t.log.addvkfr + "` SET success_at = '" + _now + "' WHERE user_id = '" + item.user_id + "' AND success_at = 0 AND to_user_id IN (" + ids_str + ")", function (_err, uresult) {
					cb();
				});

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
			var _moment__border__20min = _now - (20 * 60);

			azbn.mdl('mysql').query("" +
				"SELECT " +
					"`" + azbn.mdl('cfg').mysql.t.vk.token + "`" + ".* " +
				"FROM " +
					"`" + azbn.mdl('cfg').mysql.t.vk.token + "`, " +
					"`" + azbn.mdl('cfg').mysql.t.vk.addvkfr + "` " +
				"WHERE " +
					"`" + azbn.mdl('cfg').mysql.t.vk.addvkfr + "`" + ".lastact < '" + _moment__border__20min + "' " +
					"AND " +
					"`" + azbn.mdl('cfg').mysql.t.vk.token + "`" + ".stop_at > '" + _now + "' " +
					"AND " +
					"`" + azbn.mdl('cfg').mysql.t.vk.token + "`" + ".user_id =  " + "`" + azbn.mdl('cfg').mysql.t.vk.addvkfr + "`" + ".user_id " +
					"AND " +
					"`" + azbn.mdl('cfg').mysql.t.vk.token + "`" + ".app_id = '" + app_id + "' " +
					"AND " +
					"`" + azbn.mdl('cfg').mysql.t.vk.addvkfr + "`" + ".status = '1' " +
				"ORDER BY " +
					"`" + azbn.mdl('cfg').mysql.t.vk.addvkfr + "`" + ".lastact " +
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

								updateUserInfo(item, function(){
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