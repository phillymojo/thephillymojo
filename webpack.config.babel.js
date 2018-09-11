import path from 'path';
const webpack = require('webpack');
// import nodeExternals from 'webpack-node-externals';



const client = {
  entry: {
    js: './src/client.js',
  },
  output: {
    path: path.join(__dirname, 'src', 'static', 'js'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: path.join(__dirname, 'src'),
        use: {
          loader: 'babel-loader',
          options: 'cacheDirectory=.babel_cache',
        },
      },
    ],
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      PORT: 3000,
    }),
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
