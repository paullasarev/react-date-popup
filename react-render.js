var React = require('react');
var ReactDOMServer = require('react-dom/server');
var through = require('through2');
var gutil = require('gulp-util');
var util = require('util');

function render(filePath, props, head) {
  var component = React.createFactory(require(filePath));
  var element = component(props);
  var title = element.type.prototype.title;
  var init = element.type.prototype.init;

  return new Buffer(
    '<!DOCTYPE html><html><head>'
    + (title?'<title>'+title+'</title>':'')
    + (head||'')
    + '</head><body>'
    + ReactDOMServer.renderToString(element)
    + (init||'')
    + '</body></html>');
  // ReactDOMServer.renderToStaticMarkup(element));
}


module.exports = function(opts) {
  return through.obj(function(file, enc, done) {
    try {
      console.log('react-render', file.path)
      file.contents = render(file.path, opts.props || {}, opts.head);
      file.path = gutil.replaceExtension(file.path, '.html');
      this.push(file);
    } catch (err) {
      this.emit('error', new gutil.PluginError('react-render', err, {fileName: file.path }));
    }
    done();
  }); 
}