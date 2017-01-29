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

azbn.mdl('fork').killMe(process, 0, {
	html : 'ok',
	uid : 'f2',
	data : data,
});