'use strict';
let markoa = require('markoa');
let path = require('path');

let lassoFile = path.join(__dirname, './lasso-config.json');
let serverOpts = {port: 4005, lassoFile: lassoFile};
let Server = markoa.Server;

let koaApp = new Server(serverOpts).init(function(mws) {
  mws.minimal();
});

let AppContainer = markoa.AppContainer;
let myAppContainer = new AppContainer(); //.start();

let rootPath = path.resolve(path.join(__dirname, '../'));
let Mounter = markoa.AppMounter;
let mounter = new Mounter(rootPath);

let apps = ['index'];
// mounting multiple apps on appContainer instance
mounter.mountApps(apps);
mounter.appContainer.createRoutes(koaApp).start();
