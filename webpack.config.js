const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/js/index.js",
  devtool: "inline-source-map",
  devServer: {
    static: "./src",

  },
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",

      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "src/index.html",
      inject: "body",
    }),
    new CopyPlugin({
      patterns: [
        { from: "src/assets/weather", to: "assets/weather" },
        { from: "src/assets/wind", to: "assets/wind" },
        { from: "src/assets/", to: "assets/" },

      ],
    }),
  ],
};
