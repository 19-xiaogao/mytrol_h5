<template>
  <view class="side_bar">
    <view class="el" v-for="item in sideBar" :key="item.id">
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
    path: "",
    id: 1,
  },
  {
    name: "转赠记录",
    icon: "https://mytrol-pub.oss-cn-shenzhen.aliyuncs.com/mytrol/system/transfer.png",
    path: "",
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

export default {
  data() {
    return { sideBar };
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