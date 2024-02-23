const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "production",
  devtool: "source-map",
  entry: "./src/js/index.js",
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
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "src/index.html",
    }),
    new CopyPlugin({
      patterns: [
        { from: "src/assets/weather", to: "assets/weather" },
        { from: "src/assets/wind", to: "assets/wind" },
        { from: "src/assets/", to: "assets/" },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: "styles.css",
    }),

  ],
};
