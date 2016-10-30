var gulp = require('gulp'),
    sass = require('gulp-sass'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    modernizr = require('gulp-modernizr'),
    jshint = require('gulp-jshint'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    twig = require('gulp-twig'),
    sync = require('browser-sync').create();

var processors = [
  autoprefixer
];

gulp.task('scss', function() {
  return gulp.src('./app/scss/main.scss')
        .pipe(sass())
        .pipe(postcss(processors))
        .pipe(gulp.dest('./dist/css'))
        .pipe(sync.stream());
});

gulp.task('js', function() {
  gulp.src('./app/js/**/*.js')
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./dist/js'))
});

gulp.task('twig', function () {
  gulp.src('./app/twig/*.twig')
      .pipe(twig({
        data: {
          title: 'Yummy & Guiltfree',
        }
      }))
      .pipe(gulp.dest('./dist'));
});

gulp.task('img', function() {
  gulp.src('./app/img/**/*')
      .pipe(gulp.dest('./dist/img'))
});

gulp.task('fonts', function() {
  gulp.src('./app/fonts/**/*')
      .pipe(gulp.dest('./dist/fonts'))
});



gulp.task('sync', ['scss', 'js', 'twig', 'img', 'fonts'], function() {
  sync.init({
      server: './dist'
  })

  gulp.watch("./app/scss/**/*.scss", ['scss']);
  gulp.watch("./app/js/**/*.js", ['js']);
  gulp.watch("./app/twig/**/*.twig", ['twig']);
  gulp.watch("./app/img/**/*", ['img']);
  gulp.watch("./app/fonts/**/*", ['fonts']);
});

gulp.task('default', ['sync', 'twig', 'img', 'js', 'fonts'], function() {
    gulp.src('./node_modules/jquery/dist/jquery.min.js')
        .pipe(gulp.dest('./dist/js'))
});
