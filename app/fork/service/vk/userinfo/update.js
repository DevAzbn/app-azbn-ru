'use strict';

//process.chdir(process.cwd());

//var async = require('async');

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

		acc.request('users.get', {
			user_ids : item.user_id,
			fields : 'photo_id,verified,sex,bdate,city,country,home_town,has_photo,photo_50,photo_100,photo_200_orig,photo_200,photo_400_orig,photo_max,photo_max_orig,online,lists,domain,has_mobile,contacts,site,education,universities,schools,status,last_seen,followers_count,occupation,nickname,relatives,relation,personal,connections,exports,wall_comments,activities,interests,music,movies,tv,books,games,about,quotes,can_post,can_see_all_posts,can_see_audio,can_write_private_message,can_send_friend_request,is_favorite,is_hidden_from_feed,timezone,screen_name,maiden_name,crop_photo,is_friend,friend_status,career,military,counters',
		}, function(resp) {
			
			if(azbn.is_def(resp.error) && !azbn.is_null(resp.error)) {
				
				azbn.mdl('vk').saveError(resp.error, __filename, cb);
				
			} else {
				
				resp.response.forEach(function(user){
					
					var p = JSON.stringify(user);

					var _now = azbn.now_sec();
					
					azbn.mdl('mysql').query("UPDATE `" + azbn.mdl('cfg').mysql.t.vk.userinfo + "` SET lastact = '" + _now + "', p = '" + p + "' WHERE id = '" + item.id + "'", function (_err, _result) {
						cb();
					});
					
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
			var _moment__border__1day = _now - (1 * 24 * 60 * 60);

			azbn.mdl('mysql').query("" +
				"SELECT " +
					"`" + azbn.mdl('cfg').mysql.t.vk.token + "`.id AS token_id, " +
					"`" + azbn.mdl('cfg').mysql.t.vk.token + "`.app_id, " +
					"`" + azbn.mdl('cfg').mysql.t.vk.userinfo + "`.* " +
				"FROM " +
					"`" + azbn.mdl('cfg').mysql.t.vk.token + "`, " +
					"`" + azbn.mdl('cfg').mysql.t.vk.userinfo + "` " +
				"WHERE " +
					"`" + azbn.mdl('cfg').mysql.t.vk.userinfo + "`.lastact < '" + _moment__border__1day + "' " +
					"AND " +
					"`" + azbn.mdl('cfg').mysql.t.vk.token + "`.user_id = `" + azbn.mdl('cfg').mysql.t.vk.userinfo + "`.user_id " +
				"GROUP BY " +
					"`" + azbn.mdl('cfg').mysql.t.vk.userinfo + "`.user_id " +
				"ORDER BY " +
					"`" + azbn.mdl('cfg').mysql.t.vk.userinfo + "`.lastact " +
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