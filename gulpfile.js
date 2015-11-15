require("babel-core/register");

var gulp = require('gulp');
var webserver = require('gulp-webserver');
var browserify = require('browserify');
var reactify = require('reactify');
var rename = require('gulp-rename');
var source = require('vinyl-source-stream');
// var renderReact = require('./node_modules/gulp-render-react/lib/render-react.js');
var renderReact = require('./react-render.js');
var fs = require('fs');

var yargs = require('yargs');

var dirs = {
  src: './src',
  dest: './dev',
}

if (yargs.dist)
  dirs.dest = './dist';

var opt = {
  src: {
    js: {
      all: dirs.src + '/js/**/*.jsx',
      app: dirs.src + '/js/app.jsx',
    },
    html: {
     all: [dirs.src + '/pages/**/*.jsx', dirs.src + '/pages/**/*.html'],
     jsx: dirs.src + '/pages/**/*.jsx',
   }
  } ,
  dest: {
    root: dirs.dest,
    js: dirs.dest + '/js',
    html: dirs.dest,
  },  
}

var libs = [
  'react',
  'react-dom',
]

var head = fs.readFileSync('./src/pages/head.html')

var errorHandler = function(err){
  console.log(err.message);
  this.end();
}

gulp.task('html', function() {
  gulp.src(opt.src.html.jsx)
    .pipe(renderReact({
      type:'markup',
      props:{
      },
      head: head,
    }))
    .on('error', errorHandler)
    .pipe(gulp.dest(opt.dest.html))
})

gulp.task('html:watch', function() {
  gulp.watch(opt.src.html.all, ['html'])
})

gulp.task('webserver', function() {
  gulp.src(opt.dest.root)
    .pipe(webserver({
      livereload: true,
      directoryListing: true,
      open: false
    }));
});

gulp.task('js', function() {
  var bundler = browserify({
      entries: opt.src.js.app,
      transform: reactify,
    });
  libs.map(function(lib){
    bundler.external(lib);
  })

  return bundler.bundle()
    .on('error', errorHandler)
    .pipe(source('app.js'))
    .pipe(gulp.dest(opt.dest.js))
})

gulp.task('libs', function() {
  var bundler = browserify({
      // transform: reactify,
    });
  libs.map(function(lib){
    bundler.require(lib);
  })

  return bundler.bundle()
    .on('error', errorHandler)
    .pipe(source('libs.js'))
    .pipe(gulp.dest(opt.dest.js))
})

gulp.task('js:watch', function() {
  gulp.watch(opt.src.js.all, ['js'])
})



gulp.task('serve', ['libs', 'js', 'js:watch', 'html', 'html:watch', 'webserver'])

