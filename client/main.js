var socket = io.connect('http://localhost:5000',{'forceNew':true});

socket.on('messages', function(data){
	console.log(data);
	render(data);
});

function render(data){
	var html = data.map(function(message,index){
		return (`
				<div class="message">
					<strong>${message.nickname}</strong> dice:
					<p>${message.text}</p>
				</div>
			`);
	}).join(' ');
	var divMessages = document.getElementById('messages');
	divMessages.innerHTML = html;
	divMessages.scrollTop = divMessages.scrollHeight;
}

function addMessage(){
	if (document.getElementById('text').value!=="") {
		var message = {
			nickname: document.getElementById('nickname').value,
			text: document.getElementById('text').value
		};
		document.getElementById('text').value="";
		socket.emit('add-message',message);
		return false;
	}
}

function setNickname(){
	var nickname = prompt("Ingresa tu Nickname", "Anonimo");
	document.getElementById('nickname').value = nickname;
}
