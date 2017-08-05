exports.config = {
  routes: [
    {
      method: 'get',
      path: '/array',
      callback(req, res) {
        res.send('This was set up with an array config!');
      }
    }
  ],
  socketEvents: [
    {
      on: 'connection',
      callback: () => console.log('got a connection from array config!')
    },
    {
      on: 'hello',
      callback(io, socket, msg) {
        socket.emit('hello', 'hello from an array config!');
      }
    },
    {
      on: 'disconnect',
      callback() {
        console.log('got a disconnection from array config!');
      }
    }
  ]
};
