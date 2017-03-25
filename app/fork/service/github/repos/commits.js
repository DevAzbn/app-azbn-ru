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

var _
	, api_url				= 'https://api.github.com'
	, access_token_str		= data.token ? ('access_token=' + data.token) : ''
;


data.user = data.user || 'devazbn';
data.repo = data.repo || 'azbn-gulp';


azbn.mdl('webclient').r('GET', api_url + '/repos/' + data.user + '/' + data.repo + '/commits?' + access_token_str, {}, function(error, response, body){
	
	if(error) {
		console.log(error);
	} else {
		console.log((JSON.parse(body)).length);
	}
	
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