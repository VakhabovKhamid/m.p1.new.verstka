var gulp = require('gulp-param')(require('gulp'), process.argv);
var sass = require('gulp-sass');
var jade = require('gulp-jade');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var jsmin = require('gulp-jsmin');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();


gulp.task('sass', function(){
  return gulp.src('app/sass/*.scss')
  .pipe(sass())
  .on('error', function(error){
    console.log(error.message);
    this.emit('end');
  })
  .pipe(autoprefixer())
  .pipe(gulp.dest('dist/css'))
  .pipe(browserSync.stream());
});

gulp.task('templates', function() {
  return gulp.src('app/jade/*.jade')
  .pipe(jade({
    pretty: true,
  }))
  .on('error', function(error){
    console.log(error.message);
    this.emit('end');
  })
  .pipe(gulp.dest('dist/'))
  .pipe(browserSync.stream());
});

gulp.task('js', function() {
  return gulp.src('app/js/*.js')
  .on('error', function(error){
    console.log(error.message);
    this.emit('end');
  })
  .pipe(gulp.dest('dist/js'))
  .pipe(browserSync.stream());
});

gulp.task('watch', function(error){
  browserSync.init({
      server: "./dist"
  });
  gulp.watch('app/sass/*.scss', ['sass']);
  gulp.watch('app/jade/*.jade', ['templates']); 
  gulp.watch('app/js/*.js', ['js']); 
});

gulp.task('hello', function(){
  console.log('Hello World');
});

gulp.task('jsmin', function (name) {
  if(name === undefined){
    gulp.src('dist/js/*.js')
    .pipe(jsmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('min/jsmin/'));
  }else{
    gulp.src('dist/js/'+name+'.js')
    .pipe(jsmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('min/jsmin/'));
  }
});

gulp.task('cssmin', function (name) {
  if(name === undefined){
    gulp.src('dist/css/*.css')
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('min/cssmin/'));
  }else{
    gulp.src('dist/css/'+name+'.css')
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('min/cssmin/'));
  }
});