/*
бот телеграма
*/

var TelegramBot = require('node-telegram-bot-api');

var createBot = function(azbn) {
	
	var bot = new TelegramBot(azbn.mdl('cfg').tg.bot.token, {polling: true});
	
	return bot;
	
}

module.exports = createBot;