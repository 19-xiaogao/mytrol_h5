<template>
  <view class="_nft_option my_nft_option">
    <uni-nav-bar
      left-img="https://oss.mytrol.cn/uni_mytrol/icon/back.png"
      left-img-h="40px"
      left-img-w="40px"
      fixed="true"
      color="#ffffff"
      backgroundColor="#1C1C1C"
      title="合成NFT"
      class="_nav_index"
      :statusBar="true"
      @clickLeft="clickLeft()"
    ></uni-nav-bar>
  </view>
</template>

<script>
export default {
  methods: {
    clickLeft() {
      uni.navigateBack();
    },
  },
};
</script>

<style lang="scss" scoped>
._nft_option {
  background: #1c1c1c;
  // padding-top: 70px;
  color: #fff;

  ._footer {
    position: relative;

    ._fot_img {
      display: flex;
      justify-content: center;

      image {
        height: 80px;
        width: 276px;
      }
    }

    ._download {
      position: absolute;
      display: flex;
      width: 130px;
      justify-content: space-between;
      left: calc((100vw - 130px) / 2);
      top: 18px;

      image {
        width: 34px;
        height: 34px;
      }
    }

    ._share_btn {
      padding: 0;
      margin: 0;
      height: 34px;
      background: rgba(0, 0, 0, 0);
      border: none;
      border-radius: 50%;
    }
  }

  ._nav {
    display: flex;
    height: 67px;
    color: #fff;
    position: absolute;
    height: 70px;
    width: 100vw;
    top: 0;
    left: 0;
    z-index: 999999999999;

    ._back {
      width: 40px;
      height: 40px;
      position: absolute;
      top: 23px;
      z-index: 999999999999;

      image {
        width: inherit;
        height: inherit;
      }
    }

    ._tit {
      width: 100%;
      text-align: center;
      position: absolute;
      top: 27px;
      pointer-events: none;
    }
  }

  ._user_block {
    display: flex;
    padding: 19px 12px;
    justify-content: center;

    ._icon_l,
    ._icon_r {
      image {
        width: 44px;
        height: 44px;
        position: relative;
        top: 10px;
      }
    }

    ._tit {
      height: 30px;
      font-size: 18px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #ffffff;
      line-height: 30px;
      padding: 0px 6px 0px 8px;
      min-width: 40%;
      max-width: 70%;

      ._t1 {
        text-align: center;
      }

      ._img {
        display: flex;
        justify-content: center;
        padding-top: 8px;

        image {
          width: 34px;
          height: 34px;
          position: relative;
          z-index: 4;
          top: -5px;
        }

        ._text {
          font-size: 12px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #845500;
          height: 22px;
          border-radius: 6px;
          border: 1px solid rgba(255, 255, 255, 0.51);
          background: linear-gradient(270deg, #e6ce9c 0%, #c8a063 100%);
          border-radius: 6px;
          line-height: 22px;
          padding: 0 9px 0 18px;
          position: relative;
          left: -12px;
        }
      }

      image {
        width: 44px;
        height: 14px;
      }

      .icon_check {
        width: 24px !important;
        height: 24px !important;
        top: 0px !important;
      }
    }

    ._icon_r {
    }
  }

  ._tx_hash {
    padding-top: 19px;
    margin-bottom: 69px;

    ._t1 {
      height: 24px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #d4d4d4;
      line-height: 24px;
      text-align: center;
      margin-bottom: 8px;
    }

    ._t2 {
      width: calc(100% - 36px - 42px);
      margin: 0 auto;
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #ffffff;
      line-height: 20px;
      padding: 18px;
      -webkit-background-clip: text;
      background: linear-gradient(270deg, #e6ce9c 0%, #c8a063 100%);
      border-radius: 12px;

      color: #fff;
      word-wrap: break-word;
      white-space: normal;
      word-break: break-all;
      text-align: center;
    }
  }

  ._check_op {
    position: relative;

    ._op {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 27px;
      justify-content: center;
      z-index: 2;
      position: relative;

      &:last-child {
        ._t1 {
          width: 100%;
        }

        ._t2 {
        }
      }

      ._t1 {
        height: 24px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #d4d4d4;
        line-height: 24px;
        margin-bottom: 10px;
        min-width: 30%;
        text-align: center;
      }

      ._t2 {
        font-size: 16px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #ffffff;
        line-height: 20px;
        max-width: 86%;
        word-break: break-all;
        white-space: pre-wrap;
        text-align: center;
      }

      ._op {
        width: 48%;
        margin-top: 6px;
        margin-bottom: 14px;

        ._t1 {
        }

        ._t2 {
          width: 100%;
        }
      }
    }

    ._bg_auth {
      position: absolute;
      top: -12px;
      left: calc((100% - 164px) / 2);

      image {
        width: 166px;
        height: 166px;
      }
    }
  }

  ._nft_bg {
    background: #000000;
    border-radius: 18px 18px 0px 0px;
    padding-bottom: 30px;
    position: relative;
    z-index: 1;

    .other-img {
      width: 100%;
      height: 375px;
    }
  }

  ._nft_option_cont {
    ._hed {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 50px;
      margin-bottom: 35px;

      ._left {
        image {
          width: 94px;
          height: 29px;
        }

        margin-right: 6px;
      }

      ._right {
        margin-left: 6px;
        height: 24px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #a5a5a5;
        line-height: 24px;
        letter-spacing: 1px;
      }
    }

    ._fot {
      width: 89.5%;
      margin: 0 auto;
      font-size: 13px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #494949;
      line-height: 24px;
      margin-bottom: 30px;
    }
  }

  ._help {
    display: flex;
    justify-content: center;
    margin: 24px 0 74px;

    image {
      height: 24px;
    }
  }

  ._btns {
    position: fixed;
    z-index: 2;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    height: 82px;
    background: rgba(0, 0, 0, 0.9);

    ._btn {
      width: 41.3%;
      height: 40px;
      font-size: 16px;
      font-weight: 400;
      color: #ffffff;
      display: flex;
      justify-content: center;
      border-radius: 8px;
      align-items: center;

      ._icon {
        height: 24px;

        image {
          width: 24px;
          height: 24px;
          margin-right: 4px;
        }
      }
    }
  }

  .empty {
    width: 100%;
    height: 100%;
    position: relative;
    // overflow: hidden;
    min-height: 294px;
    padding: 40px 0 0;
  }

  ._nft_img {
    perspective: 500px;
    position: relative;

    // pointer-events: none;
    ._img1 {
      position: absolute;
      left: calc((100vw - 280px) / 2);
      top: 40px;
      width: 280px;
      height: 280px;
      z-index: 2;
      transform-style: preserve-3d;
      // transform: translateZ(2000px);

      image {
        width: inherit;
        height: inherit;
      }
    }

    ._img2 {
      position: absolute;
      left: calc((100vw - 264px) / 2);
      top: 47px;
      width: 264px;
      height: 264px;
      z-index: 3;
      transform-style: preserve-3d;
      // transform: translateZ(3000px);
      display: none;

      image {
        width: inherit;
        height: inherit;
      }
    }

    ._img {
      width: 270px;
      height: 270px;
      margin: 0 auto;
      border-radius: 18px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      transform-style: preserve-3d;
      z-index: 9999999999;
      // transform: translateZ(4000px);
      top: 4px;

      @keyframes router {
        0% {
          transform: rotateY(0deg);
        }

        25% {
          transform: rotateY(10deg);
        }

        50% {
          transform: rotateY(20deg);
        }

        75% {
          transform: rotateY(10deg);
        }

        100% {
          transform: rotateY(0deg);
        }
      }

      @keyframes router1 {
        0% {
          transform: rotateY(0deg);
        }

        33% {
          transform: rotateY(15deg);
        }

        66% {
          transform: rotateY(-15deg);
        }

        100% {
          transform: rotateY(0deg);
        }
      }

      @keyframes router2 {
        0% {
          transform: rotateY(0deg);
        }

        33% {
          transform: rotateY(16deg);
        }

        66% {
          transform: rotateY(-16deg);
        }

        100% {
          transform: rotateY(0deg);
        }
      }

      ._img_default {
        width: 252px;
        height: 252px;
        border-radius: 18px;
        z-index: 9999;
      }

      ._img_hot {
        width: 36px;
        height: 36px;
        position: absolute;
        bottom: 30px;
        right: 30px;
        z-index: inherit;
      }
    }

    ._img_light {
      position: absolute;
      top: -68px;
      left: 0;
      width: 100vw;
      z-index: -1;
      pointer-events: none;

      image {
        width: inherit;
        pointer-events: none;
      }
    }

    ._fot_img {
      width: 215px;
      height: 89px;
      margin: 0 auto;
      position: relative;
      top: -8px;

      image {
        width: inherit;
        height: inherit;
      }
    }

    ._fot_img_gif {
      top: -34px;
      height: 80px;

      ._fot_img {
        width: 257px;

        image {
          height: 189px;
        }
      }

      ._download {
        top: 8px;
      }
    }
  }

  ._view_img {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #000;
    z-index: 9999999999;

    image {
      width: 88vw;
    }
  }
}

._give_logs,
._nft_content {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  background: #1a1a1a;
  border-radius: 12px 12px 0px 0px;
  max-height: 80vh;
  z-index: 5;
}

._module_bg {
  background: #f9f9f9;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 4;
  opacity: 0;
}

._give_content {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  background: #1a1a1a;
  border-radius: 12px 12px 0px 0px;
  height: 100vh;
  z-index: 5;
}

.tl-show {
  overflow: hidden;
  position: fixed;
  height: 100%;
  width: 100%;
  z-index: 99999;
}

._animation_img {
  ._img1 {
    animation: router1 7s linear infinite;
  }

  ._img2 {
    animation: router1 7s linear infinite;
  }

  ._img {
    animation: router1 7s linear infinite;
  }
}
</style>
