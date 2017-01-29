'use strict';

//process.chdir(process.cwd());

var azbn = require('../../azbnode/LoadAzbnode')({
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

azbn.mdl('mysql').connect(function(err){
	
	if(err) {
		
		azbn.mdl('winston').error('Could not connect to mysql: ' + err);
		
		azbn.mdl('fork').killMe(process, 0, {
			error : err,
		});
		
	} else {
		
		//azbn.mdl('winston').info('DB is connected');
		
		azbn.mdl('mysql').query("SELECT * FROM `" + azbn.mdl('cfg').mysql.t.fork + "` WHERE 1 ORDER BY id", function(_err, rows, fields) {
			
			if (_err) {
				
				azbn.mdl('winston').warn('Error on load tasks: ' + _err);
				
				azbn.mdl('fork').killMe(process, 0, {
					error : _err,
				});
				
			} else if(rows.length == 0) {
				
				azbn.mdl('winston').warn('No tasks in DB!');
				
				azbn.mdl('fork').killMe(process, 0, {
					count : 0,
					html : 'ok',
				});
				
			} else {
				
				for(var i = 0; i < rows.length; i++){
					
					var item = rows[i];
					azbn.mdl('winston').log('info', item.path + ': ' + item.title);
					
				}
				
				azbn.mdl('fork').killMe(process, 0, {
					count : rows.length,
					html : 'ok',
				});
				
			}
			
		});
		
	}
});


process.on('exit', function() {
	azbn.mdl('winston').warn(__filename + ' is stoped');
});