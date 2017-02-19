'use strict';

var azbn = require('../../azbnode/LoadAzbnode')({
		root_module : module,
		mdls :{
			include : {
				async : true,
			},
		},
	});

var data = azbn.mdl('fork').parseCliData(process.argv);

azbn.mdl('async')
	.waterfall([
		
		function(cb){
			
			var r = 5;
			
			cb(null, r);
			
		},
		
		function(r, cb){
			
			r++;
			
			cb(2, r);
			
		},
		
		function(r, cb){
			
			r++;
			
			cb(3, r);
			
		},
		
	], function (err, result) {
		
		console.log(err);
		console.log(result);
		
		azbn.mdl('fork').killMe(process, 0, {
			error : err,
			result : result,
		});
		
	});