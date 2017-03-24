'use strict';

//process.chdir(process.cwd());

//var async = require('async');

var azbn = require('./../../../../../azbnode/LoadAzbnode')({
		root_module : module,
		mdls :{
			include : {
				//mysql : true,
				//vk : true,
				//async : true,
				//tg : true,
				webclient : true,
				//https : true,
			},
		},
	});

var data = azbn.mdl('fork').parseCliData(process.argv);


//azbn.mdl('fork').killMe(process);

azbn.mdl('webclient').r('POST', 'http://azbn.ru/test/', {
	qwerty : 'poiuyt',
}, function(error, response, body){
	
	console.log(body);
	
	azbn.mdl('fork').killMe(process);
	
})


process.on('exit', function() {
	//azbn.mdl('winston').warn(__filename + ' is stoped');
});

/*
process.on('message', function(msg) {
	console.log(msg);
});
*/