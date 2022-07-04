<template>
  <view class="_orider_item">
    <view class="_foot">
      <view class="_l">
        <view class="_t1"> 订单编号 ： </view>
        <view class="_t2 _one_omit">
          {{ NFT_item.vendor_payment_no }}
        </view>
        <img
          @click="copy(NFT_item.vendor_payment_no)"
          class="icon"
          src="https://mytrol-pub.oss-cn-shenzhen.aliyuncs.com/mytrol/system/copy.png"
          alt=""
        />
      </view>
      <view class="_r">
        <view class="_t1">
          {{ getFormatDate(NFT_item.created_at) }}
        </view>
        <!-- <view class="_t2">
					10:02:23
				</view> -->
      </view>
    </view>

    <view class="_border"></view>

    <view class="_head">
      <view class="_l">
        <image
          :src="
            getIpfsSrc(
              NFT_item.file_thumbnail
                ? NFT_item.file_thumbnail
                : NFT_item.nft_file
            )
          "
          mode=""
        ></image>
      </view>
      <view class="_cont">
        <view class="_tit _one_omit">
          {{ NFT_item.nft_name }}
        </view>
        <view class="_price">
          <view class="_t1"> 价格 </view>
          <view class="_t2">
            {{ NFT_item.amount }}
          </view>
        </view>
      </view>
      <view class="_r">
        <view class="_type"> 交易成功 </view>
      </view>
    </view>
  </view>
</template>

<script>
import { getFormatDate, uni_copy } from "@/static/js/global.js";
import config from "@/js_sdk/general-http/config.js";
export default {
  props: {
    // nft详情
    NFT_item: {
      // required: true,
      default() {
        return {
          name: "", // nft标题
          type: "", // 分类
          use: "", //传作人
          user_avater: "", //创作人头像
          img: "", //nft图片
          price: "", //价格
          num: "", //总量
          dispense: "", //分发（已售出）
          address: "", //地址
          tokenId: "", //
          desc: ``,
          created_at: "",
          hot: "https://oss.mytrol.cn/uni_mytrol/img/mock/hot.png",
        };
      },
    },
  },
  components: {},
  data() {
    return {};
  },
  methods: {
    copy(value) {
      //提示模板
      return uni_copy(value);
    },
    getFormatDate(date, type = "mm-dd MM:mm:ss") {
      return getFormatDate(date, type);
    },
    // 获取NFT IPFS地址
    getIpfsSrc(url) {
      if (url.indexOf("://") !== -1) {
        return url;
      }
      return config.IpfsUrl + url;
    },
  },
};
</script>

<style lang="scss" scoped>
._orider_item {
  padding: 12px;
  width: calc(100% - 24px);
  background: #0c0c0c;
  border-radius: 12px;
  margin-bottom: 10px;
  border: 0.5px solid #1b1b1b;
  ._head {
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
        font-size: 15px;
        font-weight: 500;
        color: #ffffff;
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
          font-family: PingFangSC-Regular, PingFang SC;
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
          font-family: Roboto-Medium, Roboto;
          font-weight: 500;
          color: #ffbd21;
          line-height: 20px;
          padding: 0 4px;
        }
      }
    }

    ._r {
      color: #2caf71;
      ._type {
      }
    }
  }

  ._border {
    height: 1px;
    background: #202020;
    border-radius: 1px;
    width: 100%;
    margin: 16px 0 11px;
  }

  ._foot {
    display: flex;
    justify-content: space-between;
    height: 18px;
    font-size: 13px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #cacaca;
    line-height: 18px;

    ._l {
      display: flex;
      width: 60%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    ._r {
      display: flex;
    }
  }
}
</style>
