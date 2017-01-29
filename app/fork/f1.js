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

console.log('fork f1 test');

azbn.mdl('fork').killMe(process, 0, {
	html : 'ok',
	uid : 'f1',
});