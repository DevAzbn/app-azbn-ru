'use strict';

//process.chdir(process.cwd());

var azbn = require('./../../../azbnode/LoadAzbnode')({
		root_module : module,
		mdls :{
			include : {
				mysql : true,
				//tg : true,
				//webclient : true,
				//https : true,
			},
		},
	});

var data = azbn.mdl('fork').parseCliData(process.argv);

var _now = azbn.now_sec();
var _moment__border__month = _now - (30 * 24 * 60 * 60);

azbn.mdl('mysql').query("" +
	"DELETE " +
	"FROM " +
		"`" + azbn.mdl('cfg').mysql.t.email.queue + "` " +
	"WHERE " +
		"created_at < '" + _moment__border__month + "' " +
		"AND " +
		"sended_at < '" + _moment__border__month + "' " +
	"", function(_err, rows, fields) {

		azbn.mdl('fork').killMe(process);

	});


process.on('exit', function() {
	//azbn.mdl('winston').warn(__filename + ' is stoped');
});