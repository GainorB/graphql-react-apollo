const path = require('path');
// const WebpackDashboard = require('webpack-dashboard/plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const DEV_MODE = process.env.NODE_ENV !== 'production';

module.exports = {
  // entry file for react
  entry: './src/index.js',
  // where the compiled code goes
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'static/js/bundle.js',
  },
  // loaders
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // (RegEXP) anything that is .js/.jsx will be compiled by babel
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      // allows importing/using css files (if I don't want to use styled-jsx)
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
        }),
      },
      // allows image support in .js files
      // creates an /images folder in /build when application is built
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[hash]_[name].[ext]',
              outputPath: 'static/images/',
            },
          },
          // compress images
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true,
            },
          },
        ],
      },
    ],
  },
  // creates the template for the index.html file that react is injected into
  plugins: [
    new FriendlyErrorsWebpackPlugin(), // easier to read error messages
    new CleanWebpackPlugin(['dist']), // deletes the build folder in between builds
    // points to the file where react is injected
    new HtmlWebpackPlugin({
      title: 'My React App',
      hash: true,
      template: './src/index.html', // Load a custom template
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    new ExtractTextPlugin('static/css/style.css'),
    new ManifestPlugin(), // will generate a manifest.json file in your root output directory with a mapping of all source file names to their corresponding output file,
    // new WebpackDashboard(), // enhanced dev experience with a cli
  ],
  // webpack-dev-server options
  devServer: {
    noInfo: true, // disable webpack bundle information on startup
    historyApiFallback: true, // serving index.html in place of any 404s
    disableHostCheck: true, // fix this error: Invalid Host header
    https: false, // enable SSL for localhost environment?
    port: 3000,
    quiet: true, // turns off webpack output including error message because FriendlyErrorsWebpackPlugin is enabled
    // proxy: [
    //   {
    //     context: ['/auth', '/api'],
    //     target: 'http://[::1]:8080',
    //     secure: false,
    //     changeOrigin: true,
    //   },
    // ],
  },
  performance: {
    hints: false, // disable performance warnings
  },
  devtool: DEV_MODE ? 'inline-source-map' : 'source-map',
};
