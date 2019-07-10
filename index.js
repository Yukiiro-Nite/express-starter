const express = require('express');
const app = express();
const server = require('http').Server(app);
const socketIO = require('socket.io');
const routeLoader = require('./routeLoader');

const noop = () => {};

function start (port, preload = noop, postload = noop, server) {
  const io = socketIO(server)
  preload(express, app, io);
  routeLoader(app, io)
    .loadRoutes()
    .then(routes => {
      server.listen(port, () => {
        console.log(`express-starter running on port: ${port}!`);
        console.log('loaded the following route files:');
        Object.keys(routes).forEach(routeName => console.log(`\t${routeName}`));
        postload(express, app, io);
      });
    });
}

exports.start = (port, preload = noop, postload = noop) => {
  start(port, preload, postload, server)
};

exports.startWithCustomHttp = (port, preload = noop, postload = noop, httpCallback = noop) => {
  start(port, preload, postload, httpCallback(app))
}