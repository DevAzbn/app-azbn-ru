'use strict';

function _(azbn) {
	
	var ctrl = {};
	
	ctrl.test = function(str) {
		
		azbn.echo(str);
		
	}
	
	return ctrl;
	
}

module.exports = _;