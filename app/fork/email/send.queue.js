'use strict';

//process.chdir(process.cwd());

var azbn = require('./../../../azbnode/LoadAzbnode')({
		root_module : module,
		mdls :{
			include : {
				mysql : true,
				email : true,
				//tg : true,
				//webclient : true,
				//https : true,
			},
		},
	});

var data = azbn.mdl('fork').parseCliData(process.argv);


azbn.mdl('mysql').connect(function(err){

	//var _moment__border__week = _now + (7 * 24 * 60 * 60);

	if(err) {

		azbn.mdl('winston').warn('Could not connect to mysql: ' + err);

		azbn.mdl('fork').killMe(process, 0, {
			error : err,
		});

	} else {

		
		azbn.mdl('mysql').query("" +
			"SELECT " +
				"* " +
			"FROM " +
				"`" + azbn.mdl('cfg').mysql.t.email.queue + "` " +
			"WHERE " +
				"sended_at = '0' AND status = '0' " +
			"ORDER BY " +
				"created_at" +
			"", function(_err, rows, fields) {

				if (_err) {

					azbn.mdl('winston').warn('Error on search emails in queue: ' + _err);

				} else if(rows.length == 0) {

					

				} else {

					for(var i = 0; i < rows.length; i++) {

						(function(item){

							var item_id = item.id;

							azbn.mdl('fs').readFile(item.tpl, function(__err, __data){
								if (__err) {
							  		
							  		azbn.mdl('winston').warn('Error on read tpl: ' + __err);

							  	} else {

							  		var _now = azbn.now_sec();

							  		var html = 'test';//__data;

							  		azbn.mdl('email').send(azbn.mdl('cfg').site.email, {
										email : item.email,
										subject : item.subject,
										body : html,
									}, function(){

										azbn.mdl('mysql').query("UPDATE `" + azbn.mdl('cfg').mysql.t.email.queue + "` SET sended_at = '" + _now + "', status = '1' WHERE id = '" + item.id + "'", function (___err, ___result) {
											azbn.echo_dev('Updated sended_at for mail #' + item_id);
										});

									});

							  		

							  	}
							});

						})(rows[i]);

					}

				}

		});


	}
});


process.on('exit', function() {
	//azbn.mdl('winston').warn(__filename + ' is stoped');
});