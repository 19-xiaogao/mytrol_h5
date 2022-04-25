<template>
	<view class="_redeem">
		<view class="_card">
			<image src="http://oss.mytrol.cn/uni_mytrol/icon/redeem_card.png" mode="widthFix"></image>
		</view>
		<view class="_cont">
			<view class="_t1">
				兑换中心
			</view>
			<view class="_t2">用于兑换藏品或赠品藏品等</view>
		</view>
		<view class="input-box">
			<input type="text" v-model="redeemCode" placeholder-class="placeholder_class" name=""
				placeholder="请输入兑换码" id="" />
			<text class="_paste" @click="paste()"> 粘贴 </text>
		</view>
		
		<view class="_foot_btn" @click="redeemNft()">
			立即兑换
		</view>
	</view>
</template>

<script>
	let that;
	export default {
		data(){
			return {
				redeemCode:''
			}
		},
		onLoad(){
			that=this;
		},
		methods:{
			paste() {
				uni.getClipboardData({
					success: function(res) {
						that.redeemCode = res.data;
					},
				});
			},
			async redeemNft(){
				if(!this.redeemCode)return false;
				let params={
					redeemCode:this.redeemCode
				};
				let res = await that.$api._post(
					"/dbchain/oracle/nft/redeem_free",
					params
				);
				
				if(res.data.result?.order_id){
						return uni.reLaunch({
							url: "/pages/index/index?key=main",
						});
					
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	._redeem{
		    background: rgba(28, 28, 28, 1);
		    height: calc(100vh - 39px);
			position: relative;
			padding-top: 39px;
		._card{
			    width: calc(100% - 48px);
			    margin: 0 auto;
				    height: 119px;
				    overflow: hidden;
				image{
					    width: 100%;
				}
		}
		._cont{    margin-bottom: 18px;
		margin-top: 32px;
		    padding: 0 30px;
			._t1{
				font-size: 18px;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #FFFFFF;
				line-height: 25px;
				    margin-bottom: 6px;
			}
			._t2{
				font-size: 14px;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #595959;
				line-height: 20px;
			}
		}
		
		.input-box {
			    display: flex;
			    align-items: center;
			    height: 56px;
			    background: #232323;
			    border-radius: 8px;
			    width: calc(100% - 36px);
			    margin: 0 auto;position: relative;
				input{
					padding: 0 18px;
					width: 90%;
				}
				text{
					font-size: 14px;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #FFD36C;    position: absolute;
					right: 20px;
				}
		}
		._foot_btn{
			width: calc(100% - 50px);
			
			position: absolute;
			height: 50px;
			background: #FFBD21;
			border-radius: 8px;
			font-size: 16px;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #FFFFFF;
			line-height: 50px;
			left: 25px;
			bottom: 58px;
			text-align: center;
		}
	}
	
</style>
