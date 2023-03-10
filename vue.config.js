const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  lintOnSave: false,
  transpileDependencies: true,
  // 配置：可在less中使用JavaScript
  // css: {
  //   loaderOptions: {
  //     less: {
  //       lessOptions: {
  //         javascriptEnabled: true,
  //       },
  //     },
  //   },
  // },
  configureWebpack: {
    resolve: { extensions: [".ts", ".tsx", ".js", ".json"] },
    devServer: {
      proxy: {
        "/api": {
          target: "http://106.52.74.37:8088",
          changeOrigin: true,
          pathRewrite: {
            "^/api": "",
          },
        },
      },
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: "ts-loader",
          exclude: /node_modules/,
          options: {
            appendTsSuffixTo: [/\.vue$/],
          },
        },
      ],
    },
  },
});
