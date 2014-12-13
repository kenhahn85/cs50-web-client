require('coffee-script/register');

// Load some modules which are installed through NPM.
var browserify = require('browserify');  // Bundles JS.
var browserSync = require('browser-sync');
var buffer = require('gulp-buffer');
var del = require('del');  // Deletes files.
var eventStream = require('event-stream');
var fs = require('fs');
var gulp = require('gulp');
var less = require('gulp-less-sourcemap');  // To compile Stylus CSS.
var path = require('path');
var react = require('gulp-react');
var reload = browserSync.reload;
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var through = require('through');
var transform = require('vinyl-transform');
var ts = require('gulp-typescript');
var uglify = require('gulp-uglify');


// Define some paths.
var paths = {
  less: ['./src/less/**/*.less'],
  app_js: ['./build/intJs/app.js'],
  react: ['src/React/**/*'],
  ts: ['src/ts/**/*'],
  // specifically omit React folder in this list, because it will trigger task loop that will terminate with error
  js: ['src/js/app.js']
};

var JS_BASE = "src/js/";

// An example of a dependency task, it will be run before the css/js tasks.
// Dependency tasks should call the callback to tell the parent task that they're done.
gulp.task('cleanCss', function(done) {
  del(['./static/css'], done);
});

gulp.task('cleanReact', function(done) {
  del(['./src/js/React'], done);
});

gulp.task('less', ['cleanCss'], function () {
  gulp.src(paths.less)
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./static/css'))
    .pipe(reload({stream: true}));
});

// Our JS task. It will Browserify our code and compile React JSX files.
gulp.task('browserify', ['replaceMacros'], function() {
  return browserify(paths.app_js, {debug: true})
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    // only need to uglify prod?
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./static/'));
});

// straight up copied this code template from https://github.com/hughsk/envify/blob/master/custom.js
gulp.task('replaceMacros', ['react'], function() {

  var replaceMacros = transform(function(filename) {
    var buffer = []
    return through(write, flush)

    function getFilePosition(filename, i) {
      return "(" + JS_BASE + filename.split("/").pop() + ":" + (i + 1) + ")";
    }

    function write(data) {
      buffer.push(data)
    }

    // TODO: in prod, replace node assert with some kind of AJAX function, #ASSERT_AJAX?
    // ASSERT [some expression] prints "[some expression]" as the reason, on failure
    // ASSERT+ [some expression], [some result] prints "[some result]" as the reason, on failure
    function flush() {
      var source = buffer.join('')
      var input = fs.readFileSync(filename);
      // can be replaced with whitespace in prod
      var output = input.toString().split("\n");
      for(var i = 0, len = output.length; i < len; ++i) {
        output[i] = output[i].replace(/\/\/#ASSERT\s([^\r\n]+)/g, "ASSERT($1, '" + getFilePosition(filename, i) + " $1');");
        output[i] = output[i].replace(/\/\/#ASSERT\+\s(.+),\s([^\r\n]+)/g, "ASSERT($1, '" + getFilePosition(filename, i) + " ' + (typeof($2) === 'object' ? (function() { try { return JSON.stringify($2, null, 2) } catch(e) { return $2.toString(); } })() : $2));")
        output[i] = output[i].replace("//#REQUIRE-ASSERT", "var ASSERT = require('assert'); // dev mode only");
      }
      this.queue(output.join("\n"));
      this.queue(null);
    }
  });

  return gulp.src('./src/js/**/*.js')
    .pipe(replaceMacros)
    .pipe(gulp.dest('./build/intJs'));
});

gulp.task('react', ['cleanReact'], function(done) {
  var REACT_SRC = 'src/React';
  var REACT_PATH = './' + REACT_SRC + '/**/*';
  var REACT_DEST = 'src/js/React';

  return gulp.src(REACT_PATH)
    .pipe(react())
    .pipe(gulp.dest('./' + REACT_DEST));
});

gulp.task('browser-sync', ['browserify'], function() {
  browserSync({
    server: {
      baseDir: "./static"
    }
  });
});

gulp.task('browser-sync-reload', ['browserify'], function() {
  reload();
});

gulp.task('typescripts', function(done) {
  return done();
  var tsResult = gulp.src('src/ts/**/*.ts')
    .pipe(sourcemaps.init({}))
    .pipe(ts({
      declarationFiles: true,
      noExternalResolve: true
    }))

  return eventStream.merge(
    tsResult.dts.pipe(gulp.dest('src/definitions')),
    tsResult.js.pipe(gulp.dest('src/js'))
      .pipe(sourcemaps.write())
  );
});

// setting up browserify as a dep here instead of as part of the default task is very important.
// prevents overlapping cleanReact jobs with react jobs.
gulp.task('watch', ['browser-sync'], function() {
  gulp.watch(paths.less, ['less']);
  gulp.watch(paths.js, ['browser-sync-reload']);
  gulp.watch(paths.react, ['browser-sync-reload']);
});

// The default task (called when we run `gulp` from cli)
gulp.task('default', ['less', 'watch']);

// for prod: no source maps, no macro replacement