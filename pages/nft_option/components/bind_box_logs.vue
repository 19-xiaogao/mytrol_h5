<template>
  <view class="_give_logs">
    <view class="_head">
      <view class="_t1"> 转手记录 </view>
      <view class="_icon" @click="closeLogs()">
        <image
          src="https://oss.mytrol.cn/uni_mytrol/icon/give_logs_close.png"
          mode=""
        ></image>
      </view>
    </view>
    <view class="_cont">
      <view class="_list" v-for="(item, index) in give_logs" :key="index">
        <view class="_item">
          <view class="_t1">交易次数</view>
          <view class="_t2">第{{ give_logs.length - index }}次</view>
        </view>
        <view class="_item">
          <view class="_t1">交易时间</view>
          <view class="_t2">{{ getFormatDateToStr(item.time) }}</view>
        </view>

        <view class="_item" v-if="item.sender">
          <view class="_t1">发送方</view>
          <view class="_t2" @click="copy(item.sender)">{{ item.sender }}</view>
        </view>
        <view class="_item">
          <view class="_t1">接收方</view>
          <view class="_t2" @click="copy(item.receiver)">{{
            item.receiver
          }}</view>
        </view>
        <!-- <view class="_item">
          <view class="_t1">交易hash</view>
          <view class="_t2">{{ item.tx_hash }}</view>
        </view> -->
      </view>
    </view>
  </view>
</template>

<script>
import { formatDate, uni_copy, getStore } from "@/static/js/global.js";
export default {
  props: {
    bindBoxDetail: {
      required: true,
    },
  },
  data() {
    return {
      give_logs: [],
    };
  },
  mounted() {
    this.getLogs();
  },
  methods: {
    closeLogs() {
      this.$emit("closeLogs");
    },
    getFormatDateToStr(date) {
      return formatDate(new Date(Number(date)), 3);
    },
    copy(value) {
      //提示模板
      return uni_copy(value);
    },
    async getLogs() {
      console.log(this.bindBoxDetail);
      let res = await this.$api._get(
        "/dbchain/oracle/nft/blind_box_transfer_info/" +
          this.bindBoxDetail.codes[0]
      );
      if (Array.isArray(res.data.result) && res.data.result.length > 0) {
        this.give_logs = res.data.result;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
._give_logs {
  ._head {
    height: 61px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    // width: 100%;
    padding: 0 12px 0 23px;

    ._t1 {
      height: 20px;
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #ffffff;
      line-height: 20px;
    }

    ._icon {
      image {
        width: 40px;
        height: 40px;
      }
    }
  }

  ._cont {
    width: calc(100% - 24px);
    background: #1e1e1e;
    border-radius: 12px;
    max-height: 480px;
    overflow-y: auto;
    margin: 0 auto;
    padding-bottom: 35px;

    ._list {
      margin-bottom: 20px;

      ._item {
        display: flex;
        margin-bottom: 4px;
        margin-top: 4px;

        ._t1 {
          width: 60px;
          height: 20px;
          font-size: 14px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #979797;
          line-height: 20px;
          padding-left: 24px;
          text-align: left;
        }

        ._t2 {
          font-size: 14px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #ffffff;
          line-height: 20px;
          padding-left: 20px;
          width: calc(100% - 120px);
          word-wrap: break-word;
        }
      }
    }
  }
}
</style>
