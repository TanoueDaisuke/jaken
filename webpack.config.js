module.exports = {
  entry: {
    app: "./src/index.js"
  },
  output: {
    path: __dirname + '/public/js',
    // [name]entryのキーが入る
    filename: "[name].js"
  },
    devServer: {
    // webで公開するindex.htmlファイルのあるパスを示す
    contentBase: __dirname + '/public',
    port: 8080,
    // todo:これ意味不明(相対パス？JSフォルダなんてないぞ)----------------------------------------
    publicPath: '/js/'
  },
  // デバッグようにソースマップを作成()
  devtool: "eval-source-map",
  mode: 'development',
  // ここからはファイルごとにloaderを指定する
  // test:に書かれている正規表現にファイルが一致した場合は、そのオブジェクトのloaderが動く！
  module: {
    rules: [{
      test: /\.js$/,
      // この指定により、同じtest:loaderよりも優先される=>まずはエラー検知！
      enforce: "pre",
      // 対象外
      exclude: /node_modules/,
      loader: "eslint-loader"
    }, {
      test: /\.css$/,
      loader: ["style-loader","css-loader"]
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
     }]
  }
};