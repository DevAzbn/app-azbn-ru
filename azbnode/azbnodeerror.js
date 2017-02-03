'use strict';

function AzbNodeError(azbn) {
	
	var log_name = 'AzbNodeError';

	var ctrl = {};
	
	ctrl.save = function(module, error, cb) {
		
		error = error || {};
		
		var item = {
			created_at : azbn.now_sec(),
			module : module,
			p : JSON.stringify(error),
		};
		
		azbn.mdl('mysql').query("INSERT INTO `" + azbn.mdl('cfg').mysql.t.error + "` SET ? ", item, function(__err, __result) {
			
			if(cb) {
				cb(__result);
			}
			
		});
		
	}
	
	return ctrl;
	
}

module.exports = AzbNodeError;