<template>
  <view class="_list" :class="[NFT_item.nft_total_number>1?'_more_list':'']">
    <view class="time-box" v-if="isShowTime(NFT_item.opening_time)">
      <image
        class="time-img"
        src="https://oss.mytrol.cn/uni_mytrol/icon/time.png"
        mode=""
      ></image>
      <text>即将开售</text>
      <text>{{ getTime(NFT_item.opening_time) }}</text>
    </view>
    <view class="sold-out" v-if="NFT_item.counter_sold_nft &&  Number(NFT_item.counter_sold_nft) >= Number(NFT_item.number)" >
      <text>已售罄</text>
    </view>
	
	<view class="_img-obscuration" v-if="NFT_item.counter_sold_nft &&  Number(NFT_item.counter_sold_nft) >= Number(NFT_item.number)">
	  <image
	    v-if="NFT_item.file"
	    :src="
	      getIpfsSrc(
	        NFT_item.file_thumbnail ? NFT_item.file_thumbnail : NFT_item.file
	      )
	    "
	    mode="aspectFill"
	  ></image>
	</view>
	
    <view class="_img" v-else>
      <image
        v-if="NFT_item.file"
        :src="
          getIpfsSrc(
            NFT_item.file_thumbnail ? NFT_item.file_thumbnail : NFT_item.file
          )
        "
        mode="aspectFill"
      ></image>
      <view class="_type" v-if="type == '1'">
        <time_down :stopTime="NFT_item.opening_time"></time_down>
      </view>
    </view>
    <view class="_header_options" v-if="NFT_item.nft_total_number">
    	<!-- <view class="_img">
    		<image src="https://oss.mytrol.cn/uni_mytrol/icon/my_nft_option_icon_center.png" mode="">
    		</image>
    		<view class="_text">
    			{{ NFT_item.nft_number[0] ? NFT_item.nft_number[0] : "" }}
    		</view>
    	</view> -->
		<view class="_nft_num" v-if="NFT_item.nft_total_number>1">
			<view class="_icon">
				<image src="http://oss.mytrol.cn/uni_mytrol/icon/my_nft_num.png" mode=""></image>
			</view>
			<view class="_t1">
				拥有{{NFT_item.nft_total_number}}份
			</view>
		</view>
    </view>
	<view class="_footer">
      <view class="_block" :class="[NFT_item.price?'':'_maxW_block']">
        <view class="_tit _one_omit">{{ NFT_item.name }}</view>
        <view class="_user">
          <view class="_avater">
            <image
              :src="getIpfsSrc(NFT_item.avatar)"
              mode=""
              class="_avater_img"
            ></image>
            <image :src="hot" mode="widthFix" class="_hot"></image>
          </view>
          <view class="_name _one_omit">
            {{ NFT_item.nickname }}
          </view>
        </view>
      </view>
      <view class="_price" v-if="NFT_item.price">
        <view class="_numb"> ¥ {{ NFT_item.price }} </view>

        <view
          class="_limit"
          v-if="NFT_item.free_number && getFreeNum(NFT_item) > 0"
        >
          <view class="_t1"> 限免 </view>
          <view class="_t2">
            {{ getFreeNum(NFT_item) }}
          </view>
        </view>
        <view v-else>
			<view v-if="(NFT_item.number - NFT_item.counter_sold_nft)>0" class="_limit">
				<view class="_t1"> 限量 </view>
				<view class="_t2">
				  {{ (NFT_item.number - NFT_item.counter_sold_nft)>0?(NFT_item.number - NFT_item.counter_sold_nft):0 }}/
				  {{ NFT_item.number }}
				</view>
			</view>
    
			<view class="_t3" v-else>
				已售空
			</view>
        </view>
      </view>
    </view>
	<view class="_border_view" v-if='NFT_item.nft_total_number>1'>
		<view class="_block1"></view>
		<view class="_block2"></view>
	</view>
  </view>
</template>

<script>
import config from "@/js_sdk/general-http/config.js";
import time_down from "./time.vue";
export default {
  name: "nft_list",
  components: {
    time_down,
  },
  props: {
    // nft详情
    NFT_item: {
      required: true,
      default() {
        return {
          name: "", // nft标题
          type: "", // 分类
          use: "", //传作人
          user_avater: "", //创作人头像
          img: "", //nft图片
          price: "", //价格
          num: "", //总量
          dispense: "", //分发（已售出）
          address: "", //地址
          tokenId: "", //
          desc: ``,
          created_at: "",
        };
      },
    },
    preview: {
      default() {
        return [];
      },
    },
    defaultH: {
      default() {
        return "297";
      },
    },
    defaultW: {
      default() {
        return "310";
      },
    },

    // 点击跳转
    link: {
      default() {
        return "";
      },
    },
    // 分类  0：正常 1.即将出售 2.已售完
    type: {
      default() {
        return "0";
      },
    },
  },
  data() {
    return {
      avatar:
        "https://oss.mytrol.cn/uni_mytrol/img/mock/Quirky%20and%20Colourful%20Portrait%20Illustrations%20%E2%80%93%20Fubiz%20Media.png",
      code: "dbcf8fc458aa73fb2b3737176548374c1f6",
      created_at: "1634201871236",
      created_by: "dbchain10cz7fupyw27fkr8cp5dr0dvewqup6nsdjcykyv",
      description:
        "谭文贵（艺名：谭老虎），北京虎翼堂堂主，中国长城书画家协会副会长、长城书画院执行院长、国家一级美术师、军旅书法家。\n其代表作《十二生肖》《一笔虎》和篆书《心经》等书法艺术精品被中国邮政和美国、德国、法国、日本、加拿大、荷兰等欧美12个国家邮政制作成邮票发行。",
      file: "https://oss.mytrol.cn/uni_mytrol/img/mock/Quirky%20and%20Colourful%20Portrait%20Illustrations%20%E2%80%93%20Fubiz%20Media.png",
      id: "15",
      name: "十二生肖：猪",
      nickname: "千画数艺",
      number: "99",
      price: "198",
      published_at: "1634201986898",
      tx_hash:
        "5d13383abb0a490160a3934db362b0ff3e5b4f4171e0ae90bc4206bfaf92c662",
      user_id: "8",
      hot: "https://oss.mytrol.cn/uni_mytrol/img/mock/hot.png",
    };
  },
  methods: {
    getIpfsSrc(url) {
      if (url.indexOf("://") !== -1) {
        return url;
      }
      return config.IpfsUrl + url;
    },
    getFreeNum(NFT_item) {
      return NFT_item.free_number - NFT_item.counter_sold_nft > 0
        ? NFT_item.free_number - NFT_item.counter_sold_nft
        : 0;
    },
    getTime(value) {
      var date = new Date(Number(value) * 1000);
      var y = date.getFullYear(),
        m = date.getMonth() + 1,
        d = date.getDate(),
        h = date.getHours(),
        i = date.getMinutes(),
        s = date.getSeconds();
      if (m < 10) {
        m = "0" + m;
      }
      if (d < 10) {
        d = "0" + d;
      }
      if (h < 10) {
        h = "0" + h;
      }
      if (i < 10) {
        i = "0" + i;
      }
      if (s < 10) {
        s = "0" + s;
      }
      var t = m + "-" + d + " " + h + ":" + i;
      return t;
    },
    isShowTime(time) {
      return new Date().getTime() < Number(time) * 1000;
    },
	
  },
};
</script>

<style lang="scss" scoped>
._list {
  color: #fff;
  width: 100%;
  background: #151515;
  border-radius: 12px;
  // overflow: hidden;
  margin-bottom: 16px;
  position: relative;

  .time-box {
    position: absolute;
    z-index: 1;
    left: 14px;
    top: 14px;
    height: 28px;
    background: #151419;
    border-radius: 20px;
    box-sizing: border-box;
    padding: 2px 4px;
    display: flex;
    align-items: center;
    text {
      font-size: 13px;
      color: #f3be62;
    }

    .time-img {
      width: 20px;
      height: 20px;
      margin-right: 4px;
    }
  }
  .sold-out {
    position: absolute;
    z-index: 1;
    left: 14px;
    top: 14px;
    height: 28px;
	
    background: rgba(0, 0, 0, 0.6);
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
    border-radius: 20px;
    box-sizing: border-box;
    padding: 4px 20px;
    display: flex;
    align-items: center;
    text {
      font-size: 14px;
      font-weight: 500;
      color: #979797;
    }

    .time-img {
      width: 20px;
      height: 20px;
      margin-right: 4px;
    }
  }
  
  ._img-obscuration{
	width: 100%;
	height: 246px;
	position: relative;
	border-radius: 12px 12px 0 0;
	overflow: hidden;
	background: #353535;
	
	image {
	  width: inherit;
	  height: inherit;
	  opacity:0.6; 
	  filter: alpha(opacity=60);
	}
  }

  ._img {
    width: 100%;
    height: 246px;
    position: relative;
    border-radius: 12px 12px 0 0;
    overflow: hidden;
    image {
      width: inherit;
      height: inherit;
    }

    ._type {
      display: flex;
      justify-content: flex-end;
      position: absolute;
      top: 14px;
      right: 14px;
      background: rgba(0, 0, 0, 0.6);
      box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
      border-radius: 8px;
      height: 28px;
      font-size: 14px;
      font-family: SourceHanSansCN-Medium, SourceHanSansCN;
      font-weight: 500;
      color: #ffd36c;
      line-height: 28px;
      padding: 0 8px;
      align-items: center;

      image {
        width: 14px;
        height: 14px;
      }

      view {
        margin-left: 8px;
      }
    }
  }
  ._header_options{
	  display: flex;
	  justify-content: flex-end;
	      position: absolute;
	      top: 14px;
	      width: 96%;
	  ._img {
	  	display: flex;
	  	justify-content: center;
	      width: unset;   
		   height: unset;
	  	image {
	  		width: 34px;
	  		height: 34px;
	  		position: relative;
	  		z-index: 4;
	  		top: -5px;
	  	}
	  
	  	._text {
	  		font-size: 12px;
	  		font-family: PingFangSC-Medium, PingFang SC;
	  		font-weight: 500;
	  		color: #845500;
	  		height: 22px;
	  		border-radius: 6px;
	  		border: 1px solid rgba(255, 255, 255, 0.51);
	  		background: linear-gradient(270deg, #e6ce9c 0%, #c8a063 100%);
	  		border-radius: 6px;
	  		line-height: 22px;
	  		padding: 0 9px 0 18px;
	  		position: relative;
	  		left: -12px;
	  	}
	  }
	  ._nft_num {
		  display: flex;
		  height: 28px;
		  background: rgba(0, 0, 0, 0.6);
		  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
		  border-radius: 8px;
		  align-items: center;
		  padding: 0 10px;
		  ._icon{
			  image{
				 width: 14px;
				  height: 14px;
			  }
		  }
		  ._t1{
			  height: 21px;
			      font-size: 14px;
			      font-family: SourceHanSansCN-Medium, SourceHanSansCN;
			      font-weight: 500;
			      color: #FFD36C;
			      line-height: 21px;
			      margin-left: 6px;
		  }
	  }
  }

  ._footer {
    display: flex;
    justify-content: space-between;

    ._block {
      display: flex;
      flex-wrap: wrap;
      padding: 13px 18px 6px;

      ._tit {
        height: 24px;
        font-size: 16px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #ffffff;
        line-height: 24px;
        margin-bottom: 4px;
        max-width: 410rpx;
      }

      ._user {
        width: 100%;
        display: flex;

        ._avater {
          position: relative;
			min-width: 50px;
          ._avater_img {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            border: 2px solid #2e2e2e;
            object-fit: cover;
            object-position: center center;
          }

          ._hot {
            width: 14px;
            height: 14px;
            position: relative;
            left: -10px;
            top: 2px;
          }
        }

        ._name {
          // padding-left: 12px;
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #f2f2f2;
          line-height: 30px;
          max-width: 290rpx;
        }
      }
    }

	._maxW_block{
		._tit{
			    width: 100%;
			    max-width: 100%;
		}
	}
    ._price {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-end;
      padding-right: 18px;
      padding-bottom: 18px;
	min-width: 92px;
      ._numb {
        width: 100%;
        height: 30px;
        font-size: 20px;
        font-family: Roboto-Medium, Roboto;
        font-weight: 500;
        color: #ffffff;
        line-height: 30px;
        padding: 14px 0px 0 0;
        text-align: right;
        margin-bottom: 4px;
      }

      ._limit {
        height: 20px;
        border-radius: 6px;
        overflow: hidden;
        border: 1px solid #ffbd21;
        display: flex;
        text-align: right;

        ._t1 {
          height: 20px;
          font-size: 10px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #000000;
          line-height: 20px;
          background: #ffbd21;
          padding: 0 3px;
        }

        ._t2 {
          height: 20px;
          font-size: 10px;
          font-family: Roboto-Medium, Roboto;
          font-weight: 500;
          color: #ffbd21;
          line-height: 20px;
          padding: 0 4px;
          min-width: 18px;
          text-align: center;
        }
      }
	  
	  ._t3 {
	  	width: 60px;
	  	height: 20px;
	  	background: #9C9E9C;
	  	border-radius: 6px;
	  	line-height: 20px;
	  	text-align: center;
		font-size: 12px;
		font-weight: 400;
		color: #646464;
	  }
    }
  }
  ._border_view{
  		      position: absolute;
  		      height: inherit;
  		      width: 100%;
  		      z-index: 0;
  		  ._block1{
  			    height: 8px;
  			    background: #232323;
  			    border-radius: 0px 0px 10px 11px;
  			    position: relative;
  			    top: -3px;
  			    width: 97%;
  			    margin: 0 auto;
  		  }
  		  ._block2{
  			 
  			     background: #383838;
  			     border-radius: 0px 0px 12px 12px;
  			     height: 5px;
  			     position: relative;
  			     top: -3px;
  			     width: 92%;
  			     margin: 0 auto;
  
  		  }
  }
}
._more_list{
	margin-bottom: 24px;
}
</style>
