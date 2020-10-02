const cwd = process.cwd();
const path = require('path');
const readdir = require('fs').readdir;
const defaultPath = `${cwd}/routes`;

module.exports = ( app, io, routesPath = defaultPath ) => {
  let routes = {};

  const getRouteFiles = () => new Promise((resolve, reject) =>
    readdir(routesPath, (err, files) => {
      if(err) {
        reject(err);
      } else {
        resolve(files.filter(file => file.endsWith('.js')));
      }
    }));

  const loadRoutes = () => getRouteFiles().then(files =>
    files.reduce((newRoutes, file) => {
      newRoutes[file] = loadRoute(file);
      return newRoutes;
    },routes));

  const loadRoute = file => {
    let route = require(path.join(routesPath, file));
    if(route.config) {
      if(route.config.routes instanceof Array) {
        route.config.routes.forEach(routeConfig => {
          app[routeConfig.method.toLowerCase()](routeConfig.path, routeConfig.callback);
        });
      } else if(route.config.routes instanceof Object) {
        Object.keys(route.config.routes).forEach(method => {
          let methodPaths = route.config.routes[method];
          Object.keys(methodPaths).forEach(path => {
            app[method.toLowerCase()](path, methodPaths[path]);
          });
        })
      }
      if(route.config.socketEvents instanceof Array) {
        io.on('connection', socket => {
          let connectionHandler = route.config.socketEvents.find(socketConfig => socketConfig.on === "connection");
          connectionHandler && connectionHandler.callback(io, socket);
          route.config.socketEvents.forEach(socketConfig =>
            socket.on(socketConfig.on, (msg) => socketConfig.callback(io, socket, msg)))
        });
      } else if(route.config.socketEvents instanceof Object) {
        io.on('connection', socket => {
          let connectionHandler = route.config.socketEvents["connection"];
          connectionHandler && connectionHandler(io, socket);
          Object.keys(route.config.socketEvents).forEach(key =>
            socket.on(key, (msg) => route.config.socketEvents[key](io, socket, msg)));
        });
      }
    }
    return route;
  };
  
  return {
    loadRoutes
  }
};
