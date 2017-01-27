'use strict';

var VKSDK = require('vksdk');

function createVK(azbn) {

	var ctrl = {};

	var __tokens = {};
	var __apps = [];

	ctrl.loadApps = function() {

		azbn.mdl('mysql').query("SELECT * FROM `" + azbn.mdl('cfg').mysql.t.vk.app + "` WHERE 1 ORDER BY id", function(_err, rows, fields) {

			if (_err) {

				azbn.mdl('winston').warn('Error on load VK apps: ' + _err);

			} else if(rows.length == 0) {

				//azbn.mdl('winston').info('No forks in DB!');

			} else {

				for(var i = 0; i < rows.length; i++) {

					(function(item){

						__apps[item.id] = item;

						//azbn.echo(item.title);

					})(rows[i]);

				}

			}

		});

	};

	ctrl.account = function(item) {

		var app = __apps[item.app_id];

		if(app) {

			if(__tokens[item.id]) {



			} else {

				__tokens[item.id] = new VKSDK({
					'appId'     :	app.appId,
					'appSecret' :	app.appSecret,
					'https'		:	true,
					'secure'	:	true,
					'version'	: 	azbn.mdl('cfg').vk.version,
					'language'	:	azbn.mdl('cfg').vk.language,
				});

				__tokens[item.id].on('serverTokenReady', function(_o) {
					__tokens[item.id].setToken(_o.access_token);
				});

			}

			return __tokens[item.id];

		} else {

			return null;

		}

	};

	//

	return ctrl;

}

module.exports = createVK;

/*
function genVK(azbn, appId) {

	this.name = 'vkapp_init';

	var log_name = this.name;
	
	var app = azbn.mdl('cfg').vk_app[appId];
	
	var vk = new VK({
		'appId'     :	app.appId,
		'appSecret' :	app.appSecret,
		'https'		:	true,
		'secure'	:	true,
		'version'	: 	'5.60',
		'language'	:	app.language,
	});

	vk.on('serverTokenReady', function(_o) {
		vk.setToken(_o.access_token);
	});
	
	return vk;
}
*/

