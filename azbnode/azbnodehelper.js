'use strict';

function AzbNodeHelper(azbn) {
	
	var log_name = 'AzbNodeForkClient';
	
	var ctrl = {
		__mdls  : {},
	};
	
	ctrl.get = function(uid) {
		
		//__dirname + '/../' + azbn.mdl('cfg').path.fork + '/' + command
		
		if(uid && uid != '') {
			
			if(azbn.is_def(ctrl.__mdls[uid])) {
				return ctrl.__mdls[uid];
			} else {
				ctrl.__mdls[uid] = new require(__dirname + '/../' + azbn.mdl('cfg').path.helper + '/' + uid)(azbn);
				return ctrl.__mdls[uid];
			}
			
		} else {
			
			return ctrl;
			
		}
		
	};
	
	return ctrl;
	
}

module.exports = AzbNodeHelper;