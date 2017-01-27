'use strict';

function AzbNodeTiming(azbn) {
	
	var log_name = 'AzbNodeTiming';

	var ctrl = {};

	ctrl.createTiming = function(uid) {

		var t = this;

		t.__uid = uid;

		t.__start = azbn.now();

		t.end = function() {

			t.__end = azbn.now();

			t.__res = t.__end - t.__start;

			azbn.echo_dev('Timing of `' + t.__uid + '` finished in ' + t.__res + ' ms');

			return t.__res;

		};

		return t;

	};
	
	return ctrl;
	
}

module.exports = AzbNodeTiming;