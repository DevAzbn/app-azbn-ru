module.exports = function(p) {
	
	p = p || {
		root_module : module,
		mdls :{
			exclude : {
				mysql : true,
				tg : true,
				webclient : true,
				https : true,
			},
		},
	};
	
	if(p.root_module) {
		
	} else {
		p.root_module = module;
	}
	/*
	{
		module : null,
		mdls :{
			exclude : {
				mysql : true,
				tg : true,
				webclient : true,
				https : true,
			}
		}
	}
	*/
	
	var azbn = require(__dirname + '/azbnode');
	
	azbn.load('cfg', require(__dirname + '/../baseconfig.json'));
	
	azbn.load('azbnodeevents', new require(__dirname + '/azbnodeevents')(azbn));
	azbn.load('fork', new require(__dirname + '/azbnodeforkclient')(azbn));
	
	azbn.load('fs', require('fs'));
	azbn.load('querystring', require('querystring'));
	azbn.load('path', require('path'));
	azbn.load('taskq', require('azbn-task-queue'));
	//optimist
	
	(p.mdls.exclude.mysql) || azbn.load('mysql', require(__dirname + '/../' + azbn.mdl('cfg').path.app + '/mysql')(azbn));
	(p.mdls.exclude.tg) || azbn.load('tg', require(__dirname + '/../' + azbn.mdl('cfg').path.app + '/tg')(azbn));
	(p.mdls.exclude.webclient) || azbn.load('webclient', new require(__dirname + '/azbnodewebclient')(azbn));
	(p.mdls.exclude.https) || azbn.load('https', require('https'));
	
	//azbn.load('vk', require(__dirname + '/../' + azbn.mdl('cfg').path.app + '/vk'));
	
	
	azbn.load('winston', require(__dirname + '/../' + azbn.mdl('cfg').path.bound + '/getWinston')(p.root_module));
	
	azbn.event('loaded_azbnode', azbn);
	
	azbn.parseArgv();
	azbn.event('parsed_argv', azbn);
	
	return azbn;
	
};