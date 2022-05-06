<script>
  import Vue from 'vue'
  export default {
    onLaunch: function() {
      uni.getSystemInfo({
        success: function(e) {
          Vue.prototype.statusBar = e.statusBarHeight
          // #ifndef MP
          if (e.platform == 'android') {
            Vue.prototype.customBar = e.statusBarHeight + 50
          } else {
            Vue.prototype.customBar = e.statusBarHeight + 45
          }
          // #endif

          // #ifdef MP-WEIXIN
          let custom = wx.getMenuButtonBoundingClientRect()
          Vue.prototype.customBar = custom.bottom + custom.top - e.statusBarHeight
          // #endif

          // #ifdef MP-ALIPAY
          Vue.prototype.customBar = e.statusBarHeight + e.titleBarHeight
          // #endif
        }
      })
    }
  }
</script>
<style lang="scss" src='@/components/css/index.scss'></style>
<style lang="scss" scoped>
  body {
    letter-spacing: -2px;
    padding-top: 40px;
  }

  @font-face {
    font-family: facon;
    font-weight: normal;
    font-style: normal;
    letter-spacing: -2px;
    src: url('https://oss.mytrol.cn/uni_mytrol/font/Roboto-Medium.ttf') format('truetype');
  }

  /*每个页面公共css */
</style>
