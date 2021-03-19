module.exports = {
  devServer: {
    port: process.env.PORT,
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: ' @import "@/assets/scss/style.scss"; '
      }
    }
  }
}