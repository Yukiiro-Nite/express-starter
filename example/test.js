const expressStarter = require('../index');

expressStarter.start(3002, (express, app, io) => {
  app.use(express.static('test'));
});
