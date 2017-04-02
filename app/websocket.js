'use strict';

var io;

var createWebSocketServer = function(azbn) {
	
	io = require('socket.io')(azbn.mdl('cfg').express.wsport);
	
	io.on('connection', function (socket) { // Создаем обработчик события 'connection' которое создает io.connect(port); с аргументом socket
		
		var name = 'U' + (socket.id).toString();//.substr(1,4);
		
		socket.broadcast.emit('newUser', name); // Отсылает событие 'newUser' всем подключенным, кроме текущего. На клиенте навешаем обработчик на 'newUser' (Отправляет клиентам событие о подключении нового юзера)
		
		socket.emit('userName', name); // Отправляем текущему клиенту событие 'userName' с его ником (name) (Отправляем клиенту его юзернейм)
		
		//logger.info(name + ' connected to chat!'); // Логгирование
		
		
		socket.on('message.text', function(msg){ // Обработчик на событие 'message' и аргументом (msg) из переменной message
			//logger.warn('-----------'); // Logging
			//logger.warn('User: ' + name + ' | Message: ' + msg);
			//logger.warn('====> Sending message to other chaters...');
			io.sockets.emit('message.text', msg, name); // Отправляем всем сокетам событие 'messageToClients' и отправляем туда же два аргумента (текст, имя юзера)
		});
		
		
	});
	
	return io;
	
}

//connection.connect();

module.exports = createWebSocketServer;