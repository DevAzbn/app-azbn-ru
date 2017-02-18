'use strict';

//var async = require('async');
var VKSDK = require('vksdk');

function createVK(azbn) {
	
	var ctrl = {};
	
	var __tokens = {};
	var __apps = [];
	
	ctrl.saveError = function(app_id, user_id, error, cb) {
		
		var error = {
			created_at : azbn.now_sec(),
			app_id : app_id,
			user_id : user_id,
			code : error.error_code,
			error : JSON.stringify(error),
		};
		
		azbn.mdl('mysql').query("INSERT INTO `" + azbn.mdl('cfg').mysql.t.vk.error + "` SET ? ", error, function(__err, __result) {
			if(cb) {
				cb();
			}
		});
		
	}
	
	ctrl.loadApps = function(cb) {
		
		azbn.mdl('mysql').query("SELECT * FROM `" + azbn.mdl('cfg').mysql.t.vk.app + "` WHERE 1 ORDER BY id", function(_err, rows, fields) {
		
			if (_err) {
				
				azbn.mdl('winston').warn('Error on load VK apps: ' + _err);
				
				cb();
				
			} else if(rows.length == 0) {
				
				//azbn.mdl('winston').info('No forks in DB!');
				cb();
				
			} else {
				
				var async_arr = [];
				
				for(var i = 0; i < rows.length; i++) {
					
					(function(item){
						
						async_arr.push(function(callback){
							
							__apps[item.id] = item;
							
							callback(null, null);
							
						});
						
					})(rows[i]);
					
				}
				
				azbn.mdl('async').series(async_arr, function (__err, __results) {
					if(cb && typeof cb == 'function') {
						cb();
					}
				});
				
			}
			
		});
		
	};
	
	ctrl.account = function(item) {

		var app = __apps[item.app_id];

		if(app) {

			if(__tokens[item.token_id]) {



			} else {

				__tokens[item.token_id] = new VKSDK({
					'appId'     :	app.appId,
					'appSecret' :	app.appSecret,
					'https'		:	true,
					'secure'	:	true,
					'version'	: 	azbn.mdl('cfg').vk.version,
					'language'	:	azbn.mdl('cfg').vk.language,
				});

				__tokens[item.token_id].on('serverTokenReady', function(_o) {
					__tokens[item.token_id].setToken(_o.access_token);
				});

				__tokens[item.token_id].setToken(item.access_token);

			}

			return __tokens[item.token_id];

		} else {

			return null;

		}

	};

	//

	return ctrl;

}

module.exports = createVK;
