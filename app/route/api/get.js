/*
обработчик запроса
*/

function _(azbn) {
	
	var log_tag = 'api/get';
	azbn.echo_dev('Handler loaded', log_tag);
	
	this.handler = function(req, res) {
		//res.send(log_tag + ' response');
		//res.send(req.headers);
		
		azbn.mdl('mysql').query("" +
			"SELECT " +
				"id, counters_friends, counters_followers, counters_subscriptions " +
			"FROM " +
				"`" + azbn.mdl('cfg').mysql.t.vk.userhistory + "` " +
			"WHERE " +
				"1 " +
				"AND " +
				"user_id = '" + req.query.user_id + "' " +
			"ORDER BY " +
				"created_at " +
			"LIMIT 1000 " +
			"", function(error, rows, fields){
				
				if (error) {
					
					res.send(error);
					
				} else if(rows.length == 0) {
					
					res.send([]);
					
				} else {
					
					res.send(rows);
					
				}
				
			})
		
	}
	
	return this.handler;
}

module.exports = _;