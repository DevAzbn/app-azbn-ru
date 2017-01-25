'use strict';

//process.chdir(process.cwd());

var azbn = require('./../../../azbnode/LoadAzbnode')({
		root_module : module,
		mdls :{
			include : {
				mysql : true,
				//tg : true,
				//webclient : true,
				//https : true,
			},
		},
	});

var data = azbn.mdl('fork').parseCliData(process.argv);

var _GOOGLE_OBJECTS_
	//, google = require('googleapis')
	, googleClient = require(process.cwd() + '/' + azbn.mdl('cfg').path.bound + '/google/createClient')
;

//console.log(process.cwd());

if(data.code && data.code != '') {
	
	googleClient.genTokens(data.code, function(err, tokens){
		
		if(err) {
			
			azbn.mdl('winston').error(err);
			
			process.send({status : -1, error : err});
			
		} else if(tokens) {
			
			var item = {
				created_at : azbn.now_sec(),
				code : data.code,
				tokens : JSON.stringify(tokens),
			};
			
			azbn.mdl('mysql').query("INSERT INTO `" + azbn.mdl('cfg').mysql.t.yt_token + "` SET ? ", item, function(_err, result) {
				
				if(_err) {
					
					azbn.mdl('winston').error(_err);
					
					process.send({status : -1, error : _err});
					
				} else if(result.insertId) {
					
					process.send({status : 0, id : result.insertId});
					
				} else {
					
					azbn.mdl('winston').error(_err);
					
					process.send({status : -1, error : {text : 'not inserted'}});
					
				}
				
			});
			
		} else {
			
			azbn.mdl('winston').error(_err);
			
			process.send({status : -1, error : {text : 'no tokens'}});
			
		}
		
	});
	
} else {
	
	process.send({status : 0, error : {text : 'no code'}});
	
}

process.on('exit', function() {
	//azbn.mdl('winston').warn(__filename + ' is stoped');
});