<template>
	<view class="_nft_option">
		<uni-nav-bar left-img="https://oss.dbchain.cloud/uni_mytrol_applet/icon/back.png" left-img-h="40px"
			left-img-w="40px" fixed="true" color="#ffffff" backgroundColor="#1C1C1C" title=" " class="_nav_index"
			:statusBar="true" @clickLeft="clickLeft()"></uni-nav-bar>

		<view v-show="NFT_item.file">
			<option_template :NFT_item="NFT_item">
				<template v-slot:footer>
					<!-- <seeimg ref="mychild" :imgurl="getIpfsSrc(NFT_item.file)" /> -->
					<view class="_share_flex" :class="[
            isGif(getIpfsSrc(NFT_item.file), null) ? '_fot_img_share' : '',
          ]">
						<button open-type="share" class="_share_btn">
							<image src="https://oss.mytrol.cn/uni_mytrol/icon/my_nft_option_share.png" mode="">
							</image>
						</button>
					</view>
					<view class="_footer" :class="[
            isGif(getIpfsSrc(NFT_item.file), null) ? '_fot_img_gif' : '',
          ]">
						<view class="_fot_img" :class="[isGif(getIpfsSrc(NFT_item.file),null)?'_gif_fot':'']">
							<image :src="isGif(getIpfsSrc(NFT_item.file), 'img_foot')" mode="">
							</image>
						</view>
					</view>
				</template>
			</option_template>

			<view class="_content">
				<view class="_user_block">
					<view class="_icon_l">
						<image src="https://oss.dbchain.cloud/uni_mytrol_applet/icon/my_nft_option_icon_left.png"
							mode="">
						</image>
					</view>
					<view class="_tit">
						<view class="_t1 _one_omit">
							{{ NFT_item.name }}
						</view>
						<view class="_label_fot">
							<view class="_label_l">
								<view class="_t1">限量</view>
								<view class="_t2">{{
                  NFT_item.number - NFT_item.counter_sold_nft > 0
                    ? NFT_item.number - NFT_item.counter_sold_nft
                    : 0
                }}/{{ NFT_item.number ? NFT_item.number : "" }}份</view>
							</view>
							<view class="_label_r">
								<view class="_t1">{{
                NFT_item.classification ? NFT_item.classification : "数字文创"
              }}</view>
							</view>
						</view>
					</view>
					<view class="_icon_l">
						<image src="https://oss.dbchain.cloud/uni_mytrol_applet/icon/my_nft_option_icon_right.png"
							mode="">
						</image>
					</view>
				</view>

				<view class="_creat_name">
					<view class="_left">
						<image :src="getIpfsSrc(NFT_item.avatar)" mode=""> </image>
						<image :src="hot" mode="widthFix" class="_hot"></image>
					</view>
					<view class="_right">
						<view class="_t1"> 发行方 </view>
						<view class="_t2">
							{{ NFT_item.nickname }}
						</view>
					</view>
				</view>

				<view class="_desc">
					<view class="_name"> 藏品介绍 </view>
					<view class="_img" v-if="NFT_item.file_background">
						<image :src="getIpfsSrc(NFT_item.file_background)" mode="widthFix"></image>
					</view>
				</view>

				<!-- 权益列表 -->
				<view class="equity" v-if="NFT_item.equity_cover">
					<view class="_card" v-if="NFT_item.denom_id === 60" @click="
                  linkTo(
                    `/pages/option/option?img=${NFT_item.qr_code}&title=权益详情`
                  )
                ">
						<image :src="NFT_item.equity_cover" class="bg" mode="widthFix"></image>
					</view>
          
          <view class="_card" v-else>
          	<image :src="NFT_item.equity_cover" class="bg" mode="widthFix"></image>
          </view>

					<view class="equity_content" v-if="NFT_item.equity_content">
						<image :src="NFT_item.equity_content" mode="widthFix"> </image>
					</view>
				</view>

				<view class="_desc">
					<view class="_name"> 购买须知 </view>
					<view class="_text">
						数字藏品按类型分为非实物类虚拟数字商品，权益类数字证明和实物类数字凭证。仅限经实名认证为年满14周岁的中国大陆用户购买。数字藏品的版权由发行方或原创者拥有，除另行取得版权拥有者书面同意外，用户不得将数字藏品用于任何商业用途。本商品一经售出，不支持退换。请勿对数字藏品进行炒作、场外交易、欺诈，或以任何其他非法方式进行使用。
					</view>
				</view>

				<view class="_help">
					<image src="https://oss.dbchain.cloud/uni_mytrol_applet/icon/my_nft_option_help.png"
						mode="heightFix">
					</image>
				</view>

				<!-- 在售 -->
				<view class="_buy" v-if="NFT_item.publish=='2'">
					<img class="button-background-img" :src="unpublishBgsrc(NFT_item.publish)" alt="" />
					<view class="price-box">
						<view class="price">
							<view class="p1">价格</view>
							<view class="p2">¥{{ NFT_item.price ? NFT_item.price : "" }}</view>
						</view>
						<view class="remaining">
							剩余
							{{NFT_item.number - NFT_item.counter_sold_nft > 0
						? NFT_item.number - NFT_item.counter_sold_nft
						: 0}}份
						</view>
					</view>

					<Time :publishTime="NFT_item.opening_time" :buyStatus="NFT_item.buy_status"
						:getFree="NFT_item.get_free" :NFT_item="NFT_item" @TimeClick="buyNft()"></Time>
						
					<!-- <view class="btn_icon" @click="jumpPage">
						<image src="https://mytrol-pub.oss-cn-shenzhen.aliyuncs.com/mytrol/h5WebSite/icon-person.png" mode=""></image>
					</view> -->
				</view>
				<view class="_redeem_btn" v-else>
					<!-- 兑换 -->
					<!-- <view class="_redeem" v-if="NFT_item.publish=='2'">
						<img class="button-background-img" :src="unpublishBgsrc()" alt="" />
						<view class="_flex">
							<view class="input-box">
								<input type="text" v-model="redeem_code" placeholder="点击输入兑换码"
									placeholder-class="input_box_placeholder" />
							</view>
							<view class="_free_btn" :class="[redeem_code?'_free_text':'_un_free_text']"
								@click="redeemNft()">
								立即兑换
							</view>
						</view>
					
						<view class="btn_icon" @click="showRedeem=false">
							<image src="http://oss.mytrol.cn/uni_mytrol/icon/nft_option_btn_buy.png" mode=""></image>
						</view>
					</view> -->

				</view>
				
				<view v-if="buyHtml" class="buy_html" v-html="buyHtml">
					
				</view>

				<!-- 已下架 -->
				<view class="_buy" v-if="NFT_item.publish=='0'">
					<img class="button-background-img"
						src="http://oss.mytrol.cn/uni_mytrol/img/nft_buy_bg_unpublish.png" alt="" />
					<view class="_no_publish">
						已下架
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		formatDate,
		uni_copy,
		intervalTime,
		getStore,
		setStore,
	} from "@/static/js/global.js";
	import {
		isGif
	} from "./option_mixin.js";
	import uniNavBar from "uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.vue";
	import config from "@/js_sdk/general-http/config.js";
	import option_template from "./components/option_template.vue";
	import Time from "./components/time.vue";
	let that;
	export default {
		name: "nft_list",
		components: {
			option_template,
			uniNavBar,
			Time,
		},
		mounted() {
			that = this;
			this.$store.commit('setBuyHtml','')
		},
		computed: {
			height() {
				return "height:calc(100vh - 146px)";
			},
			statusBarHeight() {
				return 0;
				return uni.getSystemInfoSync().statusBarHeight;
			},
		},
		data() {
			return {
				hot: "https://oss.dbchain.cloud/uni_mytrol_applet/img/mock/hot.png",
				NFT_item: {
					avatar: "",
					code: "",
					created_at: "",
					created_by: "",
					description: "",
					file: "",
					id: "",
					name: "",
					nickname: "",
					number: "",
					price: "",

					published_at: "",
					tx_hash: "",
					user_id: "",

					desc_img: "https://oss.dbchain.cloud/uni_mytrol_applet/img/mock/option/nft_option.webp",
					remaining: "63",
					collected_number: "0"
				},
				// 分享
				share: {
					title: "Mytrol数字藏品",
					path: "",
					imageUrl: "",
					desc: "Mytrol数字藏品",
					content: "Mytrol数字藏品",
				},
				redeem_code:'',
				buyHtml:''
			};
		},
		methods: {
			onLoad(option) {
				this.wxLogin(option);
			},
			getFormatDateToStr(date) {
				return formatDate(new Date(Number(date)), 3);
			},
			loadAnim() {
				var animation = uni.createAnimation({
					transformOrigin: "50% 50%",
					duration: 5000,
					timingFunction: "ease",
					delay: 0,
				});
			},
			back(url = "/pages/index/index?key=home") {
				uni.navigateBack();
			},
			// 获取NFT详情
			async getNftOption(id) {
				let res = await this.$api._get("/dbchain/oracle/nft/nft_details/" + id);
				let options = {
					...this.NFT_item,
					...res.data.result,
				};
				this.NFT_item = options;
				
				this.share.imageUrl = this.getIpfsSrc(
					options.file_thumbnail ? options.file_thumbnail : options.file
				);
			},
			// 获取NFT IPFS地址
			getIpfsSrc(url) {
				if (url.indexOf("://") !== -1) {
					return url;
				}
				return config.IpfsUrl + url;
			},
			// 复制
			uni_copy(val) {
				return uni_copy(val);
			},
			// 返回
			clickLeft(url = "/pages/index/index?key=home") {
				//@zxyuns 处理兼容，如果没有上一级界面则返回首页
				const pages = getCurrentPages();
				if (pages.length === 2) {
					this.$router.back(-1)
				} else if (pages.length === 1) {
					uni.reLaunch({
						url: url,
					});
				} else {
					this.$router.back(-1)
				}
			},
			async collect(val = "1") {},

			intervalTime(end) {
				let arr = intervalTime(end);
				return `${
        arr[0] ? arr[0] * 24 + arr[1] : arr[1] > 9 ? arr[1] : "0" + arr[1]
      }:${arr[1] > 9 ? arr[2] : "0" + arr[2]}:${
        arr[2] > 9 ? arr[3] : "0" + arr[3]
      }`;
			},

			async buyNft(isbuy = true) {
				let interval;
				// 是否下单状态
				let isOriderPoll;
				uni.showLoading({
					title: "正在处理交易",
				});
				// 轮询订单是否成功
				let oriderPoll = (val, num = 10) => {
					let i = 0;
					return new Promise((resolve, reject) => {
						isOriderPoll = setInterval(async () => {
							i++;
							let data = await this.$api._get(
								"/dbchain/oracle/nft/find_by/nft_publish_order/order_id/" +
								val
							);
							if (i > num) {
								clearInterval(isOriderPoll);
								return resolve({
									code: "失败",
								});
							}

							if (data.data.result.length > 0) {
								clearInterval(isOriderPoll);
								return resolve(data.data.result);
							}
						}, 5000);
					});
				};

				this.$showLoading({
					title: "正在处理交易",
				});
				// 下单

				let submitOrider = async () => {
					return await this.$api._post("/dbchain/oracle/nft/nft_order", {
						denom_id: this.NFT_item.id + "",
					});
				};

				let a = await submitOrider();
				if (a.data.result?.free == "true") {
					uni.showToast({
						title: "区块交易中",
						duration: 5000,
						icon: "none",
					});

					setTimeout(() => {
						uni.hideToast();
						return uni.reLaunch({
							url: "/pages/index/index?key=main",
						});
					}, 5000);

					return false;
				}
				if (a.data.err_code == "0") {
					let buy_data = await this.$api._post("/dbchain/oracle/nft/nft_buy", {
						"pay_type" : "unionpay_alipay_h5",
						 "vendor" : "union",
						 "order_id" : a.data.result.order_id, //"order_id"
						 "redirect_url" : window.location.origin // 可不填
					});

					if(buy_data.data.err_code == "0"){
						window.location.href = buy_data.data.result.url;
					}
				} else {
				}
				// }
			},
			wxLogin(option) {
				const that = this;
				if (getStore("user_id")) return this._init_(option);
				return this.$router.push('/pages/login/login')
				uni.login({
					provider: "weixin",
					success: async (login_res) => {
						let code = login_res.code;
						let params = {
							code: code, //微信授权码
							invitation_code: getStore("my_code") ? getStore("my_code") : "",
							type: "mini",
						};
						let res = await that.$api._post(
							"/dbchain/oracle/nft/auth_code_to_register_login",
							params
						);
						if (res.data.err_code == "0") {
							setStore("user_id", res.data.result.userId);
						}
						that._init_(option);
					},
				});
			},
			_init_(option) {
				if (option.id) {
					return this.getNftOption(option.id);
				}
				if (option.code) {
					setStore("my_code", option.code);
				} else {
					// 取出指定url里参数 返回object
					const param2Obj = (url = " ") => {
						const search = url.split("?")[1];
						if (!search) {
							return {};
						}
						return JSON.parse(
							'{"' +
							decodeURIComponent(search)
							.replace(/"/g, '\\"')
							.replace(/&/g, '","')
							.replace(/=/g, '":"') +
							'"}'
						);
					};
					let obj = {};
					let option_obj;
					if (option.q) {
						let url = encodeURI(option.q);
						option_obj = param2Obj(url);
					} else {
						option_obj = option;
					}
          
					try {
						let keys = Object.keys(option_obj)[0];
						let values = Object.values(option_obj)[0];
						obj = {
							id: keys.split("id")[1],
							code: values,
						};
						if (values) {
							setStore("my_code", values);
						}
					} catch (e) {
						//TODO handle the exception
						// this.back()
					}

					if (obj.id) {
						return this.getNftOption(obj.id);
					}
				}
				return this.clickLeft();
			},
			isGif(url, key = "img2") {
				return isGif(url, key);
			},
			handleEquityDetailClick() {
			},
			unpublishBgsrc(item) {
				let isbuy = 'http://oss.mytrol.cn/uni_mytrol/img/nft_buy_bg.png'
				let unbuy = 'http://oss.mytrol.cn/uni_mytrol/img/nft_buy_bg_unpublish.png'
        let isNum = (Number(this.NFT_item.number) - Number(this.NFT_item.counter_sold_nft)) > 0;
        
        if(item == '2'){
          return isbuy;
        }else{
          return unbuy;
        }
        
        if (!isNum) {
          return unbuy
        }else{
          return isbuy;
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
			// 兑换
			async redeemNft(){
				if(!this.redeem_code)return false;
				let params={
					redeem_code:this.redeem_code
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
			},
			// 跳转到白名单页面
			// jumpPage(){
			// 	uni.navigateTo({
			// 		url: '/pages/white_list/white_list'
			// 	})
			// }
		},
	};
</script>

<style lang="scss" scoped>
	.equity-content {
		width: 100%;
		padding: 10px 20px;
		overflow: hidden;
		border-radius: 10px;
		box-sizing: border-box;
	}

	._nft_option {
		background: #1c1c1c;

		._footer {
			position: relative;

			._fot_img {
				display: flex;
				justify-content: center;

				image {
					height: 80px;
					width: 276px;
				}
			}

			._download {
				position: absolute;
				display: flex;
				width: 82px;
				justify-content: space-between;
				left: calc((100vw - 82px) / 2);
				top: 18px;

				image {
					width: 34px;
					height: 34px;
				}
			}
		}

		._fot_img_gif {
			top: -72px;
			height: 80px;

			._fot_img {
				image {
					height: 112px;
				}
			}

			._gif_fot {
				image {
					height: 189px;
				}
			}
		}

		._share_flex {
			display: flex;
			justify-content: center;
			align-items: center;
			top: 15px;
			position: relative;

			._share_btn {
				padding: 0;
				margin: 0;
				height: 34px;
				background: rgba(0, 0, 0, 0);
				border: none;
				border-radius: 50%;
				width: 34px;

				image {
					width: 34px;
					height: 34px;
				}
			}
		}

		._fot_img_share {
			top: -28px;
			position: relative;
			z-index: 1;
		}

		._content {
			background: #000000;
			border-radius: 18px;
			position: relative;
			z-index: 2;

			._user_block {
				display: flex;
				padding: 19px 12px;
				justify-content: center;

				._icon_l,
				._icon_r {
					image {
						width: 44px;
						height: 44px;
						position: relative;
						top: 10px;
					}
				}

				._tit {
					height: 30px;
					font-size: 18px;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #ffffff;
					line-height: 30px;
					padding: 0px 6px 0px 8px;
					min-width: 40%;
					max-width: 70%;

					._t1 {
						text-align: center;
					}

					._label_fot {
						display: flex;
						justify-content: center;
						padding-top: 9px;

						._label_l {
							display: flex;
							border: 1px solid #c8a063;
							border-radius: 6px;
							margin-right: 10px;

							._t1 {
								padding: 0 4px;
								height: 20px;
								background: #c8a063;
								border-radius: 6px;
								font-size: 12px;
								font-family: PingFangSC-Regular, PingFang SC;
								font-weight: 400;
								color: #000000;
								line-height: 20px;
								min-width: 30px;
							}

							._t2 {
								padding: 0 4px;
								font-size: 12px;
								font-family: Roboto-Medium, Roboto;
								font-weight: 500;
								color: #c8a063;
								line-height: 20px;
								white-space: nowrap;
							}
						}

						._label_r {
							margin-left: 10px;

							._t1 {
								height: 22px;
								background: #c8a063;
								border-radius: 6px;
								font-size: 12px;
								font-family: PingFangSC-Regular, PingFang SC;
								font-weight: 400;
								color: #000000;
								line-height: 22px;
								padding: 0 8px;
							}
						}
					}
				}

				._icon_r {}
			}

			._creat_name {
				display: flex;
				width: 93.6vw;
				height: 82px;
				background: #151515;
				border-radius: 12px;
				margin: 0 auto;
				align-items: center;
				margin-top: 30px;
				margin-bottom: 12px;

				._left {
					padding-left: 18px;
					position: relative;

					image {
						width: 47px;
						height: 47px;
						border-radius: 50%;
					}

					._hot {
						width: 20px;
						height: 20px;
						position: absolute;
						right: 0px;
						bottom: 2px;
					}
				}

				._right {
					padding-left: 8px;
					width: 100%;

					._t1 {
						font-size: 12px;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #979797;
						line-height: 16px;
						margin-bottom: 6px;
					}

					._t2 {
						font-size: 14px;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #f7f7f7;
						line-height: 16px;
					}
				}
			}

			._desc {
				padding: 20px 19px;
				background: #151515;
				border-radius: 12px;
				width: calc(93.6vw - 38px);
				margin: 0 auto;
				margin-bottom: 12px;

				._img {
					image {
						width: 100%;
						border-radius: 12px;
					}
				}

				._name {
					font-size: 18px;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #ffffff;
					line-height: 20px;
					padding-bottom: 10px;
				}

				._text {
					font-size: 12px;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #979797;
					line-height: 22px;
				}
			}

			._help {
				display: flex;
				justify-content: center;
				padding: 24px 0 134px;

				image {
					height: 24px;
				}
			}
		}

		._buy {
			width: 95vw;
			margin: 0 auto;
			height: 62px;
			background: #ffbd21;
			left: 50%;
			transform: translateX(-50%);
			position: fixed;
			bottom: 21px;
			box-shadow: 0px 2px 16px 6px rgba(31, 31, 31, 0.5);
			border-radius: 12px;
			overflow: hidden;
			z-index: 4;

			.button-background-img {
				position: absolute;
				width: 100%;
				height: 100%;
			}

			.price-box {
				position: absolute;
				left: 10px;
				top: 50%;
				transform: translateY(-50%);
				z-index: 1;
				display: flex;
				align-items: flex-end;

				.price {
					color: #ffffff;
					margin-left: 14px;

					.p1 {
						font-weight: 400;
						font-size: 12px;
					}

					.p2 {
						font-weight: 500;
						font-size: 20px;
					}
				}

				.remaining {
					font-size: 12px;
					font-weight: 500;
					color: #ffffff;
					margin-left: 14px;
					padding-bottom: 2px;
				}
			}

			._left {
				padding-left: 22px;

				._t1 {
					height: 14px;
					font-size: 12px;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #fff;
					line-height: 14px;
				}

				._t2 {
					height: 24px;
					font-size: 20px;
					font-family: Roboto-Medium, Roboto;
					font-weight: 500;
					color: #fff;
					line-height: 24px;
				}
			}

			._no_publish {
				text-align: center;
				align-items: center;
				color: #e2e2e2;
				position: relative;
				z-index: 2;
				height: 100%;
				/* line-height: 100%; */
				line-height: 62px;
				font-size: 18px;
			}
		}
	}

	._redeem_btn {

		._buy,
		._redeem {
			width: 95vw;
			margin: 0 auto;
			height: 62px;
			background: #ffbd21;
			left: 50%;
			transform: translateX(-50%);
			position: fixed;
			bottom: 21px;
			box-shadow: 0px 2px 16px 6px rgba(31, 31, 31, 0.5);
			border-radius: 12px;
			overflow: hidden;
			z-index: 4;

			.button-background-img {
				position: absolute;
				width: 100%;
				height: 100%;
			}

			.price-box {
				position: absolute;
				left: 10px;
				top: 50%;
				transform: translateY(-50%);
				z-index: 1;
				display: flex;
				align-items: flex-end;

				.price {
					color: #ffffff;
					margin-left: 14px;

					.p1 {
						font-weight: 400;
						font-size: 12px;
					}

					.p2 {
						font-weight: 500;
						font-size: 20px;
					}
				}

				.remaining {
					font-size: 12px;
					font-weight: 500;
					color: #ffffff;
					margin-left: 14px;
					padding-bottom: 2px;
				}
			}

			._left {
				padding-left: 22px;

				._t1 {
					height: 14px;
					font-size: 12px;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #fff;
					line-height: 14px;
				}

				._t2 {
					height: 24px;
					font-size: 20px;
					font-family: Roboto-Medium, Roboto;
					font-weight: 500;
					color: #fff;
					line-height: 24px;
				}

			}

			._no_publish {
				text-align: center;
				align-items: center;
				color: #e2e2e2;
				position: relative;
				z-index: 2;
				height: 100%;
				/* line-height: 100%; */
				line-height: 62px;
				font-size: 18px;
			}

			._flex {
				display: flex;
				align-items: center;
				height: 100%;
				justify-content: space-around;

				.input-box {
					height: 41px;
					width: 207px;

					input {
						height: inherit;
						border-radius: 8px;
						margin-left: 10px;
					}

				}

				._free_btn {
					color: #fff;
					position: relative;
					opacity: 0.7;
				}

				._free_text {
					opacity: 1;
				}
			}


		}
	}

	.btn_icon {
		position: absolute;
		right: 3px;
		top: 2px;
		background: #E2B346;
		border-radius: 0px 8px 0px 8px;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 28px;
		height: 25px;

		image {
			width: 20px !important;
			height: 20px !important;
			margin-right: 0px !important;
		}
	}
</style>
