const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  entry: {
    main: './scripts/main.js',
    jsEnabled: './scripts/js-enabled.js',
    govukFrontend: './scripts/govuk-frontend.js',
    accessibleAutocomplete: './scripts/accessible-autocomplete.js',
  },
  output: {
    path: path.join(__dirname, 'public/js'),
    filename: '[name].js',
    library: ['DTFS', '[name]'],
    libraryTarget: 'var',
  },
  target: ['web', 'es5'],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin(),
      new OptimizeCSSAssetsPlugin({}),
    ],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(s*)css$/,
        use: [
          {
            loader: 'file-loader',
            options: { outputPath: '../css', name: 'styles.css' },
          },
          'sass-loader',
        ],
      },
    ],
  },
};
