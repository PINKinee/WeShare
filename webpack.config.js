const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
module.exports = {
    mode: 'development',
    devServer: {
        port: 8080, //指定端口号
        open: true, //自动打开浏览器
        host: '127.0.0.1'//设置主机地址
    },
    module: {
        roles: [
            { test: /\.less$/, use: ['less-loader'] },
            {
                test: /\.js$/,
                exclude: /node_modules/,//除去这个不需要管
                use: {
                    loader: 'babel-loader',
                    options: {
                        plugins: ['@babel/plugin-proposal-class-properties']
                    }
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ]
    },
    plugins: [
        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [ElementPlusResolver()],
        }),
    ],
}