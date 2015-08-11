'use strict';
let markoa = require('markoa');
let path = require('path');
let rootPath = path.resolve(path.join(__dirname, '../'));

let mounter = new markoa.AppMounter(rootPath);

let apps = ['index'];

// mounting multiple apps on appContainer instance
mounter.mountApps(apps).start();
