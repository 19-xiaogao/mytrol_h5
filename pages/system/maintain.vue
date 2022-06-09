<template>
  <div class="body">
    <div class="title">
      <p>系统正在维护</p>
      <p>请耐心等待</p>
    </div>
    <div class="imgBox">
        <img src="https://mytrol-pub.oss-cn-shenzhen.aliyuncs.com/mytrol/system/maintain.jpg"></img>
    </div>
    <p class="footer">系统更新中...</p>
  </div>
</template>

<script>
export default {
  mounted() {
    this.isMaintain();
  },
  methods: {
    isMaintain() {
      this.$api._get("/dbchain/oracle/nft/get_system_status").then((res) => {
        if (res.data.result.status !== "maintenance") {
          uni.navigateTo({
            url: "/",
          });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.body {
  height: 100vh;
  width: 100vw;
  background-color: #131312;
  padding: 40px;
  box-sizing: border-box;
  .title {
    color: #fff;
    font-size: 24px;
  }
  .imgBox {
    width: 80vw;
    height: 30vh;
    margin-top: 25%;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .footer {
    margin-top: 20px;
    width: 100%;
    text-align: center;
    font-size: 23px;
    color: #fff;
  }
}
</style>
