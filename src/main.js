var server = require('http').createServer();
var io = require('socket.io')(server);
var express = require('express');
var app = express();

// app.use(express.static('src/'));
// app.use(express.static('build/'));
// app.get('/', function(req, res) {
//     res.sendfile('./src/client/index.html');
// });

io.on('connection', client => {
  client.on('connection', data => {
      console.info('User was connected', data);
      io.sockets.emit ('event', 'hello');
  });
  client.on('event', data => {});
  client.on('disconnect', () => {});
});
server.listen(3000);
