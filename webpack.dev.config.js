const config = require('./webpack.config.js');
const NodemonPlugin = require('nodemon-webpack-plugin');
const path = require('path');

module.exports = {
    ...config,
    plugins: [
        ...config.plugins,
        new NodemonPlugin({
            args: ['dotenv_config_path=local.env'],
            watch: path.resolve('./dist'),
            ignore: ['*.js.map'],
            verbose: true,
            nodeArgs: ['--inspect', '--require', 'dotenv/config'],
            script: './dist/bundle.js',
            ext: 'js,ts,json'
        }),
    ],
};
