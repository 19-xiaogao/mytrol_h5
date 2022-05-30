<template>
  <view class="_time">
    <view class="_presell" v-if="isBuy == '1'">
      <view class="_t2">
        <view class="p1">即将开售</view>
        <view>{{ count_down }}</view>
      </view>
    </view>
    <view class="_presell _not_buy" v-if="isBuy == '3'">
      <view class="_t2">
        <view class="p1">已售罄</view>
      </view>
    </view>
  </view>
</template>

<script>
import { intervalTime } from "@/static/js/global.js";
export default {
  data() {
    return {
      timer: "", //定时器
      count_down: "",
      isBuy: "0", //是否可以购买（即发售时间小于当前时间）
    };
  },
  created() {
    this.getTime();
  },
  props: {
    publishTime: {
      // default: new Date().getTime() + ''
      default: "1636960980000",
    },
    NFT_item: {
      default: {},
    },
  },
  methods: {
    getTime() {
      if (!this.publishTime) return;
      if (this.NFT_item.number - this.NFT_item.counter_sold_nft < 1)
        return (this.isBuy = "3");
      let time =
        this.publishTime.length < 13
          ? this.publishTime + "000"
          : this.publishTime;
      let that_time = new Date().getTime();

      if (that_time > time) {
        clearInterval(this.timer);
        return 
      } else {
        this.isBuy = "1";
      }
      let res = intervalTime(time, that_time);
      let t1 = res[0] > 0 ? res[0] * 24 + res[1] : res[1];
      let h = t1 > 9 ? t1 : "0" + t1;
      let m = res[2] > 9 ? res[2] : "0" + res[2];
      let s = res[3] > 9 ? res[3] : "0" + res[3];
      let timeArr = `${h}:${m}:${s}`;
      this.count_down = timeArr;
      if (h < 1 && m < 1 && s < 1) {
        // this.
        this.isBuy = "2";
      } else {
        this.isBuy = "1";
      }
    },
  },
  computed: {},
  mounted() {
    this.timer = setInterval(this.getTime, 1000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
};
</script>

<style lang="scss" scoped>
._time {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);

  ._right {
    display: flex;
    width: 126px;
    height: 40px;
    // background: #ffb300;
    // border-radius: 8px;
    justify-content: center;
    align-items: center;
    // margin-right: 10px;

    .image {
      width: 24px;
      height: 24px;
      margin-right: 4px;
    }

    ._t2 {
      height: 24px;
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #fff;
      line-height: 24px;
    }
  }

  ._presell {
    display: flex;
    min-width: 126px;
    height: 40px;
    padding: 0 13px;
    // background: rgba(40, 40, 40, 0.8);
    border-radius: 8px;
    justify-content: center;
    align-items: center;

    .image {
      width: 18px;
      height: 18px;

      margin-right: 4px;
    }

    ._t2 {
      font-size: 16px;
      font-family: SourceHanSansCN-Medium, SourceHanSansCN;
      font-weight: 500;
      color: #fff;
      display: flex;
      flex-direction: column;
      width: 100%;
      align-items: center;

      .p2 {
        font-size: 14px;
      }
    }
  }

  ._not_buy {
    justify-content: flex-end;

    ._t2 {
      width: unset;
    }
  }
}

.but-box {
  position: fixed;
  bottom: 4px;
}

._redeem_btn {
  ._buy,
  ._redeem {
    width: 95vw;
    margin: 0 auto;
    height: 62px;
    background: #ffbd21;
    left: 50%;
    transform: translateX(-50%);
    position: fixed;
    bottom: 21px;
    box-shadow: 0px 2px 16px 6px rgba(31, 31, 31, 0.5);
    border-radius: 12px;
    overflow: hidden;
    z-index: 4;

    .button-background-img {
      position: absolute;
      width: 100%;
      height: 100%;
    }

    .price-box {
      position: absolute;
      left: 10px;
      top: 50%;
      transform: translateY(-50%);
      z-index: 1;
      display: flex;
      align-items: flex-end;

      .price {
        color: #ffffff;
        margin-left: 14px;

        .p1 {
          font-weight: 400;
          font-size: 12px;
        }

        .p2 {
          font-weight: 500;
          font-size: 20px;
        }
      }

      .remaining {
        font-size: 12px;
        font-weight: 500;
        color: #ffffff;
        margin-left: 14px;
        padding-bottom: 2px;
      }
    }

    ._left {
      padding-left: 22px;

      ._t1 {
        height: 14px;
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #fff;
        line-height: 14px;
      }

      ._t2 {
        height: 24px;
        font-size: 20px;
        font-family: Roboto-Medium, Roboto;
        font-weight: 500;
        color: #fff;
        line-height: 24px;
      }
    }

    ._no_publish {
      text-align: center;
      align-items: center;
      color: #e2e2e2;
      position: relative;
      z-index: 2;
      height: 100%;
      /* line-height: 100%; */
      line-height: 62px;
      font-size: 18px;
    }

    ._flex {
      display: flex;
      align-items: center;
      height: 100%;
      justify-content: space-around;

      .input-box {
        height: 41px;
        width: 207px;

        input {
          height: inherit;
          border-radius: 8px;
          margin-left: 10px;
        }
      }

      ._free_btn {
        color: #fff;
        position: relative;
        opacity: 0.7;
      }

      ._free_text {
        opacity: 1;
      }
    }
  }
}
</style>
