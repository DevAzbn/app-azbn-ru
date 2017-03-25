'use strict';

var azbn = require('./azbnode/LoadAzbnode')({
		root_module : module,
		mdls :{
			include : {
				//mysql : true,
				//tg : true,
				//webclient : true,
				//https : true,
			},
		},
		is_dev : true,
	});

var argv = require('optimist').argv;

console.log('---------------------');
console.log('');
console.log('');

azbn.mdl('fork').run(argv.fork, argv, function(_process, _result){
	
	if(_result.status == 0) {
		
		_process.kill();
		//_process = null;
		
		console.log('');
		console.log('');
		console.log('---------------------');
		azbn.mdl('winston').info('Test: ok!');
		
	} else if(_result.status < 0) {
		
		_process.kill();
		//_process = null;
		
		console.log('');
		console.log('');
		console.log('---------------------');
		azbn.mdl('winston').error('Test: error! ' + JSON.stringify(_result));
		
	}
	
	//if(_process) {
	//	azbn.mdl('winston').warn('Process not killed! (' + _result.status + ')');
	//}
	
});
