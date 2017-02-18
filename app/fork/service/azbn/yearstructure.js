'use strict';

//process.chdir(process.cwd());

//var async = require('async');

var azbn = require('./../../../../azbnode/LoadAzbnode')({
		root_module : module,
		mdls :{
			include : {
				//mysql : true,
				//vk : true,
				//async : true,
				//tg : true,
				//webclient : true,
				//https : true,
			},
		},
	});

var data = azbn.mdl('fork').parseCliData(process.argv);


var	_
	, root = azbn.mdl('cfg').path.static + '/service/azbn/yearstructure'
	, yearDir = data.year || new Date().getFullYear()
	, days = 0
	;

var daysInMonth = function(y, m) {
	y = y || new Date().getFullYear();
	m = m !== null ? m : new Date().getMonth();
	return (33 - new Date(y, m, 33).getDate());
};


azbn.mdl('fs').access(root, azbn.mdl('fs').constants.F_OK | azbn.mdl('fs').constants.R_OK | azbn.mdl('fs').constants.W_OK, function(error){
	
	if(error) {
		
		console.error(error);
		
		azbn.mdl('fork').killMe(process);
		
	} else {
		
		var newDir = root + '/' + yearDir;
		
		azbn.mdl('fs').mkdir(newDir, function(_error){
			
			if(_error) {
				
				console.error(_error);
				
				azbn.mdl('fork').killMe(process);
				
			} else {
				
				for(var m = 1; m < 13; m++) {
					
					(function(i){
						
						var _i = '' + i;
						var __i = (daysInMonth(yearDir, i - 1) + 1);
						
						//console.log(i);
						
						if(_i.length === 1) {
							_i = '0' + _i;
						}
						
						var _newDir = newDir + '/' + _i;
						
						azbn.mdl('fs').mkdir(_newDir, function(__error){
							
							if(__error) {
								
								console.error(__error);
								
								azbn.mdl('fork').killMe(process);
								
							} else {
								
								for(var d = 1; d < __i; d++) {
									
									(function(j){
										
										var _j = '' + j;
										
										if(_j.length === 1) {
											_j = '0' + _j;
										}
										
										var __newDir = _newDir + '/' + _j;
										
										azbn.mdl('fs').mkdir(__newDir, function(___error){
											
											if(___error) {
												
												console.error(___error);
												
												azbn.mdl('fork').killMe(process);
												
											} else {
												
												days++;
												
												console.log(days);
												
												var febr_days = daysInMonth(yearDir, 1);
												
												if((days == 365 && febr_days == 28) || (days == 366 && febr_days == 29)) {
													
													azbn.mdl('fork').killMe(process);
													
												}
												
											}
											
										});
										
									})(d);
									
								}
								
							}
							
						});
						
					})(m);
					
				}
				
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