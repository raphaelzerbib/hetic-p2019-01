var gulp = require('gulp'),
    sass = require('gulp-sass'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    sync = require('browser-sync').create();

var processors = [
  autoprefixer
];

gulp.task('scss', function() {
  return gulp.src('app/scss/style.scss')
        .pipe(sass())
        .pipe(postcss(processors))
        .pipe(gulp.dest('dist/css'))
        .pipe(sync.stream());
});

gulp.task('sync', ['scss'], function() {
  sync.init({
      server: './app'
  })

  gulp.watch("app/scss/**/*.scss", ['scss']);
});

gulp.task('default', ['sync'], function() {

});
