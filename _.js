'use strict';

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

var cfg = {
	path : {
		azbnode : './azbnode',
	},
};


var azbn = require(cfg.path.azbnode + '/azbnode');

azbn.load('cfg', cfg);

azbn.load('azbnodeevents', new require(cfg.path.azbnode + '/azbnodeevents')(azbn));

azbn.load('cli', new require(cfg.path.azbnode + '/azbnodecliclient')(azbn));
azbn.event('loaded_azbnode', azbn);


azbn.parseArgv();
azbn.event('parsed_argv', azbn);

azbn.mdl('cli').run('git status', function(resp){
	console.log(resp);
})