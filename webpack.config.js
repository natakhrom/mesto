const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
    entry: { main: './src/pages/index.js' },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
    },

    module: {
        rules: [ 
          {
            //** регулярное выражение, которое ищет все js файлы */ 
            test: /\.js$/,
            //** при обработке этих файлов нужно использовать babel-loader */ 
            loader: 'babel-loader',
            //** исключает папку node_modules, файлы в ней обрабатывать не нужно */ 
            exclude: '/node_modules/'
          },
          {
            //** регулярное выражение, которое ищет все файлы с такими расширениями */ 
            test: /\.(png|svg|jpg|gif)$/,
            //** при обработке этих файлов нужно использовать file-loader */ 
            loader: 'file-loader'
          },
          {
            //** регулярное выражение, которое ищет все файлы с такими расширениями */ 
            test: /\.(otf|ttf|woff|woff2)$/,
            //** при обработке этих файлов нужно использовать file-loader */ 
            loader: 'file-loader'
          },
          //** аналогично добавьте правило для работы с html */ 
          {
            test: /\.html$/,
            loader: 'html-loader'
          },
          {
            //** применять это правило только к CSS-файлам */
              test: /\.css$/i,
            //** при обработке этих файлов нужно использовать MiniCssExtractPlugin.loader и css-loader */ 
              loader:  [
                MiniCssExtractPlugin.loader, 
                { 
                loader: 'css-loader', 
                options: { importLoaders: 1 } 
              }, 
                'postcss-loader'
              ]
          }
          ]
      },

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
          }),
          new MiniCssExtractPlugin() //** подключение плагина для объединения файлов */ 
    ]
}