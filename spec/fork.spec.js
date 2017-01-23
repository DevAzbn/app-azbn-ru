'use strict';

var cfg = require('./../baseconfig.json');

var path = require('path');

/*
for(var i in cfg.path) {
	cfg.path[i] = process.cwd() + '/' + cfg.path[i];
}
*/

cfg.path.azbnode = '../' + cfg.path.azbnode;
cfg.path.app = '../' + cfg.path.app;

var azbn = require(cfg.path.azbnode + '/azbnode');

azbn.load('cfg', cfg);

azbn.load('azbnodeevents', new require(cfg.path.azbnode + '/azbnodeevents')(azbn));
azbn.load('fork', new require(cfg.path.azbnode + '/azbnodeforkclient')(azbn));
azbn.event('loaded_azbnode', azbn);

azbn.parseArgv();
azbn.event('parsed_argv', azbn);

azbn.load('fs', require('fs'));

//azbn.load('tg', require(cfg.path.app + '/tg')(azbn));

// модуль логирования
azbn.load('winston', require('./../lib/getWinston')(module));

//argv.fork
//azbn.mdl('tg').getMe().then(function(me) {
//	
//});



describe('forks', function(){
	
	var _
		//, taskqueue
	;
	
	beforeEach(function(){
		//taskqueue = require('./../azbn-task-queue');
	});
	
	/*
	afterAll(function(done) {
		azbn.unload('tg');
		done();
	});
	*/
	
	it('Тестовый файл', function(done) {
		
		azbn.mdl('fork').run('test', {}, function(_process, _result){
			
			if(_result.status == 0) {
				
				_process.kill();
				
				expect(_result.status).toBe(0);
				
			}
			
			done();
			
		});
		
	});
	
	it('Список задач в базе данных', function(done) {
		
		azbn.mdl('fork').run('mysql.fork.list', {}, function(_process, _result){
			
			if(_result.status == 0) {
				
				_process.kill();
				
				expect(_result.status).toBe(0);
				expect(_result.count > 0).toBe(true);
				
			}
			
			done();
			
		});
		
	});
	
});