<template>
	<view>
		<block v-if="mode == '2'">
			<cover-view  class="cu-bar tabbar bg-white  foot flex-direction"
			:style="{'box-shadow':(tabBar.boxShadow == undefined || tabBar.boxShadow == '') ? '': tabBar.boxShadow,
			'background':(tabBar.tabBarBackground == undefined || tabBar.tabBarBackground == '') ? '': tabBar.tabBarBackground}">
				<!-- <cover-view style="flex-shrink: 0; height: 2px; width: 100%;background-color: #F2F2F2;"></cover-view> -->
				<cover-view class="flex justify-between align-center" style="width: 100%;height: 104rpx;"
				 :style="(tabBar.tabBarHight == undefined || tabBar.tabBarHight == '') ? '': 'height: '+tabBar.tabBarHight">
					<cover-view v-for="(item,index)  in tabBar.list" class="action" @click="NavChange(item.key)" :key="index" >
						<cover-view class='cuIcon-cu-image  justify-center' style="display: flex;" >
							<cover-image style="height: 44rpx;width: 44rpx;" 
							:style="{height:(tabBar.iconHight == undefined || tabBar.iconHight == '') ? '': tabBar.iconHight,
							width: (tabBar.iconWidth == undefined || tabBar.iconWidth == '') ? '': tabBar.iconWidth}" 
							:src="curKey == item.key ? item.selectedIconPath:item.iconPath"></cover-image>
						</cover-view>
						<cover-view style="display: flex; height: 8rpx;"  :style="(tabBar.intervalHight == undefined || tabBar.intervalHight == '') ? '': 'height: '+tabBar.intervalHight"></cover-view>
						<cover-view :style="{color:curKey == item.key ? tabBar.selectedColor:tabBar.color,
						'font-size':(tabBar.fontSize == undefined || tabBar.fontSize == '')?'':tabBar.fontSize}" >{{item.text}}</cover-view>
					</cover-view>
				</cover-view>
			</cover-view>
		</block>
		
		<block v-if="mode == '1'">
			<view  class="cu-bar tabbar bg-white shadow foot flex-direction" 
			:style="{'box-shadow':(tabBar.boxShadow == undefined || tabBar.boxShadow == '') ? '': tabBar.boxShadow,
			'background':(tabBar.tabBarBackground == undefined || tabBar.tabBarBackground == '') ? '': tabBar.tabBarBackground}">
				<view class="flex justify-between align-center" style="width: 100%;height: 104rpx;" 
				 :style="(tabBar.tabBarHight == undefined || tabBar.tabBarHight == '') ? '': 'height: '+tabBar.tabBarHight">
					<sj_tab_bar :tabBar="tabBar" :curKey="curKey" :item='item' v-for="(item,index)  in tabBar.list" class="action" @click="NavChange(item.key)" :key="index"></sj_tab_bar>
					<!-- <view v-for="(item,index)  in tabBar.list" class="action" @click="NavChange(item.key)" :key="index" >
						<view class='cuIcon-cu-image  justify-center' style="display: flex;" >
							<image style="height: 44rpx;width: 44rpx;" 
							:style="{height:(tabBar.iconHight == undefined || tabBar.iconHight == '') ? '': tabBar.iconHight,
							width: (tabBar.iconWidth == undefined || tabBar.iconWidth == '') ? '': tabBar.iconWidth}" 
							:src="curKey == item.key ? item.selectedIconPath:item.iconPath"></image>
						</view>
						<view style="display: flex; height: 8rpx;"  :style="(tabBar.intervalHight == undefined || tabBar.intervalHight == '') ? '': 'height: '+tabBar.intervalHight"></view>
						<view :style="{color:curKey == item.key ? tabBar.selectedColor:tabBar.color,
						'font-size':(tabBar.fontSize == undefined || tabBar.fontSize == '')?'':tabBar.fontSize}" >{{item.text}}</view>
					</view> -->
				</view>
			</view>
		</block>
		
		<!-- 中间加logo -->
		<block v-if="mode == '3'">
			<view  class="cu-bar tabbar bg-white shadow foot flex-direction" 
			:style="{'box-shadow':(tabBar.boxShadow == undefined || tabBar.boxShadow == '') ? '': tabBar.boxShadow,
			'background':(tabBar.tabBarBackground == undefined || tabBar.tabBarBackground == '') ? '': tabBar.tabBarBackground}">
				<view class="flex justify-between align-center" style="width: 100%;height: 104rpx;" 
				 :style="(tabBar.tabBarHight == undefined || tabBar.tabBarHight == '') ? '': 'height: '+tabBar.tabBarHight">
					<sj_tab_bar :tabBar="tabBar" :curKey="curKey" :item='tabBar.list[0]'  class="action" @click="NavChange(tabBar.list[0].key)"></sj_tab_bar>
					<view class="_logo" v-if="tabBar.logo.src">
						<image :style="{height:(tabBar.logo.height == undefined || tabBar.logo.height == '') ? '': tabBar.logo.height,
							width: (tabBar.logo.width == undefined || tabBar.logo.width == '') ? '': tabBar.logo.width}"  :src="tabBar.logo.src" mode=""></image>
					</view>
					<sj_tab_bar :tabBar="tabBar" :curKey="curKey" :item='tabBar.list[1]' class="action" @click="NavChange(tabBar.list[1].key)"></sj_tab_bar>
					<!-- <view v-for="(item,index)  in tabBar.list" class="action" @click="NavChange(item.key)" :key="index" >
						<view class='cuIcon-cu-image  justify-center' style="display: flex;" >
							<image style="height: 44rpx;width: 44rpx;" 
							:style="{height:(tabBar.iconHight == undefined || tabBar.iconHight == '') ? '': tabBar.iconHight,
							width: (tabBar.iconWidth == undefined || tabBar.iconWidth == '') ? '': tabBar.iconWidth}" 
							:src="curKey == item.key ? item.selectedIconPath:item.iconPath"></image>
						</view>
						<view style="display: flex; height: 8rpx;"  :style="(tabBar.intervalHight == undefined || tabBar.intervalHight == '') ? '': 'height: '+tabBar.intervalHight"></view>
						<view :style="{color:curKey == item.key ? tabBar.selectedColor:tabBar.color,
						'font-size':(tabBar.fontSize == undefined || tabBar.fontSize == '')?'':tabBar.fontSize}" >{{item.text}}</view>
					</view> -->
				</view>
			</view>
		</block>
		
	</view>
</template>

<script>
	let _self;
	import sj_tab_bar from './sj-tab-item.vue'
	export default {
		components:{
			sj_tab_bar
		},
		data() {
			return {
				curKey:''
			};
		},
		props:{
			tabBar:{
				default:{
					color: "#aaaaaa", //显示的颜色
					selectedColor: "#FFBD21", //选中时的颜色
					fontSize: "", //字体大小 默认22rpx
					iconWidth: "28px", //图标宽度 默认44rpx
					iconHight: "28px", //图标高度 默认44rpx
					intervalHight: "", //图标与文字直接的间隔 默认8rpx
					tabBarHight: "76px", //1.没有苹果底部黑条时  默认104rpx 2.有苹果黑条时 104rpx +苹果黑条高度
					tabBarBackground: "rgba(0, 0, 0, 1)", //底部背景色
					boxShadow: "", //仅模式1 有效 默认  0 -1rpx 6rpx rgba(0, 0, 0, 0.1)
					list: [], //tab 列表
					logo: {
						width: "46px",
						height: "46px",
						src: "https://oss.mytrol.cn/uni_mytrol/icon/create.png",
					}, //用于mode为3时  即两个tab加中间自定义logo的布局
				}, //
				
				type:Object 
			},
			mode:{
				default:"1", //模式1 普通  模式2 特殊 模式3:用于三个tab且中间为指定log 如加号等 小程序 可以盖过原生组件层级高的问题
				type:String
			},
			tabkey:{
				default:'home'
			}
		},
		watch:{
			tabBar:{
				handler(newVal,oldVal){
					for(let i = 0;i < newVal.list.length;i++){
						if(i == 0){
							this.curKey = newVal.list[i].key
							break;
						}
					}
				},
				immediate: true,
				deep: true
			},
			tabkey:{
				handler(newVal,oldVal){
					this.NavChange(newVal)
				}
			}
		},
		created() {
			_self = this
			_self.getContentHeight();
		},

		methods:{
			
			NavChange: function(e) {//切换tbar
				_self.curKey = e
				_self.$emit("change",this.curKey)
			},
			getContentHeight(){
				uni.getSystemInfo({
				    success: function (res) {
						 let info = uni.createSelectorQuery().in(_self).select(".cu-bar");

						 	info.boundingClientRect(function(data) { //data - 各种参数
						 				if(data != null){
						 					let navHeight = res.windowHeight - data.top
						 					_self.height = 'height:'+ (res.windowHeight - navHeight) + 'px'
						 					_self.$emit("fatherHeight",_self.height)
						 				}else{
						 					_self.getContentHeight();
						 				}
						 				
						 	　　    })	  
			
					　　　  　
				    },
					fail:function(res){
						_self.getContentHeight();
					}
				});
				  
			},
		}
	}
</script>

<style>
	
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
