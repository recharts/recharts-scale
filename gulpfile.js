var gulp = require('gulp');
var mocha = require('gulp-mocha');


// 测试
gulp.task('mocha', function() {
  return gulp.src(['test/*.js'], { read: false })
             .pipe(mocha({ reporter: 'list' }))
             .on('error', gutil.log);
});
