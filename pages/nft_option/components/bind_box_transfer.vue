<template>
  <view class="bind_box">
    <h3>受赠人</h3>
    <div class="input">
      <input v-model="address" placeholder="请输入受赠人地址" />
    </div>
    <div class="footer">
      <div @click="handleSureClick">确定</div>
    </div>
    <div class="close" @click="handleCloseClick">X</div>
  </view>
</template>

<script>
export default {
  props: {
    bindBoxDetail: {
      type: Object,
    },
  },
  data() {
    return {
      address: "",
    };
  },
  methods: {
    handleCloseClick() {
      this.address = "";
      this.$emit("close");
    },
    async handleSureClick() {
      const result = await this.$api._post(
        "/dbchain/oracle/nft/blind_box_transfer",
        {
          blind_box_code: this.bindBoxDetail.codes[0],
          to_addr: this.address.trim(),
        }
      );
      const res = result.data;
      if (res.err_code === "0") {
        uni.showToast({
          title: "转赠成功",
          duration: 5000,
          icon: "none",
        });
        this.address = "";
        this.$emit("close");
      }
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
  .input {
    margin: 20px 0;
    border: 1px solid #eee;
    height: 40px;
    border-radius: 20px;
    overflow: hidden;
    input {
      height: 100%;
      color: #000;
      padding: 0 20px;
    }
  }
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
      border-radius: 5px;
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
      width: 134px;
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