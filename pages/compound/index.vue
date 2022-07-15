<template>
  <div class="compound">
    <uni-nav-bar
      left-img="https://oss.mytrol.cn/uni_mytrol/icon/back.png"
      left-img-h="40px"
      left-img-w="40px"
      fixed="true"
      color="#ffffff"
      backgroundColor="#1C1C1C"
      title="合成"
      class="_nav_index"
      :statusBar="true"
      @clickLeft="clickLeft()"
    ></uni-nav-bar>
    <view class="compound-body">
      <view class="body-detail" v-for="v in [1, 2, 3, 4, 5]" :key="v">
        <view class="left-box">
          <img src="" alt="" />
          <span>住宅公寓</span>
        </view>
        <view class="right-box" @click="handleGoCompoundClick">去合成</view>
      </view>
    </view>
  </div>
</template>

<script>
export default {
  methods: {
    clickLeft() {
      uni.navigateBack();
    },
    handleGoCompoundClick() {
      uni.navigateTo({
        url: "/pages/compound/detail",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.compound {
  width: 100vw;
  height: 100%;
  box-sizing: border-box;
  background: #1c1c1c;
  ._nav_index {
    background: #1c1c1c;
    position: relative;
    z-index: 111;
  }
  /deep/ .uni-nav-bar-text {
    span {
      font-size: 16px !important;
    }
  }
  .compound-body {
    width: 100%;
    margin-top: 13px;
    height: 100vh;
    overflow-y: auto;
    padding: 12px;
    box-sizing: border-box;
    .body-detail {
      margin-bottom: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 83px;
      background: #0c0c0c;
      border-radius: 12px;
      border: 1px solid #272727;
      overflow: hidden;
      .left-box {
        font-size: 15px;
        font-weight: 500;
        color: #fff;
        display: flex;
        align-items: center;
        img {
          height: 83px;
          width: 83px;
          border-radius: 8px;
          overflow: hidden;
        }
      }
      .right-box {
        font-size: 15px;
        font-weight: 500;
        margin-right: 20px;
        color: #ffbd21;
      }
    }
  }
}
</style>