var gulp = require('gulp');
    sass = require('gulp-sass');
    pug = require('gulp-pug');

    livereload  = require('gulp-livereload'),

gulp.task('styles', function() {
    gulp.src('assets/stylesheets/**/*.scss')
        .pipe(sass({
          includePaths:['assets/stylesheets'],
          errLogToConsole: true
        })
        .pipe(gulp.dest('./css/'))
});

//Watch task
gulp.task('default',function() {
    gulp.watch('sass/**/*.scss',['styles']);
});


gulp.task('views', function buildHTML() {
  return gulp.src('views/*.pug')
  .pipe(pug({
    // Your options in here.
  }))
});
