'use strict';

var azbn = require('../../azbnode/LoadAzbnode')({
		root_module : module,
		mdls :{
			include : {
				//async : true,
			},
		},
	});

var data = azbn.mdl('fork').parseCliData(process.argv);

azbn.mdl('helper').get('default/test').test('x23');