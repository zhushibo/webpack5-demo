/*
 * @Description: 
 * @Author: doctor
 * @Date: 2020-06-29 17:01:37
 * @LastEditTime: 2020-06-30 09:47:30
 * @LastEditors: doctor
 */ 
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

const deps = require("./package.json").dependencies
const path = require("path");

module.exports = {
  entry: "./src/index",
  mode: "development",
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 8081,
  },
  output: {
    publicPath: "http://localhost:8081/",
  },
  module: {
    rules: [
      { test: /\.js|jsx$/, use: 'babel-loader', exclude: /node_modules/ }
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "app2Lib",
      library: { type: "var", name: "app2Lib" },
      filename: "app2-remote-entry.js",
      exposes: {
        "./Button": "./src/Button",
      },
      shared: {
        ...deps,
        react: {
          eager: true,
          singleton: true,
          requiredVersion: deps.react,
        },
        "react-dom": {
          eager: true,
          singleton: true,
          requiredVersion: deps["react-dom"],
        }
      }
    }),
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
  ]
};