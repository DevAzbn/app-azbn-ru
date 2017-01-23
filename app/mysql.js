'use strict';

var mysql = require('mysql');

var createMySQL = function(azbn) {
	
	var connection = mysql.createConnection({
		host		: azbn.mdl('cfg').mysql.host,
		user		: azbn.mdl('cfg').mysql.user,
		password	: azbn.mdl('cfg').mysql.password,
		database	: azbn.mdl('cfg').mysql.database,
	});
	
	return connection;
	
}

//connection.connect();

module.exports = createMySQL;