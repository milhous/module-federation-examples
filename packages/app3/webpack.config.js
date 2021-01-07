const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack").container.ModuleFederationPlugin;
const HotModuleReplacementPlugin = require("webpack").HotModuleReplacementPlugin;
const path = require("path");

module.exports = {
    entry: "./src/index",
    resolve: {
        modules: ['node_modules'],
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    },
    mode: "development",
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        port: 3003,
        hot: true,
        compress: true
    },
    target: 'web',
    output: {
        publicPath: "auto",
    },
    module: {
        rules: [{
                test: /\.m?js$/,
                type: "javascript/auto",
                resolve: {
                    fullySpecified: false,
                },
            },
            {
                test: /\.jsx?$/,
                loader: "babel-loader",
                exclude: /node_modules/,
                options: {
                    presets: ["@babel/preset-react"],
                },
            },
        ],
    },
    plugins: [
        new HotModuleReplacementPlugin(),
        new ModuleFederationPlugin({
            name: "app3",
            filename: "remoteEntry.js",
            exposes: {
                "./Widget": "./src/Widget",
            },
            shared: {
                "react": { singleton: true },
                "react-dom": { singleton: true },
            },
        }),
        new HtmlWebpackPlugin({
            template: "./public/index.html",
        }),
    ],
};