<template>
  <view>
    <view class="_main">
      <view class="_head">
        <view class="_left">
          <view class="_avater">
            <image
              v-if="userInfo.avatar"
              :src="userInfo.avatar"
              mode="widthFix"
              class="_avater_img"
            >
            </image>
            <image
              v-if="userInfo.hot"
              :src="userInfo.hot"
              mode="widthFix"
              class="_hot"
            ></image>
          </view>
          <view class="_text">
            <view class="_t1">{{ userInfo.nickname }}</view>
            <view class="_t2" @click="copy(userInfo.address)">
              地址：{{
                userInfo.address
                  ? plusXing(userInfo.address, 4, 4)
                  : localUserInfo.address
                  ? plusXing(localUserInfo.address, 4, 4)
                  : "地址生成中..."
              }}
              <view class="_icon_copy">
                <image
                  src="https://oss.mytrol.cn/uni_mytrol/icon/copy.png"
                  mode=""
                ></image>
              </view>
            </view>
          </view>
        </view>
        <view class="_right">
          <view class="_t1"> 可领取 </view>
          <view class="_t2">
            <image
              src="https://oss.mytrol.cn/uni_mytrol/icon/vip.png"
              mode=""
            ></image>
            <text>{{ userInfo.token ? userInfo.token : 0 }}&nbsp;份</text>
          </view>
        </view>
      </view>

      <view class="_cont">
        <view class="_tab_list">
          <view
            class="_tab"
            v-for="item in tabList"
            :key="item.id"
            @click="changeTab(item)"
          >
            <view
              class="_tit"
              :class="[activeTab == item.id ? '_active_tit' : '']"
            >
              {{ item.name }}
            </view>
            <view class="_border" v-show="activeTab == item.id"> </view>
          </view>
          <!-- <view class="_redeem" @click="linkTo('/pages/redeem/redeem')">
            <view class="_icon">
              <image
                src="http://oss.mytrol.cn/uni_mytrol/icon/redeem_icon.png"
                mode=""
              ></image>
            </view>
            <view class="_t1"> 兑换中心 </view>
          </view> -->
          <view class="_redeem" @click="handleLongOutClick">
            <view class="_icon">
              <image
                src="https://mytrol-pub.oss-cn-shenzhen.aliyuncs.com/mytrol/system/signout.png"
                mode=""
              />
            </view>
            <view class="_t1"> 退出登录 </view>
          </view>
          <!-- <image 
						:src="imgUrl" 
						mode="widthFix" 
						class="btn" 
						@click="handleClick"
					/> -->
        </view>

        <view class="_check_cont">
          <buy-list ref="buy_list" v-show="activeTab == '0'"></buy-list>
          <collect-list v-if="activeTab == '1'"></collect-list>
          <orider-list ref="order_list" v-show="activeTab == '2'"></orider-list>
          <bind-list ref="bind_list" v-show="activeTab == '3'" />
        </view>
      </view>
    </view>
  </view>
</template>

<script>
let that;
import buyList from "@/pages/component/buy_list.vue";
import bindList from "@/pages/component/bind_list.vue";
import collectList from "@/pages/component/collect_list.vue";
import oriderList from "@/pages/component/orider_list.vue";
import { setStore, getStore, plusXing, uni_copy } from "@/static/js/global.js";
export default {
  components: {
    buyList,
    collectList,
    oriderList,
    bindList,
  },
  onLoad() {},
  mounted() {
    that = this;

    this.getUserProfile();
    // this.getPhoneNumber()
    this.initData();
    this.defaultRefresh();
  },
  data() {
    return {
      hasUserInfo: false,
      userInfo: {
        hot: "https://oss.mytrol.cn/uni_mytrol/img/mock/hot.png",
        avatar: "",
        token: "0",
        address: "",
      },
      activeTab: "0",
      tabList: [
        {
          name: "nft",
          id: "0",
        },
        {
          name: "盲盒",
          id: "3",
        },
        {
          name: "订单",
          id: "2",
        },
      ],
      bindBoxNfts: [],
      getCont: 0,
      imgUrl:
        "https://mytrol-pub.oss-cn-shenzhen.aliyuncs.com/mytrol/h5WebSite/button.png",
    };
  },
  computed: {
    localUserInfo() {
      return getStore("userInfo") ? getStore("userInfo") : this.userInfo;
    },
  },
  methods: {
    navShow(e) {
      that = this;
      this.getUserProfile();
      // this.getPhoneNumber()
      this.getUserInfo();
      this.$refs.buy_list.getJsonData();
    },
    getPhoneNumber: function (e) {
      uni.getPhoneNumber({
        desc: "Wexin", // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {},
      });
    },
    getUserProfile(e) {
      // let UserProfile={...this.userInfo}
      let userInfoLocal = getStore("userInfo");
      if (userInfoLocal.avatar) {
        this.hasUserInfo = true;
        this.userInfo.avatar = getStore("userInfo").avatar;
        return;
      }

      // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
      uni.getUserProfile({
        desc: "Wexin", // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
          that.userInfo.avatar = res.userInfo?.avatarUrl || "授权失败";
          that.userInfo.nickname = res.userInfo?.nickName;
          that.hasUserInfo = true;
          setStore("userInfo", that.userInfo);
        },
        fail: (e) => {},
      });
    },

    // 获取用户信息
    async getUserInfo() {
      let userInfoLocal = getStore("userInfo");
      let res = await this.$api._get("/dbchain/oracle/nft/user_info");
      if (res.data.err_code == "2" && this.getCont == 0) {
        this.getCont = 1;
        return this.getUserInfo();
      }
      if (res.data.err_code === "0") {
        uni.stopPullDownRefresh();
        this.userInfo = {
          ...userInfoLocal,
          address: res.data.result.address,
          avatar: userInfoLocal.avatar,
          token: res.data.result.token,
          my_code: res.data.result.my_code,
          phone_number: res.data.result.phone_number,
        };
        this.userInfo.token = res.data.result.token;
        setStore("userInfo", that.userInfo);
        uni.stopPullDownRefresh();
        this.$store.commit("setUserInfo", that.userInfo);
        if (!this.userInfo.phone_number) {
          // this.linkTo('/pages/login/login',true)
        }
      }
    },

    copy(value) {
      //提示模板
      return uni_copy(value);
    },
    // 分享海报
    // 下拉
    lower() {
      // let page = this.searchData + 1;
      // this.getNftList(page)
      this.getUserInfo();
      this.initData();
    },
    initData() {
      if (this.activeTab == "0") {
        this.$refs.buy_list.getJsonData();
      } else if (this.activeTab === "2") {
        this.$refs.order_list.getJsonData();
      } else if (this.activeTab === "3") {
        this.$refs.bind_list.getJsonData();
      }
    },
    plusXing(a = "", b, c) {
      return plusXing(a, b, c);
    },
    // 已拥有。订单切换
    changeTab(item) {
      this.activeTab = item.id;
      this.initData();
    },
    defaultRefresh() {},
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

    // 分享
    handleClick() {
      let code = getStore("userInfo").my_code;
      let url = location.origin;
      url = `${url}?my_code=${code}`;

      this.$nextTick(() => {
        uni.setClipboardData({
          data: url,
          success: function () {},
        });
      });
    },
    handleLongOutClick() {
      console.log("退出登录");
      this.linkTo("/pages/login/login");
    },
  },
};
</script>

<style lang="scss" scoped>
._buy_cont {
  width: 93.6vw;
  margin: 0 auto;

  ._btn_login {
    display: flex;
    justify-content: center;
    ._btn {
      width: 140px;
      height: 44px;
      background: #ffbd21;
      border-radius: 8px;
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #ffffff;
      line-height: 44px;
      text-align: center;
    }
  }
}
._main {
  color: #fff;
  background: #1c1c1c;
  width: 100vw;

  ._head {
    width: calc(100% - 36px);
    padding: 20px 18px 20px;
    display: flex;
    justify-content: space-between;

    ._left {
      display: flex;

      ._avater {
        position: relative;

        ._avater_img {
          width: 58px;
          height: 58px;
          border-radius: 50%;
          margin-right: 12px;
        }

        ._hot {
          width: 20px;
          height: 20px;
          position: absolute;
          top: 36px;
          right: 5px;
        }
      }

      ._text {
        padding-top: 6px;

        ._t1 {
          height: 20px;
          font-size: 18px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #ffffff;
          line-height: 20px;
          margin-bottom: 6px;
        }

        ._t2 {
          height: 20px;
          font-size: 14px;
          font-family: Helvetica;
          color: #cacaca;
          line-height: 20px;
          display: flex;
          align-items: center;

          ._icon_copy {
            padding-left: 4px;

            image {
              width: 18px;
              height: 18px;
            }
          }
        }
      }
    }

    ._right {
      width: 62px;
      height: 50px;
      border-radius: 8px;
      border: 2px solid #ffbd21;

      ._t1 {
        height: 24px;
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #cacaca;
        line-height: 24px;
        text-align: center;
      }

      ._t2 {
        height: 28px;
        line-height: 28px;
        font-size: 14px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #ffffff;
        background: #ffbd21;
        border-radius: 8px;
        display: flex;
        justify-content: center;
        align-items: center;

        image {
          width: 16px;
          height: 16px;
          margin-right: 4px;
        }
      }
    }
  }

  ._cont {
    background: #000000;
    border-radius: 16px 16px 0px 0px;
    border-radius: 16px 16px 0px 0px;

    ._tab_list {
      padding: 10px 0;
      display: flex;
      position: relative;

      ._tab {
        ._tit {
          padding: 6px 17px;
          height: 20px;
          font-size: 16px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #7d7d7d;
          line-height: 20px;
        }

        ._active_tit {
          height: 20px;
          font-size: 16px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #ffffff;
          line-height: 20px;
        }

        ._border {
          margin: 0 auto;
          width: 18px;
          height: 4px;
          background: #ffbd21;
          border-radius: 3px;
        }
      }

      ._redeem {
        border-radius: 8px;
        border: 1px solid rgba(49, 49, 49, 0.5);
        display: flex;
        align-items: center;
        padding: 0 11px;
        position: absolute;
        right: 14px;
        height: 36px;

        ._icon {
          width: 22px;
          height: 22px;

          image {
            width: 22px;
            height: 22px;
          }
        }

        ._t1 {
          margin-left: 4px;
          font-size: 14px;
          font-family: SourceHanSansCN-Regular, SourceHanSansCN;
          font-weight: 400;
          color: #ffffff;
          line-height: 22px;
        }
      }

      .btn {
        display: block;
        width: 188rpx;
        height: 70rpx;
        position: absolute;
        top: 0;
        left: calc(538rpx - 296rpx);
      }
    }
  }

  ._check_cont {
    padding-bottom: 55px;
  }
}
</style>
