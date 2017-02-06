'use strict';

//process.chdir(process.cwd());

var azbn = require('./../../../azbnode/LoadAzbnode')({
		root_module : module,
		mdls :{
			include : {
				//mysql : true,
				//tg : true,
				//webclient : true,
				//https : true,
				antigate : true,
			},
		},
	});

var data = azbn.mdl('fork').parseCliData(process.argv);

var captcha_url = 'http://app.azbn.ru/antigate/default.captcha.png';//data.url;

azbn.mdl('antigate').processFromURL(captcha_url, function(error, result, id) {
	
	if (error) {
		
		azbn.mdl('winston').error(error);
		
	} else {
		
		azbn.mdl('winston').info(id + ': ' + result);
		
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