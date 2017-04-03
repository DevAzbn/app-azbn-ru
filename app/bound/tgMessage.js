'use strict';

function tgMessage(azbn, msg) {
	
	azbn.mdl('nedb.tgmessages').insert({
		created_at : azbn.now(),
		created_at_str : azbn.formattime(),
		msg : msg,
	});
	
	var valid = false;
	
	var text = msg.text || '';
	var author = '';
	
	if(text.indexOf('/azbn') == 0) {
		
		valid = true;
		
	} else if(msg.chat.type == 'private') {
		
		valid = true;
		
	} else {
		
	}
	
	if(valid) {
		
		author = msg.from.first_name + ' ' + msg.from.last_name;
		
		if(msg.chat.type == 'private') {
			
		} else if(msg.chat.type == 'group') {
			author = author + '@' + msg.chat.title;
		} else if(msg.chat.type == 'supergroup') {
			author = author + '@' + msg.chat.title;
		}
		
		azbn.mdl('websocket').sockets.emit('message.text', msg.text, author);
		
	}
	
	/*
	
	//azbn.mdl('winston').info('Msg from Tg ' + msg.text);
	
	azbn.mdl('websocket').sockets.emit('messageToClients', msg.text, author);
	
	*/
}

module.exports = tgMessage;