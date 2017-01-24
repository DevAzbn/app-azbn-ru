'use strict';

//process.chdir(process.cwd());

var azbn = require('./../../../azbnode/LoadAzbnode')({
		root_module : module,
		mdls :{
			exclude : {
				mysql : true,
				tg : true,
				//webclient : true,
				https : true,
			},
		},
	});

var data = azbn.mdl('fork').parseCliData(process.argv);

azbn.mdl('webclient').r('GET', 'https://ifconfig.co/json', {}, function(err, response, html){
	
	if(err){
		
		azbn.mdl('winston').error(err);
		
		process.send({status : 0, html : 'no connect'});
		
		return;
		
	} else {
		
		console.log(html);
		
		process.send({status : 0, response : JSON.parse(html)});
		
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