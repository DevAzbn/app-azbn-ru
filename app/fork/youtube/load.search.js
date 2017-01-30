'use strict';

//process.chdir(process.cwd());

var azbn = require('./../../../azbnode/LoadAzbnode')({
		root_module : module,
		mdls :{
			include : {
				mysql : true,
				async : true,
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

azbn.mdl('mysql').query("SELECT * FROM `" + azbn.mdl('cfg').mysql.t.yt.token + "` WHERE 1 ORDER BY RAND() LIMIT 1", function(_err, rows, fields) {
	
	if (_err) {
		
		azbn.mdl('winston').warn('Error on load token: ' + _err);
		
		azbn.mdl('fork').killMe(process, 0, {
			count : 0,
			html : '',
		});
		
		throw _err;
		
	} else if(rows.length == 0) {
		
		azbn.mdl('winston').warn('No tokens in DB!');
		
		azbn.mdl('fork').killMe(process, 0, {
			count : 0,
			html : '',
		});
		
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
						
						azbn.mdl('fork').killMe(process);
						
					} else {
						
						if (__data) {
							
							//console.log(util.inspect(data, false, null));
							azbn.mdl('winston').warn(azbn.mdl('cfg').path.static + '/youtube/_.js');
							
							azbn.mdl('fs').writeFileSync(azbn.mdl('cfg').path.static + '/youtube/_.js', 'var __data = ' + JSON.stringify(__data) + ';');
							
							if(__data.items && __data.items.length) {
								
								var async_arr = [];
								
								for(var i = 0; i < __data.items.length; i++) {
									
									(function(item){
										
										async_arr.push(function(callback){
											
											var __v = {
												q : q_str,
												uid : item.id.videoId,
												img : item.snippet.thumbnails.high.url,
												title : item.snippet.title,
												description : item.snippet.description,
											};
											
											azbn.mdl('mysql').query("INSERT IGNORE INTO `" + azbn.mdl('cfg').mysql.t.yt.video + "` SET ? ", __v, function(___err, ___result) {
												
												callback(null, null);
												
											});
											
										});
										
									})(__data.items[i]);
									
									//var item = __data.items[i];
									
								}
								
								azbn.mdl('async').series(async_arr, function (__err, __results) {
									azbn.mdl('fork').killMe(process, 0, {
										error : __err,
										results : __results,
									});
								});
								
							} else {
								
								azbn.mdl('winston').warn('No items');
								
								azbn.mdl('fork').killMe(process);
								
							}
							
						} else {
							
							azbn.mdl('winston').warn('No data');
							
							azbn.mdl('fork').killMe(process);
							
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