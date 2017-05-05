'use strict';

//process.chdir(process.cwd());

//var async = require('async');

var azbn = require('./../../../../azbnode/LoadAzbnode')({
		root_module : module,
		mdls :{
			include : {
				//mysql : true,
				//vk : true,
				//async : true,
				//tg : true,
				//webclient : true,
				//https : true,
			},
		},
	});

var data = azbn.mdl('fork').parseCliData(process.argv);

azbn.mdl('fork').killMe(process, 0, {
	req : data,
});