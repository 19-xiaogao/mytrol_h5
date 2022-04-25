<template>
  <view class="_buy_cont">
    <nft-list
      class="_nft_list"
      v-for="(item, index) in NFT_List"
      :key="index"
      :NFT_item="item"
      defaultH="270"
      defaultW="310"
    >
    </nft-list>
    <view class="_null_data" v-if="NFT_List.length < 1"> 暂未收藏NFT </view>
  </view>
</template>

<script>
let _self;
import nftList from "@/components/nft_list/nft_list.vue";
import { setStore, getStore, plusXing, uni_copy } from "@/static/js/global.js";
export default {
  components: {
    nftList,
  },
  data() {
    return {
      NFT_List: [],
    };
  },

  mounted() {
    console.log("option111111111111111111");
    this.getJsonData();
  },
  onLoad(option) {},
  methods: {
    // 获取json数据
    async getJsonData() {
      // 收藏
      let collected_res = await this.$api._get(
        `/dbchain/oracle/nft/user_collect/${getStore("user_id")}/detail`
      );
      let collected_data = collected_res.data.result;
      if (collected_data) {
        this.NFT_List = collected_data.reverse();
      }
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
  },
};
</script>

<style lang="scss" scoped>
._buy_cont {
  width: 93.6vw;
  margin: 0 auto;
  ._null_data {
    color: #fff;
    text-align: center;
    padding-top: calc((100vh - 340px) / 2);
  }
}
</style>
