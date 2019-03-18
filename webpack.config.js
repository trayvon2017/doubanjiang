//导入处理路径的模块
var path = require('path');
//导入webpack
var webpack = require('webpack')
//导入自动声场html文件的插件
var htmlWebpackPlugin = require('html-webpack-plugin')
//引入vueloader插件
var VueLoaderPlugin = require('vue-loader/lib/plugin')
//导出一个配置对象,将来webpack在启动的时候,会默认来查找webpack.config.js,并读取这个文件中配导出的配置对象
module.exports = {
    entry: path.resolve(__dirname,'src/main.js'),//项目入口文件
    output: {//配置输出项
        path: path.resolve(__dirname,'dist'),
        filename: 'bundle.js'//配置输出文件名
    },
    devServer: { //这是配置dev-server命令参数的第二种方式
        open: true,//是否打开浏览器
        port: 3000,//设置启动时候的运行端口
        contentBase: 'src',//托管的根目录
        hot: true //启用热更新,这是通过配置文件启用dev-server命令热更新的第一步
    },
    plugins: [//配置插件的节点
        new webpack.HotModuleReplacementPlugin(),//配置一个热更新的模块对象
        new htmlWebpackPlugin({
            template: path.resolve(__dirname,'src/index.html'),
            filename:'index.html'
        }),
        new VueLoaderPlugin(),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery : "jquery",
            "windows.jQuery" : "jquery"
        })
    ],
    module: {//用来配置第三方loader模块
        rules: [//文件匹配以及处理loader
            {test: /\.css$/, use: ['style-loader','css-loader']},
            {test: /\.less$/, use: ['style-loader','css-loader','less-loader']},
            {test: /\.scss$/, use: ['style-loader','css-loader','sass-loader']},
            {test: /\.(png|jpg|gif|jpeg)$/, use: 'url-loader?limit=1024&name=[hash:8]-[name].[ext]'},
            // limit 给定的值，是图片的大小，单位是 byte， 如果我们引用的 图片，大于或等于给定的 limit值，则不会被转为base64格式的字符串，
            //如果 图片小于给定的 limit 值，则会被转为 base64的字符串
            //默认情况下,url中文件名是hash值.文件类型,也可以传值自定义修改
            { test: /\.(styl|eot|svg|ttf|woff|woff2)$/, use: 'url-loader'},
            {test: /\.vue$/, use: 'vue-loader'},
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-proposal-class-properties']
                    }
                }
            }
        ]

    },
    resolve: {
        /*alias: {//设置vue被导入时候的路径
            "vue$": "vue/dist/vue.js"
        }*/
    }
}