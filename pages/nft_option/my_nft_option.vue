<template>
	<view class="_nft_option my_nft_option" :class="mask ? 'tl-show' : ''">
		<view class="_view_img" @click="mask = false" v-if="mask">
			<image :src="maskImg" mode="widthFix"></image>
		</view>
		<uni-nav-bar left-img="https://oss.mytrol.cn/uni_mytrol/icon/back.png" left-img-h="40px" left-img-w="40px"
			fixed="true" color="#ffffff" backgroundColor="#1C1C1C" title=" " class="_nav_index" :statusBar="true"
			@clickLeft="clickLeft()"></uni-nav-bar>

		<view class="_nft_img" v-if="!mask">
			<!-- <seeimg ref="mychild" :imgurl="getIpfsSrc(NFT_item.file)" /> -->
			<view class="empty" :class="[loadImg > 1 ? '_animation_img' : '']">
				<view class="_img">
					<image class="_img_default" :src="getIpfsSrc(NFT_item.file)" mode="" @error="onErrorImg(NFT_item)"
						@load="onSuccessImg(NFT_item)"></image>

				</view>
				<view class="_img1" :class="[isGif(getIpfsSrc(NFT_item.file),null)?'none_img':'']">
					<image class="_img_default" src="https://oss.mytrol.cn/uni_mytrol/img/nft_bg1.png" mode=""
						@error="onErrorImg(NFT_item)" @load="onSuccessImg(NFT_item)"></image>
				</view>

				<view class="_img_light">
					<image :src="isGif(getIpfsSrc(NFT_item.file),'img_light')" mode="widthFix">
					</image>
				</view>
			</view>
			<view class="_footer" :class="[isGif(getIpfsSrc(NFT_item.file),null)?'_fot_img_gif':'']">
				<view class="_fot_img">
					<image :src="isGif(getIpfsSrc(NFT_item.file),'img_foot')" mode="">
					</image>
				</view>
				<view class="_download">
					<image @click="showMsk(true,getIpfsSrc(NFT_item.file))"
						src="https://oss.mytrol.cn/uni_mytrol/icon/my_nft_option_see.png" mode="">
					</image>
					<image @click="longtap(getIpfsSrc(NFT_item.file))"
						src="https://oss.mytrol.cn/uni_mytrol/icon/my_nft_option_download.png" mode="">
					</image>


					<button open-type='share' class="_share_btn">
						<image src="https://oss.mytrol.cn/uni_mytrol/icon/my_nft_option_share.png" mode="">
						</image>
					</button>
				</view>
			</view>

			<!-- <image src="" mode=""></image> -->
		</view>

		<view class="_nft_bg">
			<view class="_user_block">
				<view class="_icon_l">
					<image src="https://oss.mytrol.cn/uni_mytrol/icon/my_nft_option_icon_left.png" mode="">
					</image>
				</view>
				<view class="_tit">
					<view class="_t1 _one_omit">
						{{ NFT_item.name }}
					</view>
					<view class="_img" @click="giveStatus='3'">
						<image src="https://oss.mytrol.cn/uni_mytrol/icon/my_nft_option_icon_center.png" mode="">
						</image>
						<view class="_text">
							{{ NFT_item.nft_number[NFT_item_active] ? NFT_item.nft_number[NFT_item_active] : "" }}
						</view>
						<image class="icon_check"
							src="https://oss.mytrol.cn/uni_mytrol/icon/my_nft_option_icon_check.png" mode=""></image>
					</view>
				</view>
				<view class="_icon_l">
					<image src="https://oss.mytrol.cn/uni_mytrol/icon/my_nft_option_icon_right.png" mode="">
					</image>
				</view>
			</view>

			<view class="_tx_hash">
				<view class="_t1"> 哈希值 </view>
				<view class="_t2" v-if='NFT_item.tx_hash[NFT_item_active]'
					@click="copy(NFT_item.tx_hash[NFT_item_active])">
					{{ NFT_item.tx_hash[NFT_item_active] }}
				</view>
				<view class="_t2" v-else>
					区块hash生成中
				</view>

			</view>
			<view class="_check_op">
				<view class="_op">
					<view class="_op">
						<view class="_t1">创作者</view>
						<view class="_t2">{{ NFT_item.nickname }}</view>
					</view>
					<view class="_op">
						<view class="_t1">拥有者</view>
						<view class="_t2">{{ userInfo.nickname }}</view>
					</view>
				</view>
				<view class="_bg_auth">
					<image src="https://oss.mytrol.cn/uni_mytrol/icon/my_nft_option_auth_1.png" mode="">
					</image>
				</view>
				<view class="_op">
					<view class="_t1">认证时间</view>
					<view class="_t2">{{ getFormatDateToStr(NFT_item.created_at[NFT_item_active]) }}</view>
				</view>
			</view>

			<view class="equity" v-if="NFT_item.equity_cover">
				<view class="_card" @click="
                  linkTo(
                    `/pages/option/option?img=${NFT_item.qr_code}&title=权益详情&id=${NFT_item.equity_card_number[NFT_item_active]}&denom_id=${NFT_item.denom_id}`
                  )
                ">
					<image :src="NFT_item.equity_cover" class="bg" mode="widthFix"></image>
				</view>

				<view class="_text" @click="
                  linkTo(
                    `/pages/option/option?img=${NFT_item.qr_code}&title=权益详情`
                  )
                ">
					#{{ NFT_item.equity_card_number[NFT_item_active] ? NFT_item.equity_card_number[NFT_item_active] : "" }}
				</view>

				<view class="equity_content" v-if="NFT_item.equity_content">
					<image :src="NFT_item.equity_content" mode="widthFix"> </image>
				</view>

			</view>


			<view class="_nft_option_cont">
				<view class="_fot">
					温馨提示：本数字藏品版权由发行方或原创作者拥有，除另行取得版权拥有者书面同意外，用户不得将数字藏品用于任何商业用途，请远离非理性炒作。
				</view>

				<view class="_help">
					<image src="https://oss.mytrol.cn/uni_mytrol/icon/my_nft_option_help.png" mode="heightFix"></image>
				</view>
			</view>
			<view class="_btns">
				<view class="_btn" @click="giveStatus = '1'">
					<view class="_icon">
						<image src="https://oss.mytrol.cn/uni_mytrol/icon/my_nft_option_log.png" mode="">
						</image>
					</view>
					<view class="_t1"> 转赠记录 </view>
				</view>

				<view class="_btn" @click="showGivConent()">
					<view class="_icon">
						<image src="https://oss.mytrol.cn/uni_mytrol/icon/my_nft_option_give.png" mode="">
						</image>
					</view>
					<view class="_t1"> 转赠 </view>
				</view>
			</view>
		</view>

		<view class="_module_bg" v-if="giveStatus !== '0'" @click="giveStatus = '0'">
		</view>
		<view class="_give_logs" v-if="giveStatus == '1'">
			<give_logs :NFT_item="NFT_item" :NFT_item_active="NFT_item_active"  @closeLogs="giveStatus = '0'"></give_logs>
		</view>
		<view class="_give_content" v-if="giveStatus == '2'">
			<give_content :NFT_item="NFT_item" :NFT_item_active="NFT_item_active" @closeLogs="giveStatus = '0'">
			</give_content>
		</view>
		<!-- 切换选择分类 -->
		<view class="_nft_content" v-if="giveStatus == '3'">
			<nft_content :NFT_item="NFT_item" @closeLogs="giveStatus = '0'" @changeNFT="changeNFT()"></nft_content>
		</view>
	</view>
