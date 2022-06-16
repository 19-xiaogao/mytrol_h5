<template>
  <view class="_buy_cont">
    <view
      class="bind-box"
      v-for="item in bindList"
      :key="item.id"
      @click="handleRouterDetail(item)"
    >
      <view class="_img">
        <img :src="item.file" alt="" />
      </view>
      <view class="_header_options" v-if="item.nft_total_number">
        <view class="_nft_num" v-if="item.nft_total_number > 1">
          <view class="_icon">
            <image
              src="http://oss.mytrol.cn/uni_mytrol/icon/my_nft_num.png"
              mode=""
            ></image>
          </view>
          <view class="_t1"> 拥有{{ item.nft_total_number }}份 </view>
        </view>
      </view>

      <view class="footer">
        <view class="_block" :class="[item.price ? '' : '_maxW_block']">
          <view class="_tit _one_omit">{{ item.name }}</view>
          <view class="_user">
            <view class="_avater">
              <image
                :src="getIpfsSrc(item.avatar)"
                mode=""
                class="_avater_img"
              ></image>
              <image
                src="https://oss.mytrol.cn/uni_mytrol/img/mock/hot.png"
                mode="widthFix"
                class="_hot"
              ></image>
            </view>
            <view class="_name _one_omit">
              {{ item.nickname }}
            </view>
          </view>
        </view>
      </view>
      <view class="_border_view" v-if="item.nft_total_number > 1">
        <view class="_block1"></view>
        <view class="_block2"></view>
      </view>
    </view>
    <view class="_null_data" v-if="bindList.length < 1">
      <view class="_null_bg">
        <image
          src="https://oss.mytrol.cn/uni_mytrol/icon/null_data_bg.png"
          mode=""
        ></image>
      </view>
    </view>
  </view>
</template>

<script>
import config from "@/js_sdk/general-http/config.js";
export default {
  data() {
    return {
      bindList: [],
    };
  },
  computed: {},
  methods: {
    getIpfsSrc(url) {
      if (url.indexOf("://") !== -1) {
        return url;
      }
      return config.IpfsUrl + url;
    },
    // 获取json数据
    async getJsonData() {
      // 已购买
      let collected_res = await this.$api._get(
        `/dbchain/oracle/nft/blind_box_of_user_buy`
      );
      let collected_data = collected_res.data.result;
      if (collected_data) {
        const NFT_List = collected_data.reverse();
        uni.stopPullDownRefresh();
        this.bindList = NFT_List;
      }
    },
    handleRouterDetail(item) {
      this.$router.push("/pages/nft_option/my_bindBox?id=" + item.id);
    },
    linkTo(url, type = false) {
      //#ifdef MP-WEIXIN
      if (type) {
        return uni.reLaunch({
          url: url,
        });
      }
      return uni.navigateTo({
        url: url,
      });
      //#endif
      //#ifdef H5
      return this.$router.push(url);
      //#endif
    },
  },
};
</script>

<style lang="scss" scoped>
._header_options {
  display: flex;
  justify-content: flex-end;
  position: absolute;
  top: 14px;
  width: 96%;
  ._img {
    display: flex;
    justify-content: center;
    width: unset;
    height: unset;
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
  ._nft_num {
    display: flex;
    height: 28px;
    background: rgba(0, 0, 0, 0.6);
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    align-items: center;
    padding: 0 10px;
    ._icon {
      image {
        width: 14px;
        height: 14px;
      }
    }
    ._t1 {
      height: 21px;
      font-size: 14px;
      font-family: SourceHanSansCN-Medium, SourceHanSansCN;
      font-weight: 500;
      color: #ffd36c;
      line-height: 21px;
      margin-left: 6px;
    }
  }
}
._border_view {
  position: absolute;
  height: inherit;
  width: 100%;
  z-index: 0;
  ._block1 {
    height: 8px;
    background: #232323;
    border-radius: 0px 0px 10px 11px;
    position: relative;
    top: -3px;
    width: 97%;
    margin: 0 auto;
  }
  ._block2 {
    background: #383838;
    border-radius: 0px 0px 12px 12px;
    height: 5px;
    position: relative;
    top: -3px;
    width: 92%;
    margin: 0 auto;
  }
}
._buy_cont {
  width: 93.6vw;
  margin: 0 auto;
  .bind-box {
    color: #fff;
    width: 100%;
    background: #151515;
    border-radius: 12px;
    margin-bottom: 16px;
    position: relative;
    ._img {
      width: 100%;
      height: 246px;
      position: relative;
      border-radius: 12px 12px 0 0;
      overflow: hidden;
    }
  }

  .footer {
    display: flex;
    justify-content: space-between;

    ._block {
      display: flex;
      flex-wrap: wrap;
      padding: 13px 18px 6px;

      ._tit {
        height: 24px;
        font-size: 16px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #ffffff;
        line-height: 24px;
        margin-bottom: 4px;
        max-width: 410rpx;
      }

      ._user {
        width: 100%;
        display: flex;

        ._avater {
          position: relative;
          min-width: 50px;
          ._avater_img {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            border: 2px solid #2e2e2e;
            object-fit: cover;
            object-position: center center;
          }

          ._hot {
            width: 14px;
            height: 14px;
            position: relative;
            left: -10px;
            top: 2px;
          }
        }

        ._name {
          // padding-left: 12px;
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #f2f2f2;
          line-height: 30px;
          max-width: 290rpx;
        }
      }
    }

    ._maxW_block {
      ._tit {
        width: 100%;
        max-width: 100%;
      }
    }
    ._price {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-end;
      padding-right: 18px;
      padding-bottom: 18px;
      min-width: 92px;
      ._numb {
        width: 100%;
        height: 30px;
        font-size: 20px;
        font-family: Roboto-Medium, Roboto;
        font-weight: 500;
        color: #ffffff;
        line-height: 30px;
        padding: 14px 0px 0 0;
        text-align: right;
        margin-bottom: 4px;
      }

      ._limit {
        height: 20px;
        border-radius: 6px;
        overflow: hidden;
        border: 1px solid #ffbd21;
        display: flex;
        text-align: right;

        ._t1 {
          height: 20px;
          font-size: 10px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #000000;
          line-height: 20px;
          background: #ffbd21;
          padding: 0 3px;
        }

        ._t2 {
          height: 20px;
          font-size: 10px;
          font-family: Roboto-Medium, Roboto;
          font-weight: 500;
          color: #ffbd21;
          line-height: 20px;
          padding: 0 4px;
          min-width: 18px;
          text-align: center;
        }
      }

      ._t3 {
        width: 60px;
        height: 20px;
        background: #9c9e9c;
        border-radius: 6px;
        line-height: 20px;
        text-align: center;
        font-size: 12px;
        font-weight: 400;
        color: #646464;
      }
    }
  }
}
</style>
