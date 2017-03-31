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
*/

function tgMessage(azbn, msg) {
	
	var text = msg.text || '';
	
	azbn.mdl('websocket').emit('message', msg);
	
	if(text.indexOf('/app') == 0) {
		azbn.mdl('winston').info('Msg from Tg ' + msg.text);
	}
	
	
	
}

module.exports = tgMessage;