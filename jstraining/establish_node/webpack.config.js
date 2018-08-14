var path = require('path');
var node_modules = path.resolve(__dirname, 'node_modules');
var deps = [ 
  ];
  
var config = {
  entry: path.resolve(__dirname, './react/app.js'),
  resolve: {
    alias: {
    }
  },
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'bundle.js',
  },
  mode: 'development',
  module: {
    rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['babel-preset-env']
            }
          }
        }
      ]
  }
};

deps.forEach(function (dep) {
    var depPath = path.resolve(node_modules, dep);
    config.resolve.alias[dep.split(path.sep)[0]] = depPath;
    config.module.noParse.push(depPath);
  });

module.exports = config;