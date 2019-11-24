const path = require('path');
module.exports = {
    entry: "./js/app.js",
    output: {
        filename: "out[name].js",
        path: path.resolve(__dirname, "js")
    },
    watch: false,
    mode: "development", //ta opcja zostanie pominięta jeżeli użyjemy npm run build
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
}