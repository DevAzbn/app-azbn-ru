'use strict';

/*
{
  "message_id": 315,
  "from": {
    "id": 136573652,
    "first_name": "Alexander",
    "last_name": "Zybin",
    "username": "azbn_ru"
  },
  "chat": {
    "id": -45438138,
    "title": "AzbnBotChat",
    "type": "group",
    "all_members_are_administrators": true
  },
  "date": 1490986651,
  "new_chat_participant": {
    "id": 323663115,
    "first_name": "AppAzbnRu",
    "username": "AppAzbnRuBot"
  },
  "new_chat_member": {
    "id": 323663115,
    "first_name": "AppAzbnRu",
    "username": "AppAzbnRuBot"
  },
  "new_chat_members": [
    {
      "id": 323663115,
      "first_name": "AppAzbnRu",
      "username": "AppAzbnRuBot"
    }
  ]
}

{
  "message_id": 367,
  "from": {
    "id": 136573652,
    "first_name": "Alexander",
    "last_name": "Zybin",
    "username": "azbn_ru"
  },
  "chat": {
    "id": 136573652,
    "first_name": "Alexander",
    "last_name": "Zybin",
    "username": "azbn_ru",
    "type": "private"
  },
  "date": 1490990745,
  "text": "tertfdsdsfdsfds"
}
*/

function tgMessage(azbn, msg) {
	
	var text = msg.text || '';
	var author = '';
	
	if(msg.chat.type == 'private') {
		author = msg.from.first_name + ' ' + msg.from.last_name;
	} else if(msg.chat.type == 'group') {
		author = msg.from.first_name + ' ' + msg.from.last_name + '@' + msg.chat.title;
	}
	
	azbn.mdl('websocket').sockets.emit('messageToClients', msg.text, author);
	
	/*
	if(text.indexOf('/app') == 0) {
		azbn.mdl('winston').info('Msg from Tg ' + msg.text);
	}
	*/
	
	
}

module.exports = tgMessage;