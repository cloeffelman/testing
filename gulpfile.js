/* ---------------------------- requires ---------------------------- */

//Initialize gulp requirement. Looks for package named gulp in node_modules
var gulp = require('gulp');

//Sass - css precompiler
var sass = require('gulp-sass');

//BrowserSync - live reload
var browserSync = require('browser-sync').create();

//useref - optimizing css & js
var useref = require('gulp-useref');

//gulpIf - for gulp if statements
var gulpIf = require('gulp-if');

//uglify - Minifying js files
var uglify = require('gulp-uglify');

//cssnano - Minifying css files
var cssnano = require('gulp-cssnano');

//del - deleting generated files in folders
var del = require('del');

//runSequence - runs Gulp tasks in a sequential order
var runSequence = require('run-sequence');

/* ---------------------------- end requires ---------------------------- */

/* ---------------------------- tasks ----------------------------------- */

//Gulp task - compile scss into css
gulp.task('sass', function() {
  return gulp.src('app/scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

//Gulp task - browserSync - reloads browser on save (html / scss / js)
gulp.task('browserSync', function(){
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
});

//Gulp task - watchers
gulp.task('watch', ['browserSync', 'sass'], function() {
  //Sass folder watcher
  gulp.watch('app/scss/*.scss', ['sass']);
  //Watches html files, auto reloads page
  gulp.watch('app/*.html', browserSync.reload);
  //Watches js files, auto reloads page
  gulp.watch('app/js/*.js', browserSync.reload);
});

//Gulp task - useref - optimizes and minifies js & css files. Places them in dist folder.
gulp.task('useref', function(){
  return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulp.dest('dist'))
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});

//Gulp task - move fonts to dist
gulp.task('fonts', function() {
  return gulp.src('app/fonts/*')
  .pipe(gulp.dest('dist/fonts'))
});

//Gulp task - clean the dist folder
gulp.task('clean:dist', function() {
  return del.sync('dist');
});

//Gulp task - build - cleans dist folder, then runs other Gulp tasks
gulp.task('build', function (callback) {
  runSequence('clean:dist',
    ['sass', 'useref', 'fonts'],
    callback
  )
});

//Gulp task - default - begin development
gulp.task('default', function (callback) {
  runSequence(['sass','browserSync', 'watch'],
    callback
  )
})

/* ---------------------------- end tasks ---------------------------- */
