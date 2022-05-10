var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var webpack = require("webpack");
var fs = require("fs");
var path = require("path");
var nodeExternals = require("webpack-node-externals");
var CleanWebpackPlugin = require("clean-webpack-plugin").CleanWebpackPlugin;
module.exports = {
    stats: "none",
    mode: process.env.NODE_ENV,
    target: "node",
    externals: [nodeExternals()],
    experiments: {
        topLevelAwait: true,
    },
    devtool: 'inline-source-map',
    entry: "./index.ts",
    output: {
        filename: "index.js",
        path: path.resolve(__dirname, "dist"),
    },
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
            {
                test: /\.js?$/,
                loader: "babel-loader",
                exclude: [/node_modules/, path.resolve(__dirname, "dist")],
                options: {
                    presets: ["@babel/preset-env"],
                    plugins: [
                        "@babel/plugin-transform-runtime",
                        "@babel/plugin-proposal-class-properties",
                        "@babel/plugin-proposal-private-methods",
                    ],
                },
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
            "process.env": webpack.DefinePlugin.runtimeValue(function () {
                return JSON.stringify(__assign(__assign({}, process.env), { APP_SETTINGS: fs.readFileSync("./settings-".concat(process.env.NODE_ENV, ".json"), "utf-8") }));
            }, [
                path.resolve(__dirname, "settings-development.json"),
                path.resolve(__dirname, "settings-staging.json"),
                path.resolve(__dirname, "settings-production.json"),
            ]),
        }),
    ],
};
//# sourceMappingURL=webpack.config.js.map