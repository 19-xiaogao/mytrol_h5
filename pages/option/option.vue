<template>
  <view class="_option">
    <image v-if :src="imgUrl" mode="widthFix"></image>
	<view class="_equity_code" v-if="equityCode">
		<view class="_t1">
			{{equityCode}}
		</view>
		<view class="_header">
			<view class="_btn" @click="copy(equityCode)">
				复制兑换码
			</view>
			<view class="_btn" @click="linkToRedeem(equityCode)">
				前往兑换
			</view>
		</view>
		
	</view>
  </view>
</template>

<script>
	import {
		uni_copy
	} from "@/static/js/global.js";
export default {
  data() {
    return {
      imgUrl: "",
      title: "",
	  equityCode:'',
	  nft_id:'',
	  nft_denom_id:''
    };
  },
  onLoad(option) {
	  console.log(option)
    if (option.img) {
      this.imgUrl = option.img;
      this.title = option.title || "";
     
    }
    if (option.title && option.title !== "undefined") {
      uni.setNavigationBarTitle({
        title: option.title,
      });
    }
	if(option.id&&option.denom_id){
		this.nft_id=parseInt(option.id);
		this.nft_denom_id=option.denom_id;
		this.getidToJson()
	}
	
  },
  onPullDownRefresh() {
  	console.log("下拉");
  	if(this.nft_id&&this.nft_denom_id){
		return this.getidToJson()
	}

  },
  methods:{
	  copy(val){
		  return uni_copy(val)
	  },
	  linkToRedeem(val){
		this.copy(val)
		uni.navigateToMiniProgram({
			appId:'wx9da88f4c7e530148',
			path:'pages/transfer_page?station_id=ff8080817e2ae28b017e7538810460ee&path=%2Fpages_mine%2Fexchange_coupon',
			success:res=>{
				console.log(res)
			},
			fail:err=>{
				console.log(err)
			}
		})  
	  },
	  async getidToJson(){
	  	let res=await this.$api._get('https://oss.mytrol.cn/uni_mytrol/mytrolRedeem.json')
	  	console.log(res)
		let data=res.data;
		if(res){
			uni.stopPullDownRefresh();
			uni.hideLoading();
			data[this.nft_denom_id]?this.equityCode=data[this.nft_denom_id][this.nft_id]:'';
		}
		console.log(data)
	  }
  }
};
</script>

<style lang="scss" scoped>

._option {
  width: 100vw;
  background-color: #1c1c1c;
  min-height: 100vh;


  image {
    width: inherit;

  }
  
  ._equity_code{
	display: flex;
	    justify-content: space-between;
	    padding:22px 14px;
		    align-items: center;
	._t1{
		height: 20px;
		font-size: 16px;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
		line-height: 20px;
	}
	._header{
		display: flex;
		
	._btn{
			 height: 32px;
			 background: #E9B466;
			 border-radius: 8px; 
			 line-height: 32px;
			 font-size: 12px;
			 font-family: PingFangSC-Medium, PingFang SC;
			 font-weight: 500;
			 color: #FFFFFF;
			     padding: 0 10px;
			     margin-left: 6px;
	}	
	}
	  
  }
}
</style>
