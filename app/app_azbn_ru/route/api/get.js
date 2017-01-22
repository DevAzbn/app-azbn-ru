/*
обработчик запроса
*/

function _(azbn) {
	
	var log_tag = 'api/get';
	azbn.echo('Handler loaded', log_tag);
	
	this.handler = function(req, res) {
		//res.send(log_tag + ' response');
		res.send(req.headers);
	}
	
	return this.handler;
}

module.exports = _;