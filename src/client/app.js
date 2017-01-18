import io from 'socket.io-client';
import Worker from "worker-loader!./webWorker";

let fileUploader = document.querySelector('#fileUploder');

fileUploder.addEventListener('change', (file) => {
    let fr = new FileReader();

    fr.onload = function(e) {
        let arr = e.target.result.split('\n');
        arr = arr.map(value => +value);

        var worker = new Worker;
        console.log('start processing', new Date());

        worker.postMessage({
                                size: 10000,
                                array: arr
                            });

        worker.onmessage = function(event) {
            console.log('end processing', new Date());
            console.log(event.data);
        }
    };
    fr.readAsText(event.target.files[0]);
})

let connectionOptions =  {
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
socket.on('event', data => {
    // console.log(slidingWindow.nextFrame());
});
socket.on('disconnect', function(){});
