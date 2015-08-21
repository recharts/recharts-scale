require('babel/register');

var gulp = require('gulp');
var gutil = require('gulp-util');
var del = require('del');
var webpack = require('webpack');
var mocha = require('gulp-mocha');
var webpackDevConfig = require('./webpack.dev.js');
var webpackProConfig = require('./webpack.production.js');

gulp.task('setWatch', function() {
  global.isWatching = true;
});

gulp.task('cleanWatch', function(cb) {
  del(['watch'], {force: true}, cb);
});

gulp.task('cleanBuild', function(cb) {
  del(['dist', '.tmp'], cb);
});

gulp.task('webpack', function(callback) {
  var config = global.isWatching ? webpackDevConfig : webpackProConfig;

  webpack(config, function(err, stats) {
    if (err) { new gutil.PluginError('webpack:build', err); }

    gutil.log('[webpack:build]', stats.toString({colors: true}));

    callback();
  });
});

// 测试
gulp.task('test', function() {
  return gulp.src(['test/*.js'], { read: false })
             .pipe(mocha({ reporter: 'list' }))
             .on('error', gutil.log);
});

gulp.task('watch', ['cleanWatch', 'setWatch'], function() {
  gulp.start(['webpack', 'test']);
});
