<template>
	<view  class="action" >
		<view class='cuIcon-cu-image  justify-center' style="display: flex;" >
			<image style="height: 44rpx;width: 44rpx;" 
			:style="{height:(tabBar.iconHight == undefind || tabBar.iconHight == '') ? '': tabBar.iconHight,
			width: (tabBar.iconWidth == undefind || tabBar.iconWidth == '') ? '': tabBar.iconWidth}" 
			:src="curKey == item.key ? item.selectedIconPath:item.iconPath"></image>
		</view>
		<view style="display: flex; height: 8rpx;"  :style="(tabBar.intervalHight == undefind || tabBar.intervalHight == '') ? '': 'height: '+tabBar.intervalHight"></view>
		<view :style="{color:curKey == item.key ? tabBar.selectedColor:tabBar.color,
		'font-size':(tabBar.fontSize == undefind || tabBar.fontSize == '')?'':tabBar.fontSize}" >{{item.text}}</view>
	</view>
</template>

<script>
	export default {
		props:{
			curKey:{
				default:'home',
				type:String
			},
			item:{
				default:{
							key: "home",
							iconPath: "https://oss.mytrol.cn/uni_mytrol/icon/home_default.png",
							selectedIconPath: "https://oss.mytrol.cn/uni_mytrol/icon/home_active.png",
							text: "首页",
					
				}, //
				type:Object 
			},
			tabBar:{
				
			}
		}
	}
</script>

<style >
	.action {
		font-size: 22rpx;
		position: relative;
		flex: 1;
		text-align: center;
		padding: 0;
		display: block;
		height: auto;
		line-height: 1;
		margin: 0;
		background-color: inherit;
		overflow: initial;
	}
	.action .cuIcon-cu-image {
		margin: 0 auto;
	}
	.cu-bar {
		display: flex;
		position: relative;
		align-items: center;
		min-height: 104rpx;
		justify-content: space-between;
	}
	
	.cu-bar.tabbar {
		padding: 0;
		/* height: calc(104rpx + env(safe-area-inset-bottom) / 2); */
		/* padding-bottom: calc(env(safe-area-inset-bottom) / 2); */
	}
	
	.bg-white {
		background-color: #ffffff;
		color: #666666;
	}
	
	.cu-bar.tabbar.shadow {
		box-shadow: 0 -1rpx 6rpx rgba(0, 0, 0, 0.1);
	}
	
	.cu-bar.foot {
		position: absolute;
		width: 100%;
		left: 0;
		bottom: 0;
		z-index: 1024;
		box-shadow: 0 -1rpx 6rpx rgba(0, 0, 0, 0.1);
	}
	
	.flex-direction {
		flex-direction: column;
	}
	
	.flex {
		display: flex;
	}
	
	.justify-between {
		justify-content: space-between;
	}
	
	.align-center {
		align-items: center;
	}
	.justify-center {
		justify-content: center;
	}
	
	.cu-bar.tabbar .action {
		font-size: 22rpx;
		position: relative;
		flex: 1;
		text-align: center;
		padding: 0;
		display: block;
		height: auto;
		line-height: 1;
		margin: 0;
		background-color: inherit;
		overflow: initial;
	}
	
	
	.cu-bar.tabbar.shadow {
		box-shadow: 0 -1rpx 6rpx rgba(0, 0, 0, 0.1);
	}
	.cu-bar.tabbar .action .cuIcon-cu-image {
		margin: 0 auto;
	}
</style>
