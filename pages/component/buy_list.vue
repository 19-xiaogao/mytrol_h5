<template>
  <view class="_buy_cont">
    <nft-list
      class="_nft_list"
      v-for="(item, index) in NFT_List"
      :key="index"
      :NFT_item="item"
      defaultH="270"
      defaultW="310"
      @click.native="linkTo(`/pages/nft_option/my_nft_option?id=${item.denom_id}`)"
    >
    </nft-list>
    <view class="_null_data" v-if="NFT_List.length < 1">
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
let _self;
import nftList from "@/components/nft_list/nft_list.vue";
import { setStore, getStore, plusXing, uni_copy } from "@/static/js/global.js";
export default {
  components: {
    nftList,
  },
  data() {
    return {
      // NFT_List: [],
    };
  },

  mounted() {
    this.getJsonData();
  },
  computed:{
	  NFT_List(){
		  console.log(this.$store.state)
		  console.log(this.$store.state.buy_nft)
		  return this.$store.state.buy_nft||[]; 
	  }
  },
  onLoad(option) {},
  methods: {
    // 获取json数据
    async getJsonData() {
      // 已购买
      let collected_res = await this.$api._get(
        `/dbchain/oracle/nft/nfts_of_user_buy_new`
      );
      let collected_data = collected_res.data.result;
      if (collected_data) {
        let NFT_List = collected_data.reverse();
		uni.stopPullDownRefresh();
		this.$store.commit('setBuyList',NFT_List)
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
</style>
