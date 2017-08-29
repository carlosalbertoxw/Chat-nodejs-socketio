var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(5000,function(){
	console.log('Good');
});

var messages = [{
	id: 1,
	text: 'Bienvenido',
	nickname: 'Bot'
}];

io.on('connection',function(socket){
	console.log("El cliente con ip: "+socket.handshake.address+" se ha conectado")
	socket.emit('messages',messages);

	socket.on('add-message', function(data){
		messages.push(data);
		io.sockets.emit('messages',messages);
	})
});

app.use(express.static('client'));
