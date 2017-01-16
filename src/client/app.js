document.write('welcome to my app');
console.log('app loaded');
import io from 'socket.io-client';

var connectionOptions =  {
            "force new connection" : true,
            "reconnectionAttempts": "Infinity", //avoid having user reconnect manually in order to prevent dead clients after a server restart
            "timeout" : 10000,                  //before connect_error and connect_timeout are emitted.
            "transports" : ["websocket"]
        };

var socket = io('http://localhost:3003', connectionOptions);

socket.on('connect', () => {
    socket.emit('random');
    console.info('socket was connected');
});
socket.on('event', data => console.log(data) );
socket.on('disconnect', function(){});
