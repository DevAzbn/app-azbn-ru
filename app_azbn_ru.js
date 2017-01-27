'use strict';

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

var azbn = require('./azbnode/LoadAzbnode')({
		root_module : module,
		mdls :{
			include : {
				mysql : true,
				tg : true,
				webclient : true,
				//https : true,
			},
		},
	});

azbn.mdl('mysql').connect(function(err){
	
	if(err) {
		
		azbn.mdl('winston').warn('Could not connect to mysql');
		
	} else {


		azbn.echo_dev('DB is connected');
		
		azbn.load('intervals', require(azbn.mdl('cfg').path.app + '/intervals')(azbn));
		
		azbn.mdl('tg').getMe().then(function(me) {
			
			//require(azbn.mdl('cfg').path.app + '/require/telegram/tg_getMe')(azbn, me);
			
			azbn.mdl('tg').sendMessage(azbn.mdl('cfg').tg.log.chat_id, 'Бот ' + me.username + ' в сети', {
				//reply_to_message_id : msg.message_id,
				caption : 'Подключение к Телеграму',
			});
			
		});
		
		azbn.mdl('tg').on('message', function (msg) {
			//require(azbn.mdl('cfg').path.app + '/require/telegram/tg_on_message')(azbn, msg);
		});
		
	}
});


var express = require('express');
azbn.load('express', express());


/*
azbn.mdl('https')
	.createServer({
		key : azbn.mdl('fs').readFileSync(azbn.mdl('cfg').cert.key),
		cert : azbn.mdl('fs').readFileSync(azbn.mdl('cfg').cert.cert),
		passphrase : '1985',
	}, azbn.mdl('express'))
	.listen(azbn.mdl('cfg').express.sport)
	;
*/


// компрессия
azbn.mdl('express').use(require('compression')());


// логгер
azbn.mdl('express').use((new require(azbn.mdl('cfg').path.app + '/logger/default')(azbn)));


// боди-парсер
var bodyParser = require('body-parser');
azbn.mdl('express').use(bodyParser.json());
azbn.mdl('express').use(bodyParser.urlencoded({ extended: true }));

// куки-парсер
azbn.mdl('express').use(require('cookie-parser')());


// перепись метода
azbn.mdl('express').use(require('method-override')('_method'));



// сервер статики
azbn.mdl('express').use(express.static(azbn.mdl('cfg').path.static, {
	index : 'index.html',
	redirect : true,
	
	setHeaders : function(res, path, stat){
		res.set('x-timestamp' , Date.now());
	}
	
}));



require(azbn.mdl('cfg').path.app + '/express_router.js')(azbn);



// ошибки
azbn.mdl('express').use(function(req, res, next){
	res.status(404);
	azbn.mdl('winston').debug('Not found URL: %s', req.url);
	res.send({ error: 'Not found' });
	return;
});

azbn.mdl('express').use(function(err, req, res, next){
	azbn.mdl('winston').error('Internal error(%d): %s', res.statusCode, err.message);
	azbn.mdl('winston').error(err.stack);
	res.status(err.status || 500).send({ error: err.message });
	return;
});

azbn.mdl('express').get('/error', function(req, res, next){
	//next(new Error('Error!'));
	azbn.mdl('winston').error(new Error('Error!'));
});




azbn.load('http', azbn.mdl('express').listen(azbn.mdl('cfg').express.port, function() {
	azbn.mdl('winston').info('App listening on port ' + azbn.mdl('cfg').express.port);
}));

process.on('exit', function() {
	azbn.unload('http');
	azbn.unload('https');
	azbn.mdl('winston').warn('http- and https-servers is stoped');
});