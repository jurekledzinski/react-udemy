const path = require("path").resolve;
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    index: path(__dirname, "..", "src", "index.js"),
  },
  output: {
    filename: "[name].[contenthash:6].js",
    path: path(__dirname, "..", "build"),
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path(__dirname, "..", "public", "index.html"),
      favicon: "./public/favicon.ico",
    }),
  ],
};

//entry plik wejściowy do naszego bundlingu, naszym plikiem bedzie index, czyli folder src a w nim index.js, '..' to wyjście z folderu, __dirname dotyczy tu folderu webpack

//output czyli to co z tego wyjdzie, nazwa pliku name - index, bedzie sie tam tworzył hash do 6 znaków wiec przegladarka nie bedzie trdzymać tego w cash
//path folder build

//resolve do jakich będziemy się odnosić plików, przy importach np. gdy bedzie komponent nie musiec pisach js albo jsx

//module tu piszemy co ma się dziać z jakim typem plików, czyli w test js i jsx będą brane poda uwage
//exclude wykluczamy js i jsx z node_modules jest tego tam dużo
//use co używamy do tych plików, tu loader i babel-loader bedzie nam to wszystko tłumaczyc

//plugin
//tworzymy sobie nowa instancje new HtmlWebpackPlugin tu okreslamy nasz template
