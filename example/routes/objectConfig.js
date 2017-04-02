exports.config = {
  routes: {
    get: {
      '/object': (req, res) => {
        res.send("This was set up with an object config!");
      }
    }
  },
  socketEvents: {
    hello(io, socket, msg) {
      socket.emit('hello','hello from an object config!');
    }
  }
};
