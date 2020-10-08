//konfiguracja webpack na użytek developmentu

module.exports = {
  devServer: {
    contentBase: "./public",
    port: 3000,
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.module\.s(a|c)ss$/,
        use: [
          "style-loader",
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
          "style-loader",
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
};

//devServer  contentBase to bedzie folder public, port 3000
//devtool czyli bedziemy po transpilowaniu przez webpack bedziemy widzieć komponenty jak w kodzie źródłowym
//module - rules ładujemy scss,sass
//module - use w tym to co jest na poczatku bedzie na używane końcu przez webpack, a to co jest na końcu będzie na początku przez webpack
//use style-loader webpack wrzuci style na developmencie do html nie beda minifikowane
//use loader options dodatkowe do css-loader
//loader sass loader

//test do styli ale zwykłych jeśli nie bedziemy chcieli z sass scss skorzystać
//exclude ponieważ test dla scss bedzie pasował ta końcówka również do tej reguły wiec musimy sobie tutaj  je wykluczyć
