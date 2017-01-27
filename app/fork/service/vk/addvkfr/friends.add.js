'use strict';

//process.chdir(process.cwd());

var azbn = require('./../../../../../azbnode/LoadAzbnode')({
		root_module : module,
		mdls :{
			include : {
				mysql : true,
				vk : true,
				//tg : true,
				//webclient : true,
				//https : true,
			},
		},
	});

var data = azbn.mdl('fork').parseCliData(process.argv);


azbn.mdl('mysql').connect(function(err){

	if(err) {

		azbn.mdl('winston').warn('Could not connect to mysql: ' + err);

	} else {

		azbn.mdl('vk').loadApps();

		azbn.mdl('mysql').query("" +
			"SELECT " +
				"* " +
			"FROM " +
				"`" + azbn.mdl('cfg').mysql.t.vk.token + "` " +
			"WHERE " +
				"1 " +
			"ORDER BY " +
				"id" +
			"", function(_err, rows, fields) {

			if (_err) {


			} else if(rows.length == 0) {

				//azbn.mdl('winston').info('No forks in DB!');

			} else {

				for(var i = 0; i < rows.length; i++) {

					(function(item){

						//__apps[item.id] = item;

						//azbn.echo(item.user_id);

						//azbn.echo(azbn.mdl('vk').account(item));

					})(rows[i]);

				}

			}

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