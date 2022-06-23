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
      <view
        class="order-box"
        v-for="v in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12]"
        :key="v"
      >
        <view class="order-title">
          <view class="id">
            <span>订单编号：</span>
            <span>20230322323</span>
          </view>
          <view class="tx-time"> 07/06 10:02:23 </view>
        </view>
        <view class="line"></view>
        <view class="content">
          <view class="_l">
            <image
              src="https://mytrol-pub.oss-cn-shenzhen.aliyuncs.com/mytrol/item/nftThumbnaila7866bd1a3aeb9bafa2037fbcecf55192d90be88b868526b9a77ee19f8b85c1b.jpg"
            ></image>
          </view>
          <view class="_cont">
            <view class="_tit"> 少女懵懂的年少时光 </view>
            <view class="_price">
              <view class="_t1"> 价格 </view>
              <view class="_t2"> 199 </view>
            </view>
          </view>
          <view class="_r">
            <view class="_type"> 交易成功 </view>
          </view>
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
export default {
  data() {
    return {
      switchBar,
      currentIndex: switchBar[0].id,
    };
  },
  methods: {
    clickLeft() {
      uni.navigateBack();
    },
    handleSwitchBarClick(item) {
      this.currentIndex = item.id;
    },
  },
};
</script>

<style lang="scss" scoped>
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
    height: 100%;
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
        width: 50%;
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
        color: #2caf71;
      }
    }
  }
}
</style>