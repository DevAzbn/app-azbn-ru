'use strict';

var mysql = require('mysql');

var createMySQL = function(azbn) {
	
	var connection = mysql.createConnection({
		host		: azbn.mdl('cfg').mysql.host,
		user		: azbn.mdl('cfg').mysql.user,
		password	: azbn.mdl('cfg').mysql.password,
		database	: azbn.mdl('cfg').mysql.database,
	});
	
	/*
	var connection = {};
	
	var connectFnc = function() {
		
		connection = null;
		
		connection = mysql.createConnection({
			host		: azbn.mdl('cfg').mysql.host,
			user		: azbn.mdl('cfg').mysql.user,
			password	: azbn.mdl('cfg').mysql.password,
			database	: azbn.mdl('cfg').mysql.database,
		});
		
		connection.on('error', function onError(err) {
			if (err.code == 'PROTOCOL_CONNECTION_LOST') {
				connectFnc();
			} else {
				throw err;
			}
		});
		
	};
	
	connectFnc();
	*/
	
	return connection;
	
}

//connection.connect();

module.exports = createMySQL;