const server = require('http').createServer();
const io = require('socket.io')(server);
const emmitter = require('./emmitter.js')

io.on('connection', client => {
  console.info('User was connected');

  client.on('static', data => {
      let interval = setInterval( () => {
          let nextElement = emmitter.next();
          nextElement ? io.emit('event', nextElement) : clearInterval(interval);
      }, 1000);
  });

  client.on('random', data => {
      let interval = setInterval( () => io.emit('event', emmitter.nextRandom())
        , 1000);
  });

  client.on('disconnect', () => {});
});
server.listen(3003);
