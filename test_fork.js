'use strict';

var cfg = require('./baseconfig.json');

var azbn = require(cfg.path.azbnode + '/azbnode');

azbn.load('cfg', cfg);

azbn.load('azbnodeevents', new require(cfg.path.azbnode + '/azbnodeevents')(azbn));
azbn.load('fork', new require(cfg.path.azbnode + '/azbnodeforkclient')(azbn));
azbn.event('loaded_azbnode', azbn);

var argv = require('optimist').argv;

azbn.parseArgv();
azbn.event('parsed_argv', azbn);

azbn.load('fs', require('fs'));

// модуль логирования
azbn.load('winston', require(cfg.path.bound + '/getWinston')(module));

//argv.fork
azbn.mdl('fork').run(argv.fork, {x : 0, y : 1}, function(_process, _result){
	
	if(_result.status == 0) {
		
		_process.kill();
		
		console.log('');
		console.log('');
		console.log('---------------------');
		azbn.mdl('winston').warn('Test: ok!');
		
	} else if(_result.status < 0) {
		
		_process.kill();
		
		console.log('');
		console.log('');
		console.log('---------------------');
		azbn.mdl('winston').error('Test: error! ' + JSON.stringify(_result));
		
	}
	
});
