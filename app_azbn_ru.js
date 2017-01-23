'use strict';

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

var cfg = require('./baseconfig.json');

var azbn = require(cfg.path.azbnode + '/azbnode');

azbn.load('cfg', cfg);

azbn.load('azbnodeevents', new require(cfg.path.azbnode + '/azbnodeevents')(azbn));
azbn.load('web', new require(cfg.path.azbnode + '/azbnodewebclient')(azbn));
azbn.load('fork', new require(cfg.path.azbnode + '/azbnodeforkclient')(azbn));
azbn.event('loaded_azbnode', azbn);

azbn.parseArgv();
azbn.event('parsed_argv', azbn);

azbn.load('fs', require('fs'));
azbn.load('taskq', require('azbn-task-queue'));
//azbn.load('querystring', require('querystring'));
//azbn.load('path', require('path'));

/*
azbn.load('https', require('https'));
*/

//azbn.load('cfg', require(cfg.path.app + '/config'));
azbn.load('mysql', require(cfg.path.app + '/mysql')(azbn));
azbn.load('tg', require(cfg.path.app + '/tg')(azbn));
//azbn.load('vk', require(cfg.path.app + '/vk'));

// модуль логирования
azbn.load('winston', require('./lib/getWinston')(module));

azbn.mdl('mysql').connect(function(err){
	
	if(err) {
		
		azbn.mdl('winston').warn('Could not connect to mysql');
		
	} else {
		
		
		azbn.mdl('winston').info('DB is connected');
		
		azbn.load('intervals', require(cfg.path.app + '/intervals')(azbn));
		
		azbn.mdl('tg').getMe().then(function(me) {
			
			//require(cfg.path.app + '/require/telegram/tg_getMe')(azbn, me);
			
			azbn.mdl('tg').sendMessage(azbn.mdl('cfg').tg.log.chat_id, 'Бот ' + me.username + ' в сети', {
				//reply_to_message_id : msg.message_id,
				caption : 'Подключение к Телеграму',
			});
			
		});
		
		azbn.mdl('tg').on('message', function (msg) {
			//require(cfg.path.app + '/require/telegram/tg_on_message')(azbn, msg);
		});
		
	}
});


var express = require('express');
azbn.load('express', express());


/*
azbn.mdl('https')
	.createServer({
		key : azbn.mdl('fs').readFileSync(cfg.cert.key),
		cert : azbn.mdl('fs').readFileSync(cfg.cert.cert),
		passphrase : '1985',
	}, azbn.mdl('express'))
	.listen(cfg.express.sport)
	;
*/


// компрессия
azbn.mdl('express').use(require('compression')());


// логгер
azbn.mdl('express').use((new require(cfg.path.app + '/logger/default')(azbn)));


// боди-парсер
var bodyParser = require('body-parser');
azbn.mdl('express').use(bodyParser.json());
azbn.mdl('express').use(bodyParser.urlencoded({ extended: true }));

// куки-парсер
azbn.mdl('express').use(require('cookie-parser')());


// перепись метода
azbn.mdl('express').use(require('method-override')('_method'));



// сервер статики
azbn.mdl('express').use(express.static(cfg.path.static, {
	index : 'index.html',
	redirect : true,
	
	setHeaders : function(res, path, stat){
		res.set('x-timestamp' , Date.now());
	}
	
}));



require(cfg.path.app + '/app.js')(azbn);



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




azbn.load('http', azbn.mdl('express').listen(cfg.express.port, function() {
	azbn.mdl('winston').info('Example app listening on port ' + cfg.express.port + '!');
}));

process.on('exit', function() {
	azbn.unload('http');
	azbn.unload('https');
	azbn.mdl('winston').warn('http- and https-servers is stoped');
});