exports.config = {
  routes: {
    get: {
      '/object': (req, res) => {
        res.send("This was set up with an object config!");
      }
    }
  },
  socketEvents: {
    connection() {
      console.log('got a connection from object config!');
    },
    hello(io, socket, msg) {
      socket.emit('hello','hello from an object config!');
    },
    disconnect() {
      console.log('got a disconnection from object config!');
    }
  }
};
