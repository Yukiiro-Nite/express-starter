# express-starter

express starter is a project that can make configuring routes easier.
Instead of managing app manually, one can create several config files inside of the routes path,
and all configs are loaded at run time.

## How to install
For now, install directly from gitlab
```
npm install --save https://github.com/Yukiiro-Nite/express-starter.git
```

## Usage
You can provide two different formats of config, one is array based and the other is object based.
There are examples of both types of config in /example/routes

The route configs that you create need to be in a file called routes on the same path as your server,
similar to the structure in /example.

When you require or import express starter into your program, you will need to use the start function to load the configs and start the server.

The start function takes a port, a preload function, and a postload function. You can find an example of this in /example/server.js

The port number is the port that the server is started on.

The preload function is run before the configs in the routes folder are loaded. You are given express, the app, and the io object to register
anything you need to before the rest of the routes are loaded. This area is good for things like express static,
middleware that need to be first, and other ways of handling sockets.

The postload function is run after the configs in the routes folder are loaded. This function also gets express, app, and io.
This callback is useful for registering middleware that handle errors and requests that have not been replied to yet. you could
also use this area to help with sockets.
