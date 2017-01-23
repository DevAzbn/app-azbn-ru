'use strict';

//process.chdir(process.cwd());

var data = {};

if(process.argv && process.argv[2]) {
	data = JSON.parse(new Buffer(process.argv[2], 'base64').toString('utf8'));
} else {
	data = {};
}

var path = require('path');

var cfg = require('./../../../baseconfig.json');

for(var i in cfg.path) {
	cfg.path[i] = process.cwd() + '/' + cfg.path[i];
}

var azbn = require(cfg.path.azbnode + '/azbnode');

azbn.load('cfg', cfg);

azbn.load('azbnodeevents', new require(cfg.path.azbnode + '/azbnodeevents')(azbn));
azbn.load('web', new require(cfg.path.azbnode + '/azbnodewebclient')(azbn));
azbn.load('fork', new require(cfg.path.azbnode + '/azbnodeforkclient')(azbn));
//azbn.event('loaded_azbnode', azbn);

azbn.parseArgv();
//azbn.event('parsed_argv', azbn);

azbn.load('fs', require('fs'));
azbn.load('taskq', require('azbn-task-queue'));
//azbn.load('querystring', require('querystring'));
//azbn.load('path', require('path'));

/*
azbn.load('https', require('https'));
*/

//azbn.load('cfg', require(cfg.path.app + '/config'));
azbn.load('mysql', require(cfg.path.app + '/mysql')(azbn));
//azbn.load('tg', require(cfg.path.app + '/tg')(azbn));
//azbn.load('vk', require(cfg.path.app + '/vk'));

// модуль логирования
azbn.load('winston', require(cfg.path.bound + '/getWinston')(module));

//azbn.mdl('winston').info(data.code);


var _GOOGLE_OBJECTS_
	//, google = require('googleapis')
	, googleClient = require(cfg.path.bound + '/./google/createClient')
;


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