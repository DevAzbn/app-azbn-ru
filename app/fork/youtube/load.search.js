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


var _GOOGLE_OBJECTS_
	, fs = require('fs')
	, google = require('googleapis')
	, googleClient = require(cfg.path.bound + '/./google/createClient')
;

azbn.mdl('mysql').query("SELECT * FROM `" + azbn.mdl('cfg').mysql.t.yt_token + "` WHERE 1 ORDER BY RAND() LIMIT 1", function(_err, rows, fields) {
	
	if (_err) {
		
		azbn.mdl('winston').warn('Error on load token: ' + _err);
		
		process.send({status : -1, count : 0, html : ''});
		
		throw _err;
		
	} else if(rows.length == 0) {
		
		azbn.mdl('winston').warn('No tokens in DB!');
		
		process.send({status : 0, count : 0, html : 'ok'});
		
	} else {
		
		for(var i = 0; i < rows.length; i++){
			
			var item = rows[i];
			
			item.tokens = JSON.parse(item.tokens);
			
			googleClient.setCredentials(item.tokens);
			
			var youtube = google.youtube({
				version : 'v3',
				auth : googleClient.oAuth2Client
			});
			
			googleClient.execute(function() {
				
				//azbn.mdl('winston').warn('mark');
				
				youtube.search.list({
					part : 'id,snippet',
					maxResults : 50,
					type : 'video',
					order : 'date',
					q : item.q,
					
					//order : 'date',//для видео
					//type : 'video',//при поиске
					//myRating : 'like',
					
					//chart : 'mostPopular',
					//q : APP_SEARCH_STR,//для поиска
					
				}, function (__err, __data) {
					
					if (__err) {
						
						azbn.mdl('winston').warn('Error on search: ' + __err);
						
					} else {
						
						if (__data) {
							
							//console.log(util.inspect(data, false, null));
							azbn.mdl('winston').warn(cfg.path.static + '/youtube/_.js');
							
							fs.writeFileSync(cfg.path.static + '/youtube/_.js', 'var __data = ' + JSON.stringify(__data) + ';');
							
							if(__data.items && __data.items.length) {
								
								for(var i = 0; i < __data.items.length; i++) {
									
									(function(item, count){
										
										var __v = {
											uid : item.id.videoId,
											img : item.snippet.thumbnails.high.url,
											title : item.snippet.title,
											description : item.snippet.description,
										};
										
										azbn.mdl('mysql').query("INSERT IGNORE INTO `" + azbn.mdl('cfg').mysql.t.yt_video + "` SET ? ", __v, function(___err, ___result) {
											/*
											if(___err) {
												
												azbn.mdl('winston').error(___err);
												
											} else if(___result.insertId) {
												
											}
											*/
											
											if(count == (__data.items.length - 1)) {
												
												process.send({status : 0,});
												
											}
											
										});
										
									})(__data.items[i], i);
									
									//var item = __data.items[i];
									
								}
								
							}
							
						} else {
							
							azbn.mdl('winston').warn('No data');
							
							process.send({status : 0,});
							
						}
						
					}
					
					//process.exit();
				});
				
			});
			
		}
		
		
		
	}
	
});

process.on('exit', function() {
	//azbn.mdl('winston').warn(__filename + ' is stoped');
});