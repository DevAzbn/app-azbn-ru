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
azbn.load('webclient', new require(cfg.path.azbnode + '/azbnodewebclient')(azbn));
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


var Morphy = require('phpmorphy').default;
azbn.load('morphy', new Morphy('ru', {
	//nojo : false,
	storage : Morphy.STORAGE_MEM,
	predict_by_suffix : true,
	predict_by_db : true,
	graminfo_as_text : true,
	use_ancodes_cache : false,
	resolve_ancodes : Morphy.RESOLVE_ANCODES_AS_TEXT,
}));


azbn.mdl('webclient').r('GET', 'https://yandex.ru/', {}, function(err, response, html){
	
	if(err){
		
		azbn.mdl('winston').error(err);
		
		return;
		
	} else {
		
		var $ = azbn.mdl('webclient').parse(html);
		
		var phr = [];
		var words_s = [];
		
		$('#tabnews_newsc .list.b-news-list li').each(function(index){
			
			phr[index] = [];
			
			var block = $(this);
			
			var theme_obr = block.text().toUpperCase().replace(/[^\sA-Za-zА-Яа-яЁё0-9]/g, "").split(' ');
			
			for(var i in theme_obr) {
				if(theme_obr[i].length > 3) {
					
					var _w = azbn.mdl('morphy').getBaseForm(theme_obr[i], Morphy.NORMAL);
					
					words_s.push(_w);
					
					phr[index].push(_w);
					
				}
			}
			
		});
		
		console.log(JSON.stringify(phr));
		
	}
	
});

process.on('exit', function() {
	//azbn.mdl('winston').warn(__filename + ' is stoped');
});