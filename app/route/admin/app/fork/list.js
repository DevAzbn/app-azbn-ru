'use strict';

function _(azbn) {
	
	var log_tag = 'admin/app/fork/list';
	azbn.echo_dev('Handler loaded', log_tag);
	
	var handler = function(req, res) {
		
		azbn.mdl('mysql').query("SELECT * FROM `" + azbn.mdl('cfg').mysql.t.fork + "` WHERE 1 ORDER BY lastact DESC", function(err, rows, fields) {
			
			if (err) {
				
				res.send(err);
				
			} else if(rows.length == 0) {
				
				res.send('no forks!');
				
			} else {
				
				res.render('admin/app/fork/list', { items : rows });
				
			}
			
		});
		
	}
	
	return handler;
}

module.exports = _;