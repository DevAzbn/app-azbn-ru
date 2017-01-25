'use strict';

var azbn = require('../../azbnode/LoadAzbnode')({
		root_module : module,
		mdls :{
			include : {
				//mysql : true,
				//tg : true,
				//webclient : true,
				//https : true,
			},
		},
	});

var data = azbn.mdl('fork').parseCliData(process.argv);

console.log('fork f2 test: ' + JSON.stringify(data));

process.send({uid : 'f2', status : 0, html : 'ok', data : data});