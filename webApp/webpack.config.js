// [定数] webpack の出力オプションを指定します
// 'production' か 'development' を指定
const MODE = "development";

// ソースマップの利用有無(productionのときはソースマップを利用しない)
const enabledSourceMap = MODE === "development";

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const path = require('path');

// vue-loader@15から必要
// const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    mode: MODE,
    entry: "./src/js/app1.js",
    output: {// 出力先のディレクトリ
        path: path.resolve(__dirname, './dist/js'),
        // 出力ファイル名
        filename: 'bundle.js',
        publicPath: '/js' // この行を追加
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.vue$/, // ファイルが.vueで終われば...
                loader: 'vue-loader' // vue-loaderを使う
            },
            {
                test: /\.js$/,
                loader: 'babel-loader'
            },
            // Sassファイルの読み込みとコンパイル
            {
              test: /\.scss/, // 対象となるファイルの拡張子
                use:
                  [
                    MiniCssExtractPlugin.loader,
                    // CSSをバンドルするための機能
                  {
                    loader: 'css-loader',
                    options: {
                      // オプションでCSS内のurl()メソッドの取り込みを禁止する
                      url: false,
                      // ソースマップの利用有無
                      sourceMap: enabledSourceMap,
      
                      // 0 => no loaders (default);
                      // 1 => postcss-loader;
                      // 2 => postcss-loader, sass-loader
                      importLoaders: 2
                    },
                  },
                  // PostCSSのための設定
                  {
                    loader: "postcss-loader",
                    options: {
                    ident: 'postcss',
                    // PostCSS側でもソースマップを有効にする
                    sourceMap: true,
                    plugins: [
                        // Autoprefixerを有効化
                        // ベンダープレフィックスを自動付与する
                        require("autoprefixer")({
                        grid: true
                        })
                    ]
                    }
                  },
                  {
                    loader: 'sass-loader',
                    options: {
                      // ソースマップの利用有無
                      sourceMap: enabledSourceMap,
                    }
                  }
                ]
            },
          ],
        },
        resolve: {
            // import './foo.vue' の代わりに import './foo' と書けるようになる(拡張子省略)
            extensions: ['.js', '.vue'],
            alias: {
              // vue-template-compilerに読ませてコンパイルするために必要
              vue$: 'vue/dist/vue.esm.js',
            },
        },
        plugins: [
          new MiniCssExtractPlugin({
            filename: '../css/style.css'
          })
        //   VueLoaderPlugin(),
        ],
    };