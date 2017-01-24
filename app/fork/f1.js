'use strict';

var azbn = require('../../azbnode/LoadAzbnode')({
		root_module : module,
		mdls :{
			exclude : {
				mysql : true,
				tg : true,
				webclient : true,
				https : true,
			},
		},
	});

var data = azbn.mdl('fork').parseCliData(process.argv);

console.log('fork f1 test');

process.send({uid : 'f1', status : 0, html : 'ok'});