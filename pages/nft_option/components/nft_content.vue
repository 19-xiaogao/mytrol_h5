<template>
	<view class="nft_content">
		<view class="_head">
		  <view class="_t1"> 选择NFT编号 </view>
		  <view class="_icon" @click="closeLogs()">
		    <image
		      src="https://oss.mytrol.cn/uni_mytrol/icon/give_logs_close.png"
		      mode=""
		    ></image>
		  </view>
		</view>
		<view class="_cont">
		  <view class="_list" v-for="(item, index) in NFT_item.nft_number" :key="index" @click="changeNFT(index)">
		    <view class="_item">
		      <view class="_t1"><image src="https://oss.mytrol.cn/uni_mytrol/icon/my_nft_option_icon_center.png" mode=""></image></view>
		      <view class="_t2">{{item}}</view>
		    </view>
		  </view>
		</view>
	</view>
	
</template>

<script>

export default {
  props: {
    NFT_item: {
      required: true,
    },
  },
  data() {
    return {
      give_logs: [],
	  nft_contents:['1','2','2']
    };
  },
  mounted() {

  },
  methods: {
    closeLogs() {
      uni.$emit("closeLogs");
    },
changeNFT(num){
	uni.$emit("changeNFT",num);
}
    
  },
};
</script>

<style lang="scss" scoped>
	.nft_content{
		._head {
		  height: 61px;
		  display: flex;
		  align-items: center;
		  justify-content: space-between;
		  // width: 100%;
		  padding: 0 12px 0 23px;
		  ._t1 {
		    height: 20px;
		    font-size: 16px;
		    font-family: PingFangSC-Medium, PingFang SC;
		    font-weight: 500;
		    color: #ffffff;
		    line-height: 20px;
		  }
		  ._icon {
		    image {
		      width: 40px;
		      height: 40px;
		    }
		  }
		}
		._cont {
		  width: calc(100% - 24px);
		 
		  border-radius: 12px;
		  max-height: 480px;
		  overflow-y: auto;
		  margin: 0 auto;
		  padding-bottom: 35px;
		  ._list {
		    margin-bottom: 20px;
			background: #1E1E1E;
			border-radius: 12px;
		    ._item {
		      display: flex;
		     height: 60px;
		     background: #1E1E1E;
		     border-radius: 12px;
			 margin-bottom: 12px;    align-items: center;
		      ._t1 {
				      padding: 0 18px;
			
				image{
				   width: 34px;
				   height: 34px;
			   }
		      }
		      ._t2 {
		        height: 24px;
		        font-size: 16px;
		        font-family: PingFangSC-Medium, PingFang SC;
		        font-weight: 500;
		        color: #FFFFFF;
		        line-height: 24px;
		        width: calc(100% - 140px);
		        word-wrap: break-word;
				    text-align: center;
		      }
		    }
		  }
		}
	}
</style>
