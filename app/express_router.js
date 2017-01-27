/*
обработчик запроса
*/

function _(azbn) {
	
	var log_tag = 'express_router';

	azbn.echo_dev(log_tag + ' loaded');

	azbn.mdl('express').set('views', azbn.mdl('cfg').path.app + '/jade');
	azbn.mdl('express').set('view engine', 'jade');
	
	azbn.load('azbn-tple',  new require('azbn-tple')({
		part_path : azbn.mdl('cfg').path.app + '/azbn-tple',
		cache : {
			tpls : [
				'/index.azbn-tple',
			],
		},
	}));
	
	
	//azbn.mdl('express').get('/api/call/',				(new require(cfg.path.app + '/route/api/get')(azbn)));
	//azbn.mdl('express').post('/api/call/',				(new require(cfg.path.app + '/route/api/post')(azbn)));
	
	azbn.mdl('express').get('/process/forever.restart/',				(new require('./route/process/forever.restart')(azbn)));
	azbn.mdl('express').get('/process/fork/',				(new require('./route/process/fork')(azbn)));
	azbn.mdl('express').get('/process/memory/',				(new require('./route/process/memory')(azbn)));
	
	azbn.mdl('express').get('/oauth2/:uid/',				(new require('./route/oauth2')(azbn)));
	azbn.mdl('express').get('/oauth2callback/:uid/',				(new require('./route/oauth2callback')(azbn)));
	
	azbn.mdl('express').get('/admin/app/fork/list/',				(new require('./route/admin/app/fork/list')(azbn)));
	
	/*
	var NeDB = require('nedb');
	
	azbn.load('nedb.entity', new NeDB({filename : azbn.mdl('cfg').path.app + '/nedb/entity.nedb'}));
	azbn.mdl('nedb.entity').loadDatabase();
	azbn.mdl('nedb.entity').ensureIndex({fieldName : 'uid'});
	
	azbn.mdl('express').get('/entity/item/:uid/',					(new require('./route/entity/item/get')(azbn)));
	azbn.mdl('express').post('/entity/item/create/',				(new require('./route/entity/item/post')(azbn)));
	azbn.mdl('express').put('/entity/item/update/',					(new require('./route/entity/item/put')(azbn)));
	azbn.mdl('express').delete('/entity/item/delete/',				(new require('./route/entity/item/delete')(azbn)));
	
	azbn.mdl('express').get('/entity/list/',						(new require('./route/entity/list/get')(azbn)));
	
	azbn.mdl('express').get('/web/get/',						(new require('./route/web/get')(azbn)));
	
	azbn.mdl('express').get('/jade/index/',						(new require('./route/jade/index')(azbn)));
	
	azbn.mdl('express').get('/azbn-tple/index/',						(new require('./route/azbn-tple/index')(azbn)));
	azbn.mdl('express').get('/azbn-tple/version/',						(new require('./route/azbn-tple/version')(azbn)));
	*/
	
	/*
	azbn.mdl('express').get('/:uid/',					(new require('./route/entity/item/get')(azbn)));
	*/
	
}

module.exports = _;