module.exports = {
  devServer: {
    port: 3333,
    open: true
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
