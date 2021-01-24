const config = require('./webpack.config.js');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    ...config,
    mode : 'production',
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                  ecma: 6,
                  warnings: false,
                  parse: {},
                  compress: {},
                  mangle: false, // Note `mangle.properties` is `false` by default.
                  module: false,
                  output: null,
                  toplevel: false,
                  nameCache: null,
                  ie8: false,
                  keep_classnames: undefined,
                  keep_fnames: false,
                  safari10: false,
                },
              }),
        ]
      }
};
