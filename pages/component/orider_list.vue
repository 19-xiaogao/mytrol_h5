<template>
  <view class="_orider_list">
    <oriderItem
      class="_list"
      v-for="(item, index) in orider_List"
      :NFT_item="item"
      :key="index"
    ></oriderItem>

    <view class="_null_data" v-if="orider_List.length < 1">
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
import oriderItem from "./orider_item.vue";

export default {
  components: {
    oriderItem,
  },
  data() {
    return {
      // orider_List: [],
    };
  },
  computed:{
	  orider_List(){
		  return this.$store.state.orderList||[];
	  }
  },
  mounted() {
	  console.log(this.$store.state.orderList)
	  // if(!this.$store.state.orderList){
		 //  this.getJsonData();
	  // }
    this.getJsonData();
  },
  methods: {
    // 获取json数据
    async getJsonData() {
      // 已购买
      let collected_res = await this.$api._get(
        `/dbchain/oracle/nft/user_purchase_order`
      );
		console.log(collected_res, 'collected_res')
      let orider_List = collected_res.data.result;
      if (orider_List) {
		orider_List = orider_List.reverse();
		this.$store.commit('setOrderList',orider_List)
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
._orider_list {
  padding: 0 12px;
  padding-bottom: 20px;

  ._list {
    // margin-bottom: 10px;
    // padding: 12px;
  }
}
</style>
