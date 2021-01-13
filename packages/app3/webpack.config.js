const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack").container.ModuleFederationPlugin;
const HotModuleReplacementPlugin = require("webpack").HotModuleReplacementPlugin;
const path = require("path");
const deps = require("./package.json").dependencies;

module.exports = {
    entry: "./src/index",
    resolve: {
        modules: ['node_modules'],
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    },
    mode: "development",
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        hot: true,
        compress: true,
        port: 3003
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
                "./routes": "./src/routes"
            },
            /**
             * eager：不会生成额外的 chunk。
             * 所有的模块都被当前的 chunk 引入，并且没有额外的网络请求。
             * 但是仍会返回一个 resolved 状态的 Promise。与静态导入相比，在调用 import() 完成之前，该模块不会被执行。
             * 
             * singleton: 确保运行时模块为单例，避免初始化多次。
             */
            shared: {
                ...deps,
                "react": { singleton: true, eager: true },
                "react-dom": { singleton: true, eager: true }
            }
        }),
        new HtmlWebpackPlugin({
            template: "./public/index.html",
        }),
    ],
};