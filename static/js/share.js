import {
  setStore,
  getStore
} from "@/static/js/global.js";
export default {
  data() {
    return {
      noClick: true,
      //设置默认的分享参数
      share: {
        title: "Mytrol数字藏品",
        path: "/pages/index/index",
        imageUrl: "https://oss.mytrol.cn/uni_mytrol/img/share_1.jpg",
        desc: "Mytrol数字藏品",
        content: "Mytrol数字藏品",
      },
    };
  },
  mounted() {
    let userInfo = getStore("userInfo")
    //#ifdef MP-WEIXIN
    if (!userInfo.my_code) {
      return uni.hideShareMenu()
    }
    return uni.showShareMenu()
    //#endif
  },


  onShareAppMessage(res) {
    let NFT_item = this.NFT_item ? this.NFT_item : {};
    let id = NFT_item.denom_id ? NFT_item.denom_id : NFT_item.id;

    let userInfo = getStore("userInfo") || {
      my_code: ""
    };
    let isUserInfo = userInfo.my_code ? userInfo.my_code : "";
    let path = id ?
      `/pages/nft_option/nft_option?id${id}=${isUserInfo}` :
      `/pages/index/index?code=${isUserInfo}`;
    this.share.path = path;

    return {
      title: this.share.title,
      path: this.share.path,
      imageUrl: this.share.imageUrl,
      desc: this.share.desc,
      content: this.share.content,
      success(res) {
        uni.showToast({
          title: "分享成功",
        });
      },
      fail(res) {
        uni.showToast({
          title: "分享失败",
          icon: "none",
        });
      },
    };
  },
  onShareTimeline(res) {
    let NFT_item = this.NFT_item ? this.NFT_item : {};

    let id = NFT_item.denom_id ? NFT_item.denom_id : NFT_item.id;

    let userInfo = getStore("userInfo") || {
      my_code: ""
    };
    let isUserInfo = userInfo.my_code ? userInfo.my_code : "";
    let path = id
    id15 = '123456' ?
      `/pages/nft_option/nft_option?id${id}=${isUserInfo}` :
      `/pages/index/index?code=${isUserInfo}`;
    this.share.path = path;
    return {
      title: this.share.title,
      path: this.share.path,
      imageUrl: this.share.imageUrl,
      desc: this.share.desc,
      content: this.share.content,
      success(res) {
        uni.showToast({
          title: "分享成功",
        });
      },
      fail(res) {
        uni.showToast({
          title: "分享失败",
          icon: "none",
        });
      },
    };
  },
};
