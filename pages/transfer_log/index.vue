<template>
  <view class="order">
    <uni-nav-bar
      left-img="https://oss.mytrol.cn/uni_mytrol/icon/back.png"
      left-img-h="40px"
      left-img-w="40px"
      fixed="true"
      color="#ffffff"
      backgroundColor="#1C1C1C"
      title="转赠记录"
      class="_nav_index"
      :statusBar="true"
      @clickLeft="clickLeft()"
    ></uni-nav-bar>
    <view class="switch-bar">
      <view
        class="el"
        v-for="item in switchBar"
        :key="item.id"
        @click="handleSwitchBarClick(item)"
      >
        <span
          :class="item.id === currentIndex ? 'select_span span ' : 'span'"
          >{{ item.text }}</span
        >
        <span class="select" v-show="item.id === currentIndex"></span>
      </view>
    </view>
    <view class="order-body">
      <view class="order-box" v-for="v in txData" :key="v">
        <view class="order-title">
          <view class="r">
            <span class="name">转出地址：</span>
            <span class="text">{{ v.sender_ }}</span>
            <img
              @click="copy(v.sender)"
              class="icon"
              src="https://mytrol-pub.oss-cn-shenzhen.aliyuncs.com/mytrol/system/copy.png"
              alt=""
            />
          </view>
          <view class="tx-time"> {{ v.time }} </view>
        </view>
        <view class="line"></view>
        <view class="content">
          <view class="_l">
            <image :src="v.file"></image>
          </view>
          <view class="_cont">
            <view class="_tit"> {{ v.denom_name }} </view>
            <view class="_price">
              <span>接收地址：</span>
              <span>{{ v.receiver_ }}</span>
              <img
                @click="copy(v.receiver)"
                class="icon"
                src="https://mytrol-pub.oss-cn-shenzhen.aliyuncs.com/mytrol/system/copy.png"
                alt=""
              />
            </view>
          </view>
          <view class="_r">
            <view class="_type" :class="currentIndex === 1 ? 'tx_out' : ''">
              {{ currentIndex === 1 ? "转出" : "转入" }}
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
const switchBar = [
  {
    text: "转出",
    id: 1,
  },
  {
    text: "收到",
    id: 2,
  },
];
import { formatDate, plusXing, uni_copy } from "@/static/js/global.js";

export default {
  data() {
    return {
      switchBar,
      currentIndex: switchBar[0].id,
      txData: [],
    };
  },
  mounted() {
    this.getTransferOut();
  },
  methods: {
    clickLeft() {
      uni.navigateBack();
    },
    copy(value) {
      //提示模板
      return uni_copy(value);
    },
    handleSwitchBarClick(item) {
      this.currentIndex = item.id;
      if (item.id === 1) {
        this.getTransferOut();
      } else {
        this.getTransferIn();
      }
    },
    async getTransferOut() {
      let result = await this.$api._get(
        "/dbchain/oracle/nft/get_nft_transfer_out_info"
      );
      if (result.data.result.length > 0) {
        const data = result.data.result.map((v) => {
          return {
            ...v,
            receiver_: plusXing(v.receiver, 4, 4),
            sender_: plusXing(v.sender, 4, 4),
            time: formatDate(new Date(Number(v.time)), ""),
          };
        });
        this.txData = JSON.parse(JSON.stringify(data.reverse()));
      } else {
        this.txData = [];
      }
    },
    async getTransferIn() {
      let result = await this.$api._get(
        "/dbchain/oracle/nft/get_nft_transfer_in_info"
      );

      if (result.data.result.length > 0) {
        const data = result.data.result.map((v) => {
          return {
            ...v,
            receiver_: plusXing(v.receiver, 4, 4),
            sender_: v.sender.length < 46 ? v.sender : plusXing(v.sender, 4, 4),
            time: formatDate(new Date(Number(v.time)), ""),
          };
        });
        this.txData = JSON.parse(JSON.stringify(data.reverse()));
      } else {
        this.txData = [];
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.tx_out {
  color: #ffbd21;
}
.icon {
  margin-left: 3px;
  width: 20px;
  height: 20px;
}
.order {
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
  .switch-bar {
    width: 100%;
    display: flex;
    justify-content: space-around;
    position: sticky;
    top: 44px;
    z-index: 111;
    background: #1a1a1a;

    .el {
      width: 33.3%;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      .span {
        font-size: 16px;
        font-weight: 500;
        color: #7d7d7d;
      }
      .select_span {
        color: #ffffff;
      }
      .select {
        margin-top: 2px;
        width: 18px;
        height: 4px;
        background: #ffbd21;
        border-radius: 3px;
      }
    }
  }
  .order-body {
    width: 100%;
    margin-top: 13px;
    height: 100vh;
    overflow-y: auto;
    padding: 12px;
    box-sizing: border-box;
    .order-box {
      width: 100%;
      height: 132px;
      background: #0c0c0c;
      border-radius: 12px;
      border: 1px solid #272727;
      padding: 12px;
      box-sizing: border-box;
      margin-bottom: 10px;
      .order-title {
        display: flex;
        justify-content: space-between;
        color: #cacaca;
        font-size: 13px;
        .r {
          display: flex;
          align-items: center;
          width: 55%;
          .name {
            width: 40%;
          }
          .text {
            flex: 1;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        .tx-time {
          flex: 1;
        }
      }
    }
    .line {
      width: 100%;
      height: 1px;
      margin: 13px 0;
      background: #202020;
      border-radius: 1px;
    }
    .content {
      display: flex;
      ._l {
        image {
          width: 58px;
          height: 58px;
          border-radius: 8px;
          border: 2px solid #242424;
        }
      }

      ._cont {
        display: flex;
        flex-wrap: wrap;
        padding-left: 12px;
        width: 60%;
        padding-right: 12px;

        ._tit {
          width: 100%;
          color: #fff;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        ._price {
          height: 20px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          font-size: 13px;
          font-weight: 500;
          color: #cacaca;
        }
      }

      ._r {
        color: #2caf71;
      }
    }
  }
}
</style>