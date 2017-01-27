/*
обработчик запроса
*/

function _(azbn) {
	
	var log_tag = 'api/post';
	azbn.echo_dev('Handler loaded', log_tag);
	
	this.handler = function(req, res) {
		res.send(log_tag + ' response');
	}
	
	return this.handler;
}

module.exports = _;