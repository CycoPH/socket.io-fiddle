const socketUrl = 'http://localhost:2222/';
var socket;
var infoSocket;

function connectHandler() {

	socket = io(socketUrl);
	socket.on('connect', () => {
		console.log("connected to server with", socket.id);
		console.log("sending out join request");
		socket.emit('join');
	});
	socket.on('disconnect', () => {
		console.log("disconnected from server", socket.id);
	});
	socket.on('join', () => {
		console.log("received join");
		infoSocket = io(socketUrl + 'info');
		infoSocket.on('connect', () => {
			console.log("connected to server/info with", infoSocket.id);
		});
		infoSocket.on('disconnect', () => {
			console.log("disconnected from server/info", infoSocket.id);
			infoSocket.disconnect();
		});
	});
}
