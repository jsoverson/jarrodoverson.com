
var path = require('path');
var fs = require('fs');

var yaml = require('js-yaml');
var async = require('async');
var Handlebars = require('handlebars');

Handlebars.registerHelper('echo', function(a) {return a});

Handlebars.registerHelper('ifAll', function(/*args*/) {
  var args = Array.prototype.slice.call(arguments);
  var options = args.pop();
  var result = args.reduce(function(p,n){return n && p},true);
  return result ? options.fn(this) : options.inverse(this);
});

Handlebars.registerHelper('ifnAll', function(/*args*/) {
  var args = Array.prototype.slice.call(arguments);
  var options = args.pop();
  var result = args.reduce(function(p,n){return !!(n && p)},true);
  return result ? options.fn(this) : options.inverse(this);
});

Handlebars.registerHelper('ifEqual', function(v1, v2, options) {
  if(v1 === v2) return options.fn(this);
  return options.inverse(this);
});

var entryDir = path.join(__dirname, 'entries');
var templateDir = path.join(__dirname, 'templates');

var entryNames = [
  'driven-by-tests',
  'medium',
  'metaballs',
  'ani-blocks',
  'oldblog'
  //'somethingelse',
  //'road',
  //'shopping',
  //'nopictures'
];

var templateNames = [
  'index',
  'box-small',
  'box-large'
];

var entryFns = entryNames.map(function(entry){return function(cb){
  fs.readFile(path.join(entryDir, entry + '.yaml'), 'utf8', cb);
}});
var templateFns = templateNames.map(function(template){return function(cb){
  fs.readFile(path.join(templateDir, template + '.html'), 'utf8', cb);
}});

async.parallel(entryFns.concat(templateFns), function(err, sources) {
  if (err) throw new Error(err);

  var entrySources = sources.slice(0,entryNames.length);
  var templateSources = sources.slice(entryNames.length);

  var entries = entrySources.map(function(entry,i){var data = yaml.safeLoad(entry); data.name = entryNames[i]; return data});

  var indexSrc = templateSources.shift();
  for (var i = 0; i < templateSources.length; i++) {
    console.log(templateNames[i]);
    Handlebars.registerPartial(templateNames[i+1], Handlebars.compile(templateSources[i]));
  }

  var mainTmpl = Handlebars.compile(indexSrc);

  var bytes = 0;

  var toWrite = [
    {
      name: "index.html",
      contents: mainTmpl({entries:entries})
    }
  ].map(function(output){
    return function(cb) {
      bytes += output.contents.length;
      fs.writeFile(output.name, output.contents, cb);
    };});

  async.parallel(toWrite, function(err, results) {
    if (err) throw new Error(err);
    console.log('wrote %s bytes', bytes);
  });

});
