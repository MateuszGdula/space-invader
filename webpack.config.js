const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    "space-invader": "./src/js/init.js"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "./js/[name].min.js"
  },
  target: "node",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              url: false
            }
          },
          "postcss-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              publicPath: "../",
              outputPath: "img/"
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "./css/style.min.css"
    })
  ]
};
