markoa-tester
=============

Install
-------

Install `markoa-tester` in a project where you want to mount the app:

```bash
$ npm install markoa-tester --save
```

### Development

`gulp watch` to watch for changes and auto-compile

When updating jade layout run `gulp jade:marko`

### Run server

For now simply run:

`node test`

Which will run `mount-self.js` (which should work).

### Auto Reload via Browser Sync

There is now a new sync task `build/tasks/sync.js` we are working on. We have also added [koa-browser-sync](https://www.npmjs.com/package/koa-browser-sync) in the Markoa server.

We just need to figure out how to configure correctly. Please help out ;)

Apparently we need to use the Browser Sync UI and get the snippet from `BROWSERSYNC_SNIPPET` environment variable and paste it into the HTML of the app (usefull to start `browser-sync` from a build tool like `gulp` etc)

From http://www.browsersync.io/docs/options/

Log the snippet to the console when you're in snippet mode (no proxy/server): `logSnippet: true`

Override host detection if you know the correct IP to use:

`host: "192.168.1.1"`

Use a specific port (instead of the one auto-detected by Browsersync)

`port: 4005`

BrowserSync starts a small web server. If you’re already using a local web server or need to connect to a live website, you can start BrowserSync as a proxy server. It injects small script into every page which communicates with the server via WebSockets. When an event occurs — such as a file modification or scroll action — the server sends an update notification to all connected devices.

You can enter the “External” address in the location bar of any browser on your network, i.e. http://192.168.1.21:3000. This will load your default page (index.html) and automatically refresh it when the HTML or CSS changes.

Or we could try to set our Markoa port to `3000`

```bash
[08:06:50] Starting 'sync'...
[08:06:50] Finished 'sync' after 26 ms
[BS] [info] Proxying: http://localhost:4005
[BS] Access URLs:
 ------------------------------------
       Local: http://localhost:3000
    External: http://192.168.1.8:3000
 ------------------------------------
          UI: http://localhost:3001
 UI External: http://192.168.1.8:3001
```

Perhaps use: [bs-snippet-injector](https://github.com/shakyShane/bs-snippet-injector) ??

Read [this](http://www.shakyshane.com/javascript/nodejs/2014/08/05/browser-sync-snippet/)

Or perhaps we can use this [recipe](https://www.npmjs.com/package/browser-sync-connect)?

```js
if (window.location.port !== '80' && window.location.port !== '') {
        browserSyncConnect();
}
```

http://www.wearejh.com/development/https-support-added-browsersync/

It works in Proxy mode apparently. The problem is that it renders using the `.js` file, not the `.marko` file.

Been looking into using [gulp-marko](https://github.com/viviangledhill/gulp-marko) but it only compiles marko to HTML static files for caching (testing). Could be useful for sure to include as part of dev task!

To precompile templates:

`npm install marko --global`

`markoc apps --clean`

We could build a Gulp transform to do this:

```js
require('marko/compiler').compileFile(path, function(err, src) {
    // Do something with the compiled output
});
```

Or we could simply use the built in hot reload:

[marko-hot-reload](https://github.com/marko-js-samples/marko-hot-reload)

And the combine with `browser-refresh`

```sh
npm install browser-refresh --global
browser-refresh server.js
```

Then you would use browser-refresh to launch your Node.js app. For example:

```sh
npm install browser-refresh --global browser-refresh server.js
```

In addition, you'll need to include the `<browser-refresh>` tag in your main page template as shown below:

```html
<!doctype html><html> <head> ... </head> <body> ...

  <browser-refresh enabled="true" />
</body>
</html>
```

In addition, you will need to let the browser-refresh process launcher know when your server is ready so that it can trigger a refresh of all web pages at the correct time. This can be done using code similar to the following:

```js
app.listen(port, function() {
  console.log('Listening on port %d', port);
  if (process.send) {
    process.send('online');
  }
});
```

For more details, please see the docs for the `browser-refresh` module.

### Semantic UI

Build semantic dist:

`cd semantic && gulp build`

In `layout.jade`

```jade
link(rel="stylesheet" type="text/css" href="semantic.min.css")
script(src="semantic/dist/semantic.min.js")
```

### TODO

-	Add more debugging to Markoa
-	Allow significant `debug: true` flag on Markoa setup, or even different debug levels!!!
-	Make it much simpler to mount basic app, by using defaults for appContainer and koaServer if not defined!

### Mounting app on Markoa server

*Work in Progress (WIP)*

Ideally you should be able to mount the app like this:

```js
let myApp = require('markoa-tester');
let apps = ['index'];
myApp.mountIn(myAppContainer, apps);
```

You can also use the `mounter.js` directly:

```js
let apps = ['index', 'projects'];
let mount = require('./mounter')(appContainer)
mount(apps);
```

### App file structure

```sh
/apps
  /_global
    /components
    /state
      index.js
    /layouts
      _default_page.jade
  /index
    /components
      /project-feed
        template.marko
    /layouts
      _page.jade
    /state
      index.js
    /page
      index.jade
      index.marko
      index.browser.json
    marko-taglib.json
  /repositories
  /teams
  ...
  marko-taglib.json  
```

### Generating apps

`slush markoa:app`

This geneator will create an app under apps/[app-name] similar to the default `index` app generated by the default marko generator. Use this generator each time you want to add an app!

```
/[app]
  /components
    /project-feed
      template.marko
  /layouts
    _page.jade
  /state
    index.js
  /page
    index.jade
    index.marko
    index.browser.json
  marko-taglib.json
```

### Generating tags

`slush markoa:tag`

This geneator will create an app under apps/[app-name] similar to the default `index` app generated by the default marko generator. Use this generator each time you want to add an app!

If no app name is given, the tag becomes global

```
/apps
  /_global
    /components
      /[tag]
        template.marko
```

If an app name is given, the tag is registered for that app

```
/apps
  /[app]
    /components
      /[tag]
        template.marko
```

#### Single tag example

-	What is the name of your tag or tags (, separated) ? `top-menu`
-	For which app (empty: global) ?

Creates the global tag `top-menu` under `apps/_global`

#### Multiple tags

-	What is the name of your tag or tags (, separated) ? `top-menu, side-bar, session-bar`
-	For which app (empty: global) ? `index`

Creates the tags: `top-menu`, `side-bar` and `session-bar` for the app `apps/index`

Contributing
------------

See the [CONTRIBUTING Guidelines](https://github.com/kristianmandrup/markoa-tester/blob/master/CONTRIBUTING.md)

Support
-------

If you have any problem or suggestion please open an issue [here](https://github.com/kristianmandrup/markoa-tester/issues).

License
-------

Copyright (c) 2015, Kristian Mandrup
