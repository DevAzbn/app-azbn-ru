module.exports = function(p) {
	
	p = p || {
		root_module : module,
		mdls :{
			include : {
				mysql : false,
				tg : false,
				webclient : false,
				https : false,
			},
		},
	};
	
	if(p.root_module) {
		
	} else {
		p.root_module = module;
	}
	
	
	var azbn = require(__dirname + '/azbnode');
	
	
	azbn.load('cfg', require(__dirname + '/../baseconfig.json'));
	
	
	azbn.load('azbnodeevents', new require(__dirname + '/azbnodeevents')(azbn));
	azbn.load('fork', new require(__dirname + '/azbnodeforkclient')(azbn));
	
	
	azbn.load('fs', require('fs'));
	azbn.load('querystring', require('querystring'));
	azbn.load('path', require('path'));
	azbn.load('taskq', require('azbn-task-queue'));
	//optimist
	
	
	(!p.mdls.include.mysql) ||						azbn.load('mysql', require(__dirname + '/../' + azbn.mdl('cfg').path.app + '/mysql')(azbn));
	(!p.mdls.include.tg) ||							azbn.load('tg', require(__dirname + '/../' + azbn.mdl('cfg').path.app + '/tg')(azbn));
	(!p.mdls.include.webclient) ||					azbn.load('webclient', new require(__dirname + '/azbnodewebclient')(azbn));
	(!p.mdls.include.https) ||						azbn.load('https', require('https'));
	
	
	//azbn.load('vk', require(__dirname + '/../' + azbn.mdl('cfg').path.app + '/vk'));
	
	
	azbn.load('winston', require(__dirname + '/../' + azbn.mdl('cfg').path.bound + '/getWinston')(p.root_module));
	
	
	azbn.event('loaded_azbnode', azbn);
	
	
	azbn.parseArgv();
	azbn.event('parsed_argv', azbn);
	
	
	return azbn;
	
};