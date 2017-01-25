'use strict';

//process.chdir(process.cwd());

var azbn = require('./../../../azbnode/LoadAzbnode')({
		root_module : module,
		mdls :{
			include : {
				//mysql : true,
				//tg : true,
				webclient : true,
				//https : true,
			},
		},
	});

var data = azbn.mdl('fork').parseCliData(process.argv);

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

azbn.mdl('webclient').r('GET', /*'https://news.yandex.ru'*/'https://yandex.ru/', {}, function(err, response, html){
	
	if(err){
		
		azbn.mdl('winston').error(err);
		
		process.send({status : 0, html : 'no connect'});
		
		return;
		
	} else {
		
		var $ = azbn.mdl('webclient').parse(html);
		
		//var phr = [];
		var words_s = [];
		
		$('#tabnews_newsc .list.b-news-list li')
		//$('body')
			.each(function(index){
				
				//phr[index] = [];
				
				var block = $(this);
				
				var theme_obr = block
					.text()
					.toUpperCase()
					.replace(/[^\s\tA-Za-zА-Яа-яЁё0-9]/g, "")
					.split(' ')
				;
				
				for(var i in theme_obr) {
					if(theme_obr[i].length > 3) {
						
						var _w = azbn.mdl('morphy').getBaseForm(theme_obr[i], Morphy.NORMAL);
						
						for(var j in _w) {
							var __w = {
								title : _w[j].toLowerCase(),
								part : azbn.mdl('morphy').getPartOfSpeech(_w[j], Morphy.NORMAL),
							};
							
							if(azbn.inArray('С', __w.part)) {
								words_s.push(__w);
							}
							
							//phr[index].push(__w);
						}
						
					}
				}
				
			});
		
		var __word_stat = {};
		
		for(var i in words_s) {
			if(__word_stat[words_s[i].title]) {
				
				(__word_stat[words_s[i].title]).count++;
				
			} else {
				
				__word_stat[words_s[i].title] = {
					title : words_s[i].title,
					part : words_s[i].part,
					count : 1,
				};
				
			}
		}
		
		var word_stat = [];
		
		for(var i in __word_stat) {
			word_stat.push(__word_stat[i]);
		}
		
		word_stat.sort(function(a, b){
			return -(a.count - b.count);
		});
		
		var q_arr = [];
		
		for(var i in word_stat) {
			console.log(word_stat[i].title);
			if(i < 3) {
				q_arr.push(word_stat[i].title);
			}
		}
		
		//console.log(q_arr.join(' '));
		
		azbn.mdl('fork').run('youtube/load.search', { q : q_arr.join(' ')}, function(_process, _result){
			
			if(_result.status == 0) {
				
				_process.kill();
				
				process.send({status : 0, html : 'ok'});
				
			}
			
		});
		
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