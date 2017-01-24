'use strict';

var azbn = require('./../azbnode/LoadAzbnode')({
		root_module : module,
		mdls :{
			exclude : {
				mysql : true,
				tg : true,
				webclient : true,
				https : true,
			},
		},
	});

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
	
	it('Сохранение токена Youtube', function(done) {
		
		azbn.mdl('fork').run('youtube/save.token', {code : ((Math.random().toString(36).split('.'))[1])}, function(_process, _result){
			
			if(_result.status == 0) {
				
				_process.kill();
				
				expect(_result.status).toBe(0);
				expect(_result.id > 0).toBe(true);
				
			}
			
			done();
			
		});
		
	});
	
});