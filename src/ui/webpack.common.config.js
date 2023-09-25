const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  entry: {
    main: './scripts/main.js',
    jsEnabled: './scripts/js-enabled.js',
    govukFrontend: './scripts/govuk-frontend.js',
    mojFrontend: './scripts/moj-frontend.js',
    accessibleAutocomplete: './scripts/accessible-autocomplete.js',
    cookies: './scripts/cookies.js',
    formSubmission: './scripts/form-submission.js',
    googleAnalytics: './scripts/google-analytics.js',
  },
  output: {
    path: path.join(__dirname, 'public/js'),
    filename: '[name].js',
    library: ['EXIP', '[name]'],
    libraryTarget: 'var',
  },
  target: ['web', 'es5'],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin(), new OptimizeCSSAssetsPlugin({})],
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
        test: /\.scss$/,
        exclude: /node_modules/,
        type: 'asset/resource',
        generator: {
          outputPath: '../css',
          filename: 'styles.css',
        },
        use: ['sass-loader'],
      },
    ],
  },
};
