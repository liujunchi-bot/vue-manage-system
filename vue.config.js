module.exports = {
  lintOnSave: false,
  assetsDir: "./static",
  publicPath: "./",
  devServer: {
    port: 3333,
    open: true,
    // proxy: "http://localhost:3000"
  },
  css: {
    loaderOptions: {
      sass: {
        // 新版本sass-loader， 将data改成prependData进行配置
        data: `@import "@/assets/scss/_variable.scss";`
      }
    }
  }
}
