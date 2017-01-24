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

console.log(process.cwd());

process.send({
	status : 0,
	html : 'ok',
	tg : {
		log : process.cwd(),
	},
});