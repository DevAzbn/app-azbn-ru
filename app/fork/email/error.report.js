'use strict';

//process.chdir(process.cwd());

var azbn = require('./../../../azbnode/LoadAzbnode')({
		root_module : module,
		mdls :{
			include : {
				mysql : true,
				email : true,
				async : true,
				//tg : true,
				//webclient : true,
				//https : true,
			},
		},
	});

var data = azbn.mdl('fork').parseCliData(process.argv);


var __tpl = '/var/www/sites/app.azbn.ru/html/app/fork/email/tpl/error/report.html';
var __email = 'alexander.zybin@yandex.ru';


azbn.mdl('mysql').connect(function(err){

	//var _moment__border__week = _now + (7 * 24 * 60 * 60);

	if(err) {

		azbn.mdl('winston').warn('Could not connect to mysql: ' + err);

		azbn.mdl('fork').killMe(process, 0, {
			error : err,
		});

	} else {
		
		var _now = azbn.now_sec();
		var _moment__border__hour = _now - (3 * 60 * 60);
		var _hour = Math.floor(_now / 3600);
		
		azbn.mdl('mysql').query("" +
			"SELECT " +
				"* " +
			"FROM " +
				"`" + azbn.mdl('cfg').mysql.t.error + "` " +
			"WHERE " +
				"created_at > '" +  _moment__border__hour + "' " +
			"ORDER BY " +
				"created_at" +
			"", function(_err, rows, fields) {
				
				if (_err) {
					
					azbn.mdl('winston').warn('Error on search errors in queue: ' + _err);
					
					azbn.mdl('error').save(module.filename.split('/').slice(-2).join('/'), _err);
					
					azbn.mdl('fork').killMe(process, 0, {
						error : _err,
					});
					
				} else if(rows.length == 0) {
					
					azbn.mdl('fork').killMe(process);
					
				} else {
					
					var error_arr = [];
					
					for(var i = 0; i < rows.length; i++) {
						error_arr.push(rows[i].module);
					}
					
					var item = {
						created_at : azbn.now_sec(),
						sended_at : 0,
						status : 0,
						uid : 'error.alert.' + _hour,
						email : __email,
						subject : 'Ошибки на сервисе',
						tpl : __tpl,
						p : JSON.stringify({
							error_count : rows.length,
							error_modules : error_arr.join(', '),
						}),
					};
					
					azbn.mdl('mysql').query("INSERT INTO `" + azbn.mdl('cfg').mysql.t.email.queue + "` SET ? ", item, function(__err, __result) {
						
						if(__err) {
							azbn.mdl('error').save(module.filename.split('/').slice(-2).join('/'), __err, function(){
								azbn.mdl('fork').killMe(process);
							});
						} else {
							azbn.mdl('fork').killMe(process);
						}
						
					});
					
				}
			
		});
	
	}
});


process.on('exit', function() {
	//azbn.mdl('winston').warn(__filename + ' is stoped');
});