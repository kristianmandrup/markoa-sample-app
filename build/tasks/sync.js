var paths       = require('../paths');
var gulp        = require('gulp');
var browserSync = require('browser-sync').create();

// Proxy Koa Server + watching .marko and .js  files
// http://www.browsersync.io/docs/gulp/
// http://www.browsersync.io/docs/api/
gulp.task('sync', ['stylus'], function() {
    // http://www.browsersync.io/docs/options/
    browserSync.init({
        // Not sure how to configure :(
        proxy: "localhost:4005"
        // port: 4005,
        // server: "./test"
    });

    gulp.watch([paths.marko, paths.source]).on('change', browserSync.reload);
});
