#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var browserify = require('browserify');
var jsxify = require('jsx-transform').browserifyTransform;

var input = path.join(__dirname, '..', 'src', 'index.js');
var output = path.join(__dirname, '..', 'static', 'build', 'bundle.js');

browserify(input)
//  .transform(jsxify, {
//    factory: 'h'
//  })
  .transform('babelify', {
    presets: [
      'es2015'
    ],
    plugins: [
      ['transform-react-jsx', {pragma: 'h'}],
      'h-children-fix'
    ]
  })
  .bundle()
  .pipe(fs.createWriteStream(output));
