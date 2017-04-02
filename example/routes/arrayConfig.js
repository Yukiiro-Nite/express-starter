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
      on: 'hello',
      callback(io, socket, msg) {
        socket.emit('hello', 'hello from an array config!');
      }
    }
  ]
};
