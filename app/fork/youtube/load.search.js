'use strict';

//process.chdir(process.cwd());

var azbn = require('./../../../azbnode/LoadAzbnode')({
		root_module : module,
		mdls :{
			include : {
				mysql : true,
				//tg : true,
				//webclient : true,
				//https : true,
			},
		},
	});

var data = azbn.mdl('fork').parseCliData(process.argv);

var _GOOGLE_OBJECTS_
	, google = require('googleapis')
	, googleClient = require(process.cwd() + '/' + azbn.mdl('cfg').path.bound + '/google/createClient')
;

azbn.mdl('mysql').query("SELECT * FROM `" + azbn.mdl('cfg').mysql.t.yt_token + "` WHERE 1 ORDER BY RAND() LIMIT 1", function(_err, rows, fields) {
	
	if (_err) {
		
		azbn.mdl('winston').warn('Error on load token: ' + _err);
		
		process.send({status : 0, count : 0, html : ''});
		
		throw _err;
		
	} else if(rows.length == 0) {
		
		azbn.mdl('winston').warn('No tokens in DB!');
		
		process.send({status : 0, count : 0, html : 'ok'});
		
	} else {
		
		var k = 0;
		
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
				
				var q_str = data.q || item.q;
				
				youtube.search.list({
					part : 'id,snippet',
					maxResults : 50,
					type : 'video',
					order : 'date',
					q : q_str,
					
					//order : 'date',//для видео
					//type : 'video',//при поиске
					//myRating : 'like',
					
					//chart : 'mostPopular',
					//q : APP_SEARCH_STR,//для поиска
					
				}, function (__err, __data) {
					
					if (__err) {
						
						azbn.mdl('winston').warn('Error on search: ' + __err);
						
						process.send({status : 0,});
						
					} else {
						
						if (__data) {
							
							//console.log(util.inspect(data, false, null));
							azbn.mdl('winston').warn(azbn.mdl('cfg').path.static + '/youtube/_.js');
							
							azbn.mdl('fs').writeFileSync(azbn.mdl('cfg').path.static + '/youtube/_.js', 'var __data = ' + JSON.stringify(__data) + ';');
							
							if(__data.items && __data.items.length) {
								
								for(var i = 0; i < __data.items.length; i++) {
									
									(function(item, count){
										
										var __v = {
											q : q_str,
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
											k++;
											
											if(k == __data.items.length) {
												
												process.send({status : 0,});
												
											}
											
										});
										
									})(__data.items[i], i);
									
									//var item = __data.items[i];
									
								}
								
							} else {
								
								azbn.mdl('winston').warn('No items');
								
								process.send({status : 0,});
								
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