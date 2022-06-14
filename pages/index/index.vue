<template>
  <view class="content">
    <uni-nav-bar
      left-img="https://oss.mytrol.cn/uni_mytrol/img/logo.png"
      left-img-h="29px"
      left-img-w="121px"
      fixed="true"
      color="#ffffff"
      :backgroundColor="pageKey == 'home' ? '#000000E6' : '#1C1C1C'"
      title=" "
      class="_nav_index"
      :statusBar="true"
    ></uni-nav-bar>

    <view
      :style="height"
      v-show="pageKey == 'home'"
      scroll-y
      @scrolltolower="lower('home')"
    >
      <Home ref="home"></Home>
    </view>
    <view
      :style="height"
      v-show="pageKey == 'main'"
      scroll-y
      @scrolltolower="lower('main')"
    >
      <Main ref="main"></Main>
    </view>

    <sj-tab-bar
      v-if="tabBar.color"
      ref="tab_bar"
      :tabBar="tabBar"
      mode="2"
      @change="change"
    >
    </sj-tab-bar>
  </view>
</template>

<script>
let _self;
import Home from "../home/home.vue";
import Main from "../main/main.vue";
import uniNavBar from "uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.vue";
import { setStore, getStore } from "../../static/js/global.js";
import config from "@/js_sdk/general-http/config.js";
export default {
  components: {
    Home,
    Main,
    uniNavBar,
  },
  computed: {
    height() {
      // 此处需要减去系统状态栏高度 顶部title高度 底部tab高度
      return `height:calc(100vh - 44px - 72px);overflow-y: auto;overflow-x: hide;`;
    },
  },
  data() {
    return {
      title: "Hello",
      pageKey: "home",
      JSONList: {},
      icon: {
        home: [
          "https://oss.mytrol.cn/uni_mytrol/icon/home_default.png",
          "https://oss.mytrol.cn/uni_mytrol/icon/home_active.png",
        ],
        main: [
          "https://oss.mytrol.cn/uni_mytrol/icon/main_default.png",
          "https://oss.mytrol.cn/uni_mytrol/icon/main_active.png",
        ],
      },
      tabBar: {
        color: "#aaaaaa", //显示的颜色
        selectedColor: "#FFBD21", //选中时的颜色
        fontSize: "", //字体大小 默认22rpx
        iconWidth: "28px", //图标宽度 默认44rpx
        iconHight: "28px", //图标高度 默认44rpx
        intervalHight: "", //图标与文字直接的间隔 默认8rpx
        tabBarHight: "76px", //1.没有苹果底部黑条时  默认104rpx 2.有苹果黑条时 104rpx +苹果黑条高度
        tabBarBackground: "rgba(0, 0, 0, 1)", //底部背景色
        boxShadow: "", //仅模式1 有效 默认  0 -1rpx 6rpx rgba(0, 0, 0, 0.1)
        list: [
          {
            key: "home",
            iconPath: "https://oss.mytrol.cn/uni_mytrol/icon/home_default.png",
            selectedIconPath:
              "https://oss.mytrol.cn/uni_mytrol/icon/home_active.png",
            text: "首页",
          },

          {
            key: "main",
            iconPath: "https://oss.mytrol.cn/uni_mytrol/icon/main_default.png",
            selectedIconPath:
              "https://oss.mytrol.cn/uni_mytrol/icon/main_active.png",
            text: "个人中心",
          },
        ], //tab 列表
        logo: {
          width: "46px",
          height: "46px",
          src: "https://oss.mytrol.cn/uni_mytrol/icon/create.png",
        }, //用于mode为3时  即两个tab加中间自定义logo的布局
      },
      share: {
        title: "Mytrol数字藏品",
        path: "/pages/index/index",
        imageUrl: "https://oss.mytrol.cn/uni_mytrol/img/share_1.jpg",
        desc: "Mytrol数字藏品",
        content: "Mytrol数字藏品",
      },
    };
  },
  onLoad(option) {
    _self = this;

    if (option.key) {
      this.pageKey = option.key;
      setTimeout(() => {
        this.$refs.tab_bar.NavChange(option.key);
      }, 5000);
    }
    if (option.code) {
      setStore("my_code", option.code);
    } else {
      // 取出指定url里参数 返回object
      const param2Obj = (url = " ") => {
        const search = url.split("?")[1];
        if (!search) {
          return {};
        }
        return JSON.parse(
          '{"' +
            decodeURIComponent(search)
              .replace(/"/g, '\\"')
              .replace(/&/g, '","')
              .replace(/=/g, '":"') +
            '"}'
        );
      };

      let obj = {};
      let option_obj;

      if (option.q) {
        let url = encodeURI(option.q);
        option_obj = param2Obj(url);
      } else {
        option_obj = option;
      }
      try {
        let keys = Object.keys(option_obj)[0];
        let values = Object.values(option_obj)[0];
        obj = {
          id: keys.split("id")[1],
          code: values,
        };
        if (values) {
          setStore("my_code", values);
        }
      } catch (e) {
        //TODO handle the exception
        // this.back()
      }
      if (obj.id) {
        return this.linkTo(`/pages/nft_option/nft_option?id=${obj.id}`);
      }
    }
    this.wxLogin();
    this.getJsonData();
  },
  onPullDownRefresh() {
    if (this.pageKey == "home") {
      return _self.getJsonData();
    }
    return this.$refs[this.pageKey].lower();
    // this.change(this.pageKey);
  },
  onmounted() {
    let backlen = history.length - 1;
    history.go(-backlen);
  },
  methods: {
    async change(key) {
      switch (key) {
        case "home":
          this.getJsonData();
          // this.$refs.home.navShow(this.JSONList) //切换时刷新组件数据
          break;
        case "main":
          this.$refs.main.navShow(this.JSONList); //切换时刷新组件数据
          break;
        case "activity":
          this.$refs.activity.navShow(this.JSONList); //切换时刷新组件数据
          break;
        default:
          break;
      }
      this.pageKey = key;
    },
    fatherHeight(e) {
      this.height = e;
    },
    // 获取NFT IPFS地址
    getIpfsSrc(url) {
      if (url.indexOf("://") !== -1) {
        return url;
      }
      return config.IpfsUrl + url;
    },
    wxLogin(e) {
      const that = this;
      if (getStore("user_id")) return false;
      return this.$router.push("/pages/login/login");
      uni.login({
        provider: "weixin",
        success: async (login_res) => {
          let code = login_res.code;
          let params = {
            code: code, //微信授权码
            invitation_code: getStore("my_code") ? getStore("my_code") : "",
            type: "mini",
          };
          let res = await that.$api._post(
            "/dbchain/oracle/nft/auth_code_to_register_login",
            params
          );
          if (res.data.err_code == "0") {
            setStore("user_id", res.data.result.userId);
          }
        },
      });
    },
    async getOpenId(code) {
      let res = await this.$api._post(
        "/dbchain/oracle/query_wechat_user_info",
        {
          js_code: code,
          appid: "wxd23643f41728070e", //仅为实例appid
          secret: "0388c6d420003ff3ff9c3949895a36a1", //仅为实例secret
          grant_type: "authorization_code",
        }
      );
      if (res.data.openid) {
        setStore("openId", res.data.openid);
        this.$refs.home.getIsApply();
      }
    },
    // 获取json数据
    async getJsonData() {
      // let json = await this.$api._get(
      //   "https://apply-sign.oss-cn-shenzhen.aliyuncs.com/mytrol/mytrol_data.json"
      // );
      // json = json.data;
      let getBanner = async () => {
        let banner_res = await this.$api._get("/dbchain/oracle/nft/get_banner");
        let data = banner_res.data.result
          ? banner_res.data.result.banner_info
          : "[]";
        let home_swiper = JSON.parse(data);
        home_swiper.forEach((res) => {
          (res.name = res.title),
            (res.colorClass = "uni-bg-red"),
            (res.url = res.imgFile),
            (res.content = res.decs),
            (res.router = res.imgUrl);
        });
        return home_swiper;
      };

      let getIp = async () => {
        let ip_res = await this.$api._get(
          "/dbchain/oracle/nft/backend/get_serises_ip"
        );
        let data = ip_res.data.result || [];
        let routerList = [
          "https://oss.mytrol.cn/uni_mytrol/img/nft_swiper/nft_bg_1.png",
          "https://oss.mytrol.cn/uni_mytrol/img/nft_swiper/nft_bg_01.png",
          "https://oss.mytrol.cn/uni_mytrol/img/nft_swiper/nft_bg_02.png",
          "https://oss.mytrol.cn/uni_mytrol/img/nft_swiper/nft_bg_03.png",
        ];
        data.forEach((res) => {
          res.imgUrl = this.getIpfsSrc(res.file);
          res.router = this.getIpfsSrc(res.background_file);
        });
        data = data.sort((a, b) => {
          return Number(a.number) - Number(b.number);
        });
        return data;
      };

      let getNftList = async () => {
        let nft_res = await this.$api._get(
          "/dbchain/oracle/nft/lastest_nft/common/1/100"
        );
        let data = nft_res.data.result ? nft_res.data.result : [];
        data.sort(function (a, b) {
          return b.published_at - a.published_at;
        });
        return data;
      };

      let JSONList = async () => {
        let obj = {
          home_swiper: {},
          home_ip: {},
          nft_list: {},
        };
        obj.nft_list = await getNftList();
        obj.home_ip = await getIp();
        obj.home_swiper = await getBanner();

        return obj;
      };
      this.JSONList = await JSONList();
      this.$store.commit("setJSONList", this.JSONList);
      this.$refs.home.navShow(this.JSONList);
      uni.stopPullDownRefresh();
    },
    // 通知子组件，我到底了
    lower(name = "home") {
      this.$refs[name].lower();
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
._nav_index {
  // width: 100vw;
  // height: 44px;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #000;
  overflow: hidden;
  // height: 100vh;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
  font-family: Roboto-Medium, Roboto;
  font-weight: 500;
  letter-spacing: inherit;
}

._cont {
  height: calc(100vh - 146px);
}

._NAV {
  display: flex;
  height: 76px;
  width: 100%;
  justify-content: space-evenly;
  background: #000000e6;

  ._check {
    line-height: 76px;
    min-width: 25%;
    justify-content: center;
    display: flex;

    ._img {
      image {
        width: 46px;
        height: 46px;
      }
    }

    ._block {
      text-align: center;
    }
  }

  ._tab {
    position: relative;

    ._img {
      width: 24px;

      image {
        width: 100%;
        height: 22px;
      }
    }

    ._block {
      height: 14px;
      font-size: 10px;
      font-weight: 400;
      color: #7d7d7d;
      color: #7d7d7d;
      position: absolute;
      top: 20px;
    }
  }

  ._add {
    ._img {
      line-height: normal;
      position: relative;
      top: calc((75px - 46px) / 2);

      image {
        top: 0;
      }
    }
  }
}
</style>
