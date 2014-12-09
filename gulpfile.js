// Load some modules which are installed through NPM.
var gulp = require('gulp');
var browserify = require('browserify');  // Bundles JS.
var del = require('del');  // Deletes files.
var reactify = require('reactify');  // Transforms React JSX to JS.
var source = require('vinyl-source-stream');
var less = require('gulp-less-sourcemap');  // To compile Stylus CSS.
var react = require('gulp-react');
var path = require('path');

// Define some paths.
var paths = {
  less: ['./src/less/**/*.less'],
  app_js: ['./src/js/app.js'],
  jsx: ['src/jsx/**/*'],
  // specifically omit React folder in this list, because it will trigger task loop that will terminate with error
  js: ['src/js/app.js']
};

// An example of a dependency task, it will be run before the css/js tasks.
// Dependency tasks should call the callback to tell the parent task that they're done.
gulp.task('cleanCss', function(done) {
  del(['./static/css/**/*'], done);
});

gulp.task('cleanReact', function(done) {
  del(['./src/js/React'], done);
});

gulp.task('less', ['cleanCss'], function () {
  gulp.src(paths.less)
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./static/css'));
});

// Our JS task. It will Browserify our code and compile React JSX files.
gulp.task('browserify', ['react'], function() {
  // Browserify/bundle the JS.
  browserify(paths.app_js)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./static/'));
});

gulp.task('react', ['cleanReact'], function(done) {
  var stream = gulp.src('./src/jsx/**/*.jsx')
    .pipe(react())
    .pipe(gulp.dest('./src/js/React'));

  stream.on('end', done);
});

// Rerun tasks whenever a file changes.
gulp.task('watch', function() {
  gulp.watch(paths.less, ['less']);
  gulp.watch(paths.jsx, ['react']);
  gulp.watch(paths.js, ['browserify']);
});

// The default task (called when we run `gulp` from cli)
gulp.task('default', ['watch', 'less', 'browserify']);