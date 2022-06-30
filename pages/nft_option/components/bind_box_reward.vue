<template>
  <view class="bind_box">
    <h3>恭喜您</h3>
    <p class="desc">
      成功获得
      <span>{{bindBoxRewardList.length}}</span>
      款NFT！
    </p>
    <div class="nft_box">
      <div class="nft">
        <img :src="currentImg" alt="" />
      </div>
      <div class="nft-list">
        <p
          v-for="(v, index) in bindBoxRewardList"
          :key="index"
          :class="target === index ? 'target':''"
          @click="handleNameClick(v, index)"
        >
          {{ v.name }}
        </p>
      </div>
    </div>
    <div class="footer">
      <!-- <div>继续开启</div> -->
      <div @click="handleCloseClick">确定</div>
    </div>
    <div class="close" @click="handleCloseClick">X</div>
  </view>
</template>

<script>
export default {
  props: {
    bindBoxRewardList: {
      type: Array,
    },
  },
  data() {
    return {
      currentImg: "",
      target: 0,
    };
  },
  mounted() {
    this.currentImg =
      this.bindBoxRewardList.length > 0
        ? (this.currentImg = this.bindBoxRewardList[0].file)
        : "";
  },
  methods: {
    handleCloseClick() {
      this.$emit("close");
    },
    handleNameClick(item, index) {
      this.target = index;
      this.currentImg = item.file;
    },
  },
};
</script>

<style lang="scss" scoped>
.bind_box {
  width: 90vw;
  background: #ffffff;
  border-radius: 8px;
  position: absolute;
  top: 0;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  box-sizing: border-box;
  padding: 20px;
  z-index: 11;
  h3 {
    font-size: 20px;
    font-weight: 500;
    color: #d3b178;
    text-align: center;
  }
  .desc {
    font-size: 16px;
    font-weight: 500;
    color: #333333;
    text-align: center;
    span {
      color: #d9bf87;
      font-size: 24px;
    }
  }
  .nft_box {
    height: 70%;
    width: 100%;
    display: flex;
    .nft {
      margin-top: 4px;
      width: 50%;
      height: 150px;
      background: #d8d8d8;
      box-shadow: 0px 1px 2px 0px #9c9c9c;
      border-radius: 10px;
      overflow: hidden;
      border: 1px solid #ffffff;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
      }
    }
    .nft-list {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 150px;
      overflow-y: auto;
      p {
        font-size: 16px;
        font-weight: 500;
        color: #b7b7b7;
        text-align: center;
        margin-bottom: 10px;
      }
      .target {
        color: #333333;
      }
    }
  }
  .footer {
    display: flex;
    margin-top: 10px;
    justify-content: center;
    div {
      width: 100%;
      height: 42px;
      border-radius: 5px;
      border: 1px solid #979797;
      text-align: center;
      line-height: 42px;
      font-size: 16px;
    }
    div:first-child {
      background: #fff;
      color: #979797;
    }
    div:last-child {
      color: #fff;
      border: none;
      background: linear-gradient(
        156deg,
        #e6ce9c 0%,
        #caa468 100%,
        #caa468 100%
      );
    }
  }
  .close {
    position: absolute;
    top: 10px;
    right: 20px;
    color: #000;
    font-size: 20px;
  }
}
</style>