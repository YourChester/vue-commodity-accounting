module.exports = {
  devServer: {
    port: process.env.PORT,
    proxy: process.env.BASE_URL
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: ' @import "@/assets/scss/style.scss"; '
      }
    }
  }
}