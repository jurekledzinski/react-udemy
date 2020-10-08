const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
  optimization: {
    minimizer: [new OptimizeCssAssetsWebpackPlugin({})],
  },
  module: {
    rules: [
      {
        test: /\.module\.s(a|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[local]",
              },
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(s(a|c)ss|css)$/,
        exclude: /\.module.(s(a|c)ss)$/,
        loader: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "style.[contenthash:6].css",
      chunkFilename: "style.[contenthash:6].css",
      publicPath: "./",
    }),
  ],
};

//plugins lista pluginów które bedziemy wykorzystywać z tego webpack
//new CleanWebpackPlugin()] za każdym razem będzie czyścił folder
//"style.[contenthash:6].css", odświeżanie styli w przeglądarce za każdym razem jak zostaną one z cashowane
//chunkFilename: "style.[contenthash:6].css" to samo odświeżanie,
//publicPath: "./", potrzebne przy stylach odwołujemy sie do bierzacego folderu
