import path from 'path';
import { fileURLToPath } from 'url';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  mode: 'production',
  entry: './starwars.js',
  output: {
    filename: 'main.[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true, 
  },
  module: {
    rules: [
     
      {
        test: /\.s?css$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpe?g|svg|gif|webp)$/i,
        type: 'asset/resource',
          generator: {
    filename: 'img/[name][ext]', 
  }
      },
    ],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
      '@assets': path.resolve(__dirname, './img'),
    },
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  plugins: [new HTMLWebpackPlugin({
   template: './index.html'
 }), new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'img', to: 'img' },
        { from: 'fonts', to: 'fonts' },
      ],
    }), 
],
    
 target: "web",
 devServer: {
   compress: true,
   port: 9000,
 },
 
};
