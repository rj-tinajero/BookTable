const path = require('path');
const nodeExtenals = require('webpack-node-externals');

module.exports = {
   entry: [
      'babel-polyfill', './src/server.js'
   ],
   output: {
      path: path.join(__dirname, './dist'),
      filename: 'server.js'
   },
   target: 'node',
   externals: [ nodeExtenals() ],
   module: {
      rules: [
         { test: /\.jsx$/, loader: 'babel-loader',
           exclude: /node_modules/ }
      ]
   }
};