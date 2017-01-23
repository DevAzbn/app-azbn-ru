'use strict';

var cfg = require('./baseconfig.json');

var azbn = require(cfg.path.azbnode + '/azbnode');

azbn.load('cfg', cfg);

azbn.load('azbnodeevents', new require(cfg.path.azbnode + '/azbnodeevents')(azbn));
azbn.load('fork', new require(cfg.path.azbnode + '/azbnodeforkclient')(azbn));
azbn.event('loaded_azbnode', azbn);

var argv = require('optimist').argv;

azbn.parseArgv();
azbn.event('parsed_argv', azbn);

azbn.load('fs', require('fs'));

azbn.load('tg', require(cfg.path.app + '/tg')(azbn));

// модуль логирования
azbn.load('winston', require('./lib/getWinston')(module));

//argv.fork
azbn.mdl('tg').getMe().then(function(me) {
	
	//require(cfg.path.app + '/require/telegram/tg_getMe')(azbn, me);
	
	azbn.mdl('tg').sendMessage(azbn.mdl('cfg').tg.log.chat_id, 'Бот ' + me.username + ' в сети', {
		//reply_to_message_id : msg.message_id,
		caption : 'Подключение к Телеграму',
	});
	
	azbn.mdl('fork').run(argv.fork, {}, function(fork_result){});
	
});
