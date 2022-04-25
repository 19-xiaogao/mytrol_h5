<template>
  <view class="_swiper_option">
    <view class="_bg">
      <image v-if="bg_img" :src="bg_img" mode="widthFix"></image>
    </view>
    <view class="_list_cont">
      <nft-list
        class="_nft_list"
        v-for="(item, index) in NFT_List"
        :key="index"
        :NFT_item="item"
        defaultH="270"
        defaultW="310"
        :link="`/buynft?id=${item.id}`"
        @click="linkTo(`/pages/nft_option/nft_option?id=${item.id}`)"
      >
      </nft-list>
    </view>
  </view>
</template>

<script>
let _self;
import nftList from "../../components/nft_list/nft_list.vue";
export default {
  components: {
    nftList,
  },
  data() {
    return {
      NFT_List: [],
      bg_img: "",
      ip: "",
    };
  },
  onLoad(option) {
    _self = this;
    this.bg_img = option.img;
	console.log(option.id)
    this.ip = option.id=='common'?'':option.id;
    this.getJsonData();
  },
  methods: {
    // 获取json数据
	
    async getJsonData() {
		if(this.ip)return false;
      let res = await this.$api._get(
        `/dbchain/oracle/nft/lastest_nft/${this.ip}/1/100`
      );
      this.NFT_List = res.data.result;
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
      	return this.$router.push(url)
      //#endif
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
._swiper_option {
  background-color: #1c1c1c;
  min-height: 100vh;

  ._bg {
    width: 100vw;

    image {
      width: inherit;
    }
  }

  ._list_cont {
    width: 93.6vw;
    margin: 0 auto;
    position: relative;
    top: -40vh;

    ._nft_list {
      // margin-bottom: 16px;
    }
  }
}
</style>
