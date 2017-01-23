'use strict';

//process.chdir(process.cwd());

var data = {};

if(process.argv && process.argv[2]) {
	data = JSON.parse(new Buffer(process.argv[2], 'base64').toString('utf8'));
} else {
	data = {};
}

var path = require('path');

var cfg = require('./../../baseconfig.json');

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
azbn.load('tg', require(cfg.path.app + '/tg')(azbn));
//azbn.load('vk', require(cfg.path.app + '/vk'));

// модуль логирования
azbn.load('winston', require(cfg.path.bound + '/getWinston')(module));

azbn.mdl('mysql').connect(function(err){
	
	if(err) {
		
		azbn.mdl('winston').error('Could not connect to mysql');
		
		process.send({status : -1, html : 'ok'});
		
		throw err;
		
	} else {
		
		azbn.mdl('winston').info('DB is connected');
		
		azbn.mdl('mysql').query("SELECT * FROM `" + azbn.mdl('cfg').mysql.t.fork + "` WHERE 1 ORDER BY id", function(_err, rows, fields) {
			
			if (_err) {
				
				azbn.mdl('winston').warn('Error on load tasks: ' + _err);
				
				process.send({status : 1, count : 0, html : ''});
				
				throw _err;
				
			} else if(rows.length == 0) {
				
				azbn.mdl('winston').warn('No tasks in DB!');
				
				process.send({status : 0, count : 0, html : 'ok'});
				
			} else {
				
				for(var i = 0; i < rows.length; i++){
					
					var item = rows[i];
					azbn.mdl('winston').log('info', item.path + ': ' + item.title);
					
				}
				
				process.send({status : 0, count : rows.length, html : 'ok'});
				
			}
			
		});
		
	}
});


process.on('exit', function() {
	azbn.mdl('winston').warn(__filename + ' is stoped');
});