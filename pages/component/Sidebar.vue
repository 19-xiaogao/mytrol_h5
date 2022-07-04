<template>
  <view class="side_bar">
    <view
      class="el"
      v-for="item in sideBar"
      :key="item.id"
      @click="handlePathClick(item)"
    >
      <view class="icon">
        <img :src="item.icon" />
      </view>
      <span class="span">{{ item.name }}</span>
    </view>
  </view>
</template>

<script>
const sideBar = [
  {
    name: "我的订单",
    icon: "https://mytrol-pub.oss-cn-shenzhen.aliyuncs.com/mytrol/system/order.png",
    path: "/pages/order/index",
    id: 1,
  },
  {
    name: "转赠记录",
    icon: "https://mytrol-pub.oss-cn-shenzhen.aliyuncs.com/mytrol/system/transfer.png",
    path: "/pages/transfer_log/index",
    id: 2,
  },
  {
    name: "实名认证",
    icon: "https://mytrol-pub.oss-cn-shenzhen.aliyuncs.com/mytrol/system/auth.png",
    path: "",
    id: 3,
  },
  {
    name: "分享H5",
    icon: "https://mytrol-pub.oss-cn-shenzhen.aliyuncs.com/mytrol/system/shareH5.png",
    path: "",
    id: 4,
  },
];
import { getStore } from "@/static/js/global.js";

export default {
  data() {
    return { sideBar };
  },
  methods: {
    handlePathClick(item) {
      if (item.path) {
        this.$router.push(item.path);
      } else {
        uni.showToast({
          title: "敬请期待",
          duration: 5000,
          icon: "none",
        });
      }
      if (item.id === 4) {
        const myCode = this.getMyCode();
        console.log(myCode);
        if (myCode === "") {
          return uni.showToast({
            title: "你的邀请码为空",
            duration: 5000,
            icon: "none",
          });
        }
        const is_development = process.env.NODE_ENV === "development";
        const invitationCode = is_development
          ? window.origin +
            "/h5/#/pages/login/register?invitationCode=" +
            myCode
          : window.origin + "/#/pages/login/register?invitationCode=" + myCode;
        uni.setClipboardData({
          data: invitationCode,
          success: () => {
            uni.showToast({
              //提示
              title: "复制成功,将链接分享给好友",
            });
          },
        });
      }
    },
    getMyCode() {
      try {
        let userInfoLocal = getStore("userInfo");
        return userInfoLocal.my_code;
      } catch (error) {
        return "";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.side_bar {
  width: 95%;
  margin: 0 auto;
  margin-bottom: 10px;
  height: 94px;
  border-radius: 12px;
  border: 1px solid #c6c6c6;
  display: flex;
  justify-content: space-between;
  .el {
    width: 25%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .icon {
      width: 30px;
      height: 30px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .span {
      margin-top: 10px;
      font-size: 14px;
      font-weight: 300;
      color: #999999;
    }
  }
}
</style>