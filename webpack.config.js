const path = require('path');
const webpack = require('webpack');
//生成html静态文件
const HtmlWebpackPlugin = require('html-webpack-plugin');
//清除dlist
const CleanWebpackPlugin = require('clean-webpack-plugin');
//复制指定文件
const copyWebpackPlugin = require('copy-webpack-plugin');
//打包分离css
const miniCssExtractPlugin = require("mini-css-extract-plugin");
//压缩css
const optimizeCss = require('optimize-css-assets-webpack-plugin');
//压缩js
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

//自动生成入口文件
const getEntry = require("./config/get-entry");
const entry = getEntry("./src/pages");
const getPath = require("./config/get-path");
const getPathHtml=getPath("./src/pages");
console.log(entry);
console.log(getPathHtml);
module.exports = {
    entry: entry,
    // webpack会根据mode进行对Js打包，development压缩，production下面自动压缩
    mode:'production',// production
    resolve: {
        // 针对 Npm 中的第三方模块优先采用 jsnext:main 中指向的 ES6 模块化语法的文件
        mainFields: ['jsnext:main', 'browser', 'main']
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new miniCssExtractPlugin({
            filename: "css/[name]-[hash:8].css",
            chunkFilename: "[id].css"
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new optimizeCss({
            cssProcessor: require('cssnano'), //引入cssnano配置压缩选项
            cssProcessorOptions: {
                discardComments: { removeAll: true },
                // 避免 cssnano 重新计算 z-index
                safe: true,
                // cssnano 集成了autoprefixer的功能
                // 会使用到autoprefixer进行无关前缀的清理
                // 关闭autoprefixer功能
                // 使用postcss的autoprefixer功能
                autoprefixer: false
            },
            canPrint: true
        }),
        new UglifyJsPlugin(),
        new copyWebpackPlugin([{
            from: __dirname+'/src/assets',
            to: './',
            ignore: ['.*']
        }]),
        new webpack.optimize.ModuleConcatenationPlugin(),
       /* new HtmlWebpackPlugin({
            title: 'index',
            filename: 'index/user.ejs',
            template: 'src/index/user.ejs',
            chunks: ['index']
         }),
        new HtmlWebpackPlugin({
            title: 'user',
            filename: 'user/user.ejs',
            template: 'src/user/user.ejs',
            chunks: ['user']
        }),*/

    ],
    output: {
        filename: 'js/[name]_[hash:8].js',
        path: path.join(__dirname, 'dist')
    },
    //本地服务
    devServer: {
        contentBase: path.join(__dirname, "dist")
    },
    module: {
        rules: [
            {
                test:/\.js$/,
                exclude:/node_modules/,
                use:{
                    loader: "babel-loader",
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            minimize: true,
                            removeComments: false,
                            collapseWhitespace: false,
                            attrs:['img:src']
                        }
                    }
                ],
            },
            {
              test:/\.(png|svg|jpg|gif)$/,
                use:[
                    {
                        loader:'url-loader',
                        options: {
                            name: "images/[name]-[hash:8].[ext]",
                            limit:100,
                            publicPath: "",
                        }
                    },
                    {
                        loader: "img-loader",
                        options: {
                            plugins: [
                                require("imagemin-pngquant")({
                                    quality: "80" // the quality of zip
                                })
                            ]
                        }
                    }
                ]
            },
            {
                test:/\.css$/,
                use:[
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: miniCssExtractPlugin.loader,
                        options:{
                            publicPath: '../'
                        }
                    },
                    'css-loader','postcss-loader'
                ]
            },
            {
                test:/\.(sass|scss)$/,
                use: [{
                    loader: "style-loader"
                },
                {
                        loader: miniCssExtractPlugin.loader,
                        options:{
                            publicPath: '../'
                        }
                },
                {
                    loader: "css-loader"
                }, {
                    loader: "sass-loader"
                }]
            },
        ]
    },
    optimization: {
        splitChunks: {
            chunks: "all",
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name:'jquery',
                    priority: -10
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        }
    }
};
var getHtmlConfig = function (name) {
    return {
        template: `./src/pages/${name}/index.html`,
        filename: `${name}.html`,
        // favicon: './favicon.ico',
        inject: true,
        hash: false, //开启hash  ?[hash]
        chunks: ['jquery',`${name}`],//页面要引入的包
        minify: process.env.NODE_ENV === "development" ? false : {
            removeComments: true, //移除HTML中的注释
            collapseWhitespace: true, //折叠空白区域 也就是压缩代码
            removeAttributeQuotes: true, //去除属性引用
        },
    };
};
//自动生成html模板
getPathHtml.forEach((element) => {
    module.exports.plugins.push(new HtmlWebpackPlugin(getHtmlConfig(element)));
})