var gulp = require('gulp'),
    sass = require('gulp-sass'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    modernizr = require('gulp-modernizr'),
    twig = require('gulp-twig'),
    sync = require('browser-sync').create();

var processors = [
  autoprefixer
];

gulp.task('scss', function() {
  return gulp.src('./app/scss/main.scss')
        .pipe(sass())
        .pipe(postcss(processors))
<<<<<<< HEAD
        .pipe(gulp.dest('app/css'))
=======
        .pipe(gulp.dest('./app/css'))
>>>>>>> 1b25b240b28a601273ad071e04615f731c016742
        .pipe(sync.stream());
});

gulp.task('sync', ['scss'], function() {
  sync.init({
      server: './app'
  })

  gulp.watch("./app/scss/**/*.scss", ['scss']);
  gulp.watch("./app/twig/**/*.twig", ['twig']);
});

gulp.task('modernizr', function() {
  gulp.src('./app/js/*.js')
      .pipe(modernizr())
      .pipe(gulp.dest("build/"))
});

gulp.task('twig', function () {
  gulp.src('./app/twig/*.twig')
      .pipe(twig({
        data: {
          title: 'Yummy & Guiltfree',
        }
      }))
      .pipe(gulp.dest('./app'));
});

gulp.task('default', ['sync', 'twig'], function() {

});
