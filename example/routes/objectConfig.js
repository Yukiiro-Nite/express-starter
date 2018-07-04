const Path = require('path');

exports.config = {
  routes: {
    get: {
      '/socket.io.js': (req, res) => {
        // set up route to serve socket.io client
        // you will need to change the path to match the route to your socket.io instance
        const path = Path.resolve(__dirname, '../../node_modules/socket.io-client/dist/socket.io.js');
        res.sendFile(path);
      },
      '/object': (req, res) => {
        // this is an example of a simple response to a route
        res.send("This was set up with an object config!");
      },
      '/promise-resolve': (req, res, next) => {
        // this is an example of handling resolved promises with a postload handler
        res.responsePromise = new Promise((resolve, reject) => {
          setTimeout(() => resolve('this is a promise resolved'), 1000);
        });
        next();
      },
      '/promise-reject': (req, res, next) => {
        // this is an example of handling rejected promises with a postload handler
        res.responsePromise = new Promise((resolve, reject) => {
          setTimeout(() => reject('this is a promise rejection'), 1000);
        });
        next();
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
