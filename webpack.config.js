const packageJson = require('./package.json');
const modules = Object.keys(packageJson.dependencies);
const path = require('path');
const nodeModulesPath = path.resolve('node_modules');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    target: 'node',
    entry: './src/app.ts',
    output: {
        filename: 'bundle.js'
    },
    node: {
        __dirname: false,
        __filename: false,
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json'],
        mainFields: ['main', 'module']
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [{
                from: 'node_modules/swagger-ui-dist/',
                to: 'assets/swagger'
            }, {
                from: 'package.json',
                to: '.',
                transform(content, path) {
                    const packageJson = JSON.parse(content);
                    packageJson.dependencies = {};
                    return JSON.stringify(packageJson);
                },
            }]
        }),
        new webpack.DefinePlugin({
            'process.env.SWAGGER_PATH': JSON.stringify('assets/swagger/'),
        })
    ],
    externals: [
        function ({context, request}, callback) {
            const isInNodeModules = request.startsWith(nodeModulesPath);
            if (isInNodeModules) {
                const isDependency = modules.some(m => request.startsWith(path.resolve(nodeModulesPath, m)));
                if (!isDependency) {
                    return callback(null, 'commonjs ' + request);
                }
            }

            callback();
        }
    ],
    module: {
        rules: [
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            {test: /\.tsx?$/, loader: 'ts-loader'}
        ]
    }
};
