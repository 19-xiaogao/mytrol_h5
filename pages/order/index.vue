<template>
  <view class="order">
    <uni-nav-bar
      left-img="https://oss.mytrol.cn/uni_mytrol/icon/back.png"
      left-img-h="40px"
      left-img-w="40px"
      fixed="true"
      color="#ffffff"
      backgroundColor="#1C1C1C"
      title="我的订单"
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
      <order-list ref="order_list" v-show="currentIndex == '1'"></order-list>

      <view
        class="order-box"
        v-show="currentIndex == '2' || currentIndex == '3'"
        v-for="v in orderListData"
        :key="v"
      >
        <view class="order-title">
          <view class="r">
            <span class="name">订单编号：</span>
            <span class="text">{{ v.orderid_ }}</span>
            <img
              @click="copy(v.orderid)"
              class="icon"
              src="https://mytrol-pub.oss-cn-shenzhen.aliyuncs.com/mytrol/system/copy.png"
              alt=""
            />
          </view>
          <view class="tx-time"> {{ v.tx_time }} </view>
        </view>
        <view class="line"></view>
        <view class="content">
          <view class="_l">
            <image :src="v.denom_uri"></image>
          </view>
          <view class="_cont">
            <view class="_tit"> {{ v.denom_name }} </view>
            <view class="_price">
              <view class="_t1"> 价格 </view>
              <view class="_t2"> {{ v.amount }} </view>
            </view>
          </view>
          <view class="_r">
            <view class="_type" :class="currentIndex == 2 ? 'tx_out' : ''">
              {{ currentIndex == 2 ? "待支付" : "已失效" }}
            </view>
            <p v-if="currentIndex == 2" class="countdown">
              距订单失效: {{ v.expireTime }}s
            </p>
          </view>
        </view>
        <view class="line" v-if="currentIndex == '2'"></view>
        <view class="footer-btn" v-if="currentIndex == '2'">
          <view class="unCloseOder" @click="handleUnPayClick(v)">取消订单</view>
          <view class="goPay" @click="handleGoPayClick(v)">去支付</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
const switchBar = [
  {
    text: "已付款",
    id: "1",
  },
  {
    text: "待付款",
    id: "2",
  },
  {
    text: "已取消",
    id: "3",
  },
];
import orderList from "@/pages/component/orider_list.vue";
import { formatDate, plusXing, uni_copy } from "@/static/js/global.js";
export default {
  components: {
    orderList,
  },
  data() {
    return {
      switchBar,
      currentIndex: switchBar[0].id,
      orderListData: [],
    };
  },
  methods: {
    clickLeft() {
      uni.navigateBack();
    },
    copy(value) {
      //提示模板
      return uni_copy(value);
    },
    handleUnPayClick(item) {
      const that = this;
      uni.showModal({
        title: "提示",
        content: `您确定取消订单吗？`,
        cancelText: "取消",
        confirmText: "确定",
        async success(res) {
          if (res.confirm) {
            const result = await that.cancelOrder(item.orderid);
            if (result.err_code === "0") {
              uni.showToast({
                title: "取消订单成功",
                duration: 5000,
              });
              that.getOrder();
            }
          }
        },
      });
    },
    handleSwitchBarClick(item) {
      this.currentIndex = item.id;
      this.getOrder();
    },
    formatDateSplit(time) {
      return (
        time.substring(0, 4) +
        "/" +
        time.substring(4, 6) +
        "/" +
        time.substring(6, 8) +
        " " +
        time.substring(8, 10) +
        ":" +
        time.substring(10, 12)
      );
    },
    async handleGoPayClick(v) {
      window.location.href = v.pay_url;
    },
    async getOrder() {
      let result = await this.$api._get(
        `/dbchain/oracle/nft/unionpay/get_unpaid_orders`
      );

      if (result.data.result.length > 0) {
        const data = result.data.result.map((v) => {
          return {
            ...v,
            orderid_: plusXing(v.orderid, 4, 4),
            tx_time: this.formatDateSplit(v.tx_time),
            expireTime: this.timeTransferSecond(v.expiration_time),
          };
        });
        if (this.currentIndex === "2") {
          this.orderListData = data
            .filter((v) => !v.is_canceled && !this.isExpireTime(v.expiration_time))
            .reverse();
        } else {
          this.orderListData = data
            .filter((v) => v.is_canceled || this.isExpireTime(v.expire_time))
            .reverse();
        }
      } else {
        this.txData = [];
      }
    },
    isExpireTime(time) {
      const min15 = 60 * 15 * 1000;
      return Number(time) - Date.now() >= min15;
    },
    timeTransferSecond(time) {
      if (!this.isExpireTime(time)) {
        const millisecond = Number(time) - Date.now();
        return Math.trunc(millisecond / 1000);
      }
    },
    async getOrderTradeNo(orderId) {
      await this.$api._post("/dbchain/oracle/nft/unionpay/get_order_tradeNo", {
        order_id: orderId,
      });
    },
    async cancelOrder(orderId) {
      const result = await this.$api._post(
        "/dbchain/oracle/nft/nft_cancel_order",
        {
          order_id: orderId,
        }
      );
      return result.data;
    },
  },
};
</script>

<style lang="scss" scoped>
.tx_out {
  color: #ffbd21;
}
.countdown {
  font-size: 13px;
  font-weight: 500;
  text-align: start;
  color: #cacaca;
}
.footer-btn {
  display: flex;
  justify-content: flex-end;
  view {
    width: 74px;
    height: 28px;
    text-align: center;
    line-height: 28px;
    font-weight: 500;
    border-radius: 8px;
  }
  .unCloseOder {
    font-size: 12px;
    font-weight: 500;
    color: #999999;
    border: 1px solid #979797;
  }
  .goPay {
    margin-left: 10px;
    border: 1px solid #ffbd21;
    font-weight: 400;
    color: #ffbd21;
  }
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
  .switch-bar {
    width: 100%;
    display: flex;
    justify-content: space-between;
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
          text-align: right;
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
        width: 40%;
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
          border: 1px solid #ffbd21;
          display: flex;

          ._t1 {
            width: 32px;
            height: 20px;
            background: #ffbd21;
            font-size: 12px;
            font-weight: 400;
            color: #000000;
            line-height: 20px;
            text-align: center;
            border-radius: 6px;
          }

          ._t2 {
            min-width: 24px;
            height: 20px;
            font-size: 12px;
            font-weight: 500;
            color: #ffbd21;
            line-height: 20px;
            padding: 0 4px;
          }
        }
      }

      ._r {
        text-align: right;
        flex: 1;
        color: #999999;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
    }
  }
}
</style>