import path from 'path';
import { defaultPORT } from './src/constants';

const webpack = require('webpack');
// import nodeExternals from 'webpack-node-externals';

const stringifiedEnvVars = {
  'process.env.IS_CLIENT': true,
}


const client = {
  entry: {
    js: './src/client.js',
  },
  output: {
    path: path.join(__dirname, 'dist', 'js'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: path.join(__dirname, 'src'),
        use: {
          loader: 'babel-loader',
          // options: {
          //   "presets": [
          //     "@babel/env",
          //     "@babel/react"
          //   ],
          //   plugins: ['@babel/syntax-dynamic-import']
          // }
          // options: 'cacheDirectory=.babel_cache',
        },
      },
    ],
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      PORT: defaultPORT, // if PORT is not defined as env variable, use default
    }),
    new webpack.DefinePlugin(stringifiedEnvVars),
  ],
};

// const server = {
//   target: 'node',
//   node: {
//     __dirname: false,
//   },
//   externals: [nodeExternals({
//     modulesFromFile: true,
//   })],
//   entry: {
//     js: './src/server.js',
//   },
//   output: {
//     path: path.join(__dirname, 'src'),
//     filename: 'server-es5.js',
//     libraryTarget: 'commonjs2',
//   },
//   module: {
//     rules: [
//       {
//         test: path.join(__dirname, 'src'),
//         use: {
//           loader: 'babel-loader',
//           options: 'cacheDirectory=.babel_cache',
//         },
//       },
//     ],
//   },
// };

// export default [client, server];
export default [client];
