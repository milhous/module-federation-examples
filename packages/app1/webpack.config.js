const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack").container
    .ModuleFederationPlugin;
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
        hot: true,
        compress: true,
        port: 3001
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
            name: "app1",
            remotes: {
                app2: "app2",
                app3: "app3"
            },
            shared: {
                "react": { singleton: true, eager: true },
                "react-dom": { singleton: true, eager: true },
                "@packages/shared-library": { singleton: true, eager: true }
            }
        }),
        new HtmlWebpackPlugin({
            template: "./public/index.html",
        }),
    ],
};