</template>

<script>
	import {
		formatDate,
		uni_copy,
		getStore,
		getFileType
	} from "@/static/js/global.js";
	import {
		isGif
	} from './option_mixin.js'
	import uniNavBar from "uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.vue";
	import config from "@/js_sdk/general-http/config.js";
	import option_template from "./components/option_template.vue";

	import give_content from "./components/give_content.vue";
	import give_logs from "./components/give_logs.vue";
	import nft_content from "./components/nft_content.vue";
	let that;
	export default {
		name: "nft_list",
		mounted() {
			that = this;
		},
		components: {
			option_template,
			uniNavBar,
			give_content,
			give_logs,
			nft_content
		},
		computed: {
			height() {
				return "height:calc(100vh - 146px)";
			},
			userInfo() {
				return getStore("userInfo") ?
					getStore("userInfo") : {
						nickname: "本人",
					};
			},
		},
		data() {
			return {

				loadImg: 0,
				mask: false,
				maskImg: '',
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
					hot: "",
					desc_img: "",
					remaining: "",
					collected_number: "",
				},
				giveStatus: "0", //赠送弹出
				// 分享
				share: {
					title: "Mytrol数字藏品",
					path: "",
					imageUrl: '',
					desc: "Mytrol数字藏品",
					content: "Mytrol数字藏品",
				},
				NFT_item_active: 0, //当前nft选中状态
				giveToNft: false,
			};
		},
		methods: {
			onLoad(option) {
				if (option.id) {
					this.getNftOption(option.id);
					// this.share.path=`/pages/nft_option/nft_option?id${option.id}=`
				}
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
			clickLeft(url = "/pages/index/index?key=main") {
				if (this.giveStatus == "0") {
					uni.navigateBack();
				}
				this.giveStatus = "0";
			},

			// 获取NFT详情
			async getNftOption(id) {
				let res = await this.$api._get(
					"/dbchain/oracle/nft/nft_detail_of_user_buy_new/" + id
				);
				let options = {
					...this.NFT_item,
					...res.data.result,
				};
				this.share.imageUrl = this.getIpfsSrc(options.file_thumbnail ? options.file_thumbnail : options.file);
				this.NFT_item = options;
			},
			// 获取NFT IPFS地址
			getIpfsSrc(url) {
				if (url.indexOf("://") !== -1||!url) {
					return url;
				}
				return config.IpfsUrl + url;
			},
			// 复制
			uni_copy(val) {
				return uni_copy(val);
			},
			// 收藏 取消收藏

			async collect(val = "1") {
				let params = {
					denom_id: this.NFT_item.id,
				};
				let res;
				if (val == "1") {
					res = await this.$api._post("/dbchain/oracle/nft/nft_collect", params);
					this.NFT_item.collected = "true";
				} else {
					res = await this.$api._post(
						"/dbchain/oracle/nft/nft_cancle_collect",
						params
					);
					this.NFT_item.collected = "false";
				}
			},
			//保存图片
			longtap(imgurl) {
				uni.showModal({
					title: "下载数字藏品",
					content: "是否下载数字藏品？",
					success: (m_res) => {
						if (m_res.confirm) {
							uni.downloadFile({
								url: imgurl,
								success: (res) => {
									if (res.statusCode === 200) {
										uni.saveImageToPhotosAlbum({
											filePath: res.tempFilePath,
											success: function() {
												uni.showToast({
													title: "保存成功",
													duration: 5000,
												});
											},
											fail: function() {
												uni.showToast({
													title: "保存失败，请稍后重试",
													icon: "none",
												});
											},
										});
									}
								},
							});
						} else if (res.cancel) {
							uni.showToast({
								title: "你取消了该操作",
								icon: "none",
								duration: 5000,
							});
						}
					},
				});
			},
			onSuccessImg(item) {
				this.loadImg += 1;
			},
			// 购买成功一个月之后方可赠送
			giveNft() {
				uni.showModal({
					title: "赠送数字藏品",
					content: "购买成功一个月之后方可赠送",
					success: (m_res) => {},
				});
			},
			copy(value) {
				//提示模板
				return uni_copy(value);
			},
			onErrorImg(item) {
				console.log("EEEEEEEEEEEEEEEEEEEEEEEEEonErrorImg");
				console.log(item);
			},
			isGif(url, key = 'img2') {
				return isGif(url, key)
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

			showMsk(type, url) {
				this.mask = type;
				this.maskImg = url
			},
			changeNFT(num) {
				console.log(num)
				this.NFT_item_active = num;
				if (this.giveToNft) {
					this.giveStatus = '2';
					this.giveToNft = false;
				} else {
					this.giveToNft = false;
					this.giveStatus = '0';
				}
			},
			showGivConent() {
				uni.showModal({
					title: '赠送确认',
					content: `您确定要赠送编号为${that.NFT_item.nft_number[that.NFT_item_active]}的数字藏品吗？`,
					cancelText: '重新选择',
					confirmText: '确定赠送',
			 	success(res) {
						if (res.confirm) {
							// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
							that.giveStatus = '2'
						} else {
							that.giveStatus = '3'
							that.giveToNft = true
						}
					}
				});
			},
			
		},
		created(){
			  uni.$on('changeNFT',(num)=>{
			        this.changeNFT(num);
			    })

		}

	};
</script>

<style lang="scss" scoped>
	._nft_option {
		background: #1c1c1c;
		// padding-top: 70px;
		color: #fff;

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
				width: 130px;
				justify-content: space-between;
				left: calc((100vw - 130px) / 2);
				top: 18px;

				image {
					width: 34px;
					height: 34px;
				}
			}

			._share_btn {
				padding: 0;
				margin: 0;
				height: 34px;
				background: rgba(0, 0, 0, 0);
				border: none;
				border-radius: 50%;
			}
		}

		._nav {
			display: flex;
			height: 67px;
			color: #fff;
			position: absolute;
			height: 70px;
			width: 100vw;
			top: 0;
			left: 0;
			z-index: 999999999999;

			._back {
				width: 40px;
				height: 40px;
				position: absolute;
				top: 23px;
				z-index: 999999999999;

				image {
					width: inherit;
					height: inherit;
				}
			}

			._tit {
				width: 100%;
				text-align: center;
				position: absolute;
				top: 27px;
				pointer-events: none;
			}
		}

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

				._img {
					display: flex;
					justify-content: center;
					padding-top: 8px;

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

				image {
					width: 44px;
					height: 14px;
				}

				.icon_check {
					width: 24px !important;
					height: 24px !important;
					top: 0px !important;
				}
			}

			._icon_r {}
		}

		._tx_hash {
			padding-top: 19px;
			margin-bottom: 69px;

			._t1 {
				height: 24px;
				font-size: 14px;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #d4d4d4;
				line-height: 24px;
				text-align: center;
				margin-bottom: 8px;
			}

			._t2 {
				width: calc(100% - 36px - 42px);
				margin: 0 auto;
				font-size: 16px;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #ffffff;
				line-height: 20px;
				padding: 18px;
				-webkit-background-clip: text;
				background: linear-gradient(270deg, #e6ce9c 0%, #c8a063 100%);
				border-radius: 12px;

				color: #fff;
				word-wrap: break-word;
				white-space: normal;
				word-break: break-all;
				text-align: center;
			}
		}

		._check_op {
			position: relative;

			._op {
				display: flex;
				flex-wrap: wrap;
				margin-bottom: 27px;
				justify-content: center;
				z-index: 2;
				position: relative;

				&:last-child {
					._t1 {
						width: 100%;
					}

					._t2 {}
				}

				._t1 {
					height: 24px;
					font-size: 14px;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #d4d4d4;
					line-height: 24px;
					margin-bottom: 10px;
					min-width: 30%;
					text-align: center;
				}

				._t2 {
					font-size: 16px;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #ffffff;
					line-height: 20px;
					max-width: 86%;
					word-break: break-all;
					white-space: pre-wrap;
					text-align: center;
				}

				._op {
					width: 48%;
					margin-top: 6px;
					margin-bottom: 14px;

					._t1 {}

					._t2 {
						width: 100%;
					}
				}
			}

			._bg_auth {
				position: absolute;
				top: -12px;
				left: calc((100% - 164px) / 2);

				image {
					width: 166px;
					height: 166px;
				}
			}
		}

		._nft_bg {
			background: #000000;
			border-radius: 18px 18px 0px 0px;
			padding-bottom: 30px;
			position: relative;
			z-index: 1;
		}

		._nft_option_cont {
			._hed {
				display: flex;
				justify-content: center;
				align-items: center;
				margin-top: 50px;
				margin-bottom: 35px;

				._left {
					image {
						width: 94px;
						height: 29px;
					}

					margin-right: 6px;
				}

				._right {
					margin-left: 6px;
					height: 24px;
					font-size: 14px;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #a5a5a5;
					line-height: 24px;
					letter-spacing: 1px;
				}
			}

			._fot {
				width: 89.5%;
				margin: 0 auto;
				font-size: 13px;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #494949;
				line-height: 24px;
				margin-bottom: 30px;
			}
		}

		._help {
			display: flex;
			justify-content: center;
			margin: 24px 0 74px;

			image {
				height: 24px;
			}
		}

		._btns {
			position: fixed;
			z-index: 2;
			bottom: 0;
			display: flex;
			align-items: center;
			justify-content: space-around;
			width: 100%;
			height: 82px;
			background: rgba(0, 0, 0, 0.9);

			._btn {
				width: 41.3%;
				height: 40px;
				font-size: 16px;
				font-weight: 400;
				color: #ffffff;
				display: flex;
				justify-content: center;
				border-radius: 8px;
				align-items: center;

				._icon {
					height: 24px;

					image {
						width: 24px;
						height: 24px;
						margin-right: 4px;
					}
				}
			}
		}

		.empty {
			width: 100%;
			height: 100%;
			position: relative;
			// overflow: hidden;
			min-height: 294px;
			padding: 40px 0 0;
		}

		._nft_img {
			perspective: 500px;
			position: relative;

			// pointer-events: none;
			._img1 {
				position: absolute;
				left: calc((100vw - 280px) / 2);
				top: 40px;
				width: 280px;
				height: 280px;
				z-index: 2;
				transform-style: preserve-3d;
				// transform: translateZ(2000px);

				image {
					width: inherit;
					height: inherit;
				}
			}

			._img2 {
				position: absolute;
				left: calc((100vw - 264px) / 2);
				top: 47px;
				width: 264px;
				height: 264px;
				z-index: 3;
				transform-style: preserve-3d;
				// transform: translateZ(3000px);
				display: none;

				image {
					width: inherit;
					height: inherit;
				}
			}

			._img {
				width: 270px;
				height: 270px;
				margin: 0 auto;
				border-radius: 18px;
				display: flex;
				justify-content: center;
				align-items: center;
				position: relative;
				transform-style: preserve-3d;
				z-index: 9999999999;
				// transform: translateZ(4000px);
				top: 4px;

				@keyframes router {
					0% {
						transform: rotateY(0deg);
					}

					25% {
						transform: rotateY(10deg);
					}

					50% {
						transform: rotateY(20deg);
					}

					75% {
						transform: rotateY(10deg);
					}

					100% {
						transform: rotateY(0deg);
					}
				}

				@keyframes router1 {
					0% {
						transform: rotateY(0deg);
					}

					33% {
						transform: rotateY(15deg);
					}

					66% {
						transform: rotateY(-15deg);
					}

					100% {
						transform: rotateY(0deg);
					}
				}

				@keyframes router2 {
					0% {
						transform: rotateY(0deg);
					}

					33% {
						transform: rotateY(16deg);
					}

					66% {
						transform: rotateY(-16deg);
					}

					100% {
						transform: rotateY(0deg);
					}
				}

				._img_default {
					width: 252px;
					height: 252px;
					border-radius: 18px;
					z-index: 9999;
				}

				._img_hot {
					width: 36px;
					height: 36px;
					position: absolute;
					bottom: 30px;
					right: 30px;
					z-index: inherit;
				}
			}

			._img_light {
				position: absolute;
				top: -68px;
				left: 0;
				width: 100vw;
				z-index: -1;
				pointer-events: none;

				image {
					width: inherit;
					pointer-events: none;
				}
			}

			._fot_img {
				width: 215px;
				height: 89px;
				margin: 0 auto;
				position: relative;
				top: -8px;

				image {
					width: inherit;
					height: inherit;
				}
			}

			._fot_img_gif {
				top: -34px;
				height: 80px;

				._fot_img {
					width: 257px;

					image {
						height: 189px;
					}
				}


				._download {
					top: 8px;
				}

			}
		}

		._view_img {
			width: 100vw;
			height: 100vh;
			position: fixed;
			top: 0;
			left: 0;
			display: flex;
			justify-content: center;
			align-items: center;
			background: #000;
			z-index: 9999999999;

			image {
				width: 88vw;
			}
		}
	}

	._give_logs,
	._nft_content {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100vw;
		background: #1a1a1a;
		border-radius: 12px 12px 0px 0px;
		max-height: 80vh;
		z-index: 5;
	}

	._module_bg {
		background: #f9f9f9;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		z-index: 4;
		opacity: 0;
	}

	._give_content {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100vw;
		background: #1a1a1a;
		border-radius: 12px 12px 0px 0px;
		height: 100vh;
		z-index: 5;
	}

	.tl-show {
		overflow: hidden;
		position: fixed;
		height: 100%;
		width: 100%;
		z-index: 99999;
	}

	._animation_img {
		._img1 {
			animation: router1 7s linear infinite;
		}

		._img2 {
			animation: router1 7s linear infinite;
		}

		._img {
			animation: router1 7s linear infinite;
		}
	}


</style>
