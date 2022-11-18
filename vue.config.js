const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  lintOnSave: false,
  transpileDependencies: true,
  configureWebpack: {
    resolve: { extensions: [".ts", ".tsx", ".js", ".json"] },
    devServer: {
      proxy: {
        '/api': {
          target: 'http://175.178.7.180:8088',
          changeOrigin: true,
          pathRewrite: {
            '^/api': ''
          }
        }
      }
    },
    module: {
      rules: [{
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/\.vue$/],
        }
      }]
    }
  }
})