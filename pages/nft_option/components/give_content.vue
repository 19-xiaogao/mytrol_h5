<template>
	<view class="give_content">
		<view class="empty">
			<view class="_img">
				<image class="_img_default" :src="getIpfsSrc(NFT_item.file)" mode=""></image>
				<!-- <image
          class="_img_hot"
          src="https://oss.mytrol.cn/uni_mytrol/img/mock/nft_hot.png"
          mode=""
        ></image> -->
			</view>
			<view class="_img1" :class="[isGif(getIpfsSrc(NFT_item.file),null)?'none_img':'']">
				<image class="_img_default" src="https://oss.mytrol.cn/uni_mytrol/img/nft_bg1.png" mode="">
				</image>
			</view>
			<view class="_img2">
				<image class="_img_default" src="https://oss.mytrol.cn/uni_mytrol/img/nft_bg2.png" mode="">
				</image>
			</view>
		</view>

		<view class="_user_block">
			<view class="_icon_l">
				<image src="https://oss.mytrol.cn/uni_mytrol/icon/my_nft_option_icon_left.png" mode="">
				</image>
			</view>
			<view class="_tit">
				<view class="_t1 _one_omit">
					{{ NFT_item.name }}
				</view>
				<view class="_img">
					<image src="https://oss.mytrol.cn/uni_mytrol/icon/my_nft_option_icon_center.png" mode="">
					</image>
					<view class="_text">
						{{ NFT_item.nft_number[NFT_item_active] ? NFT_item.nft_number[NFT_item_active] : "" }}
					</view>
					<!-- <image class="icon_check" src="https://oss.mytrol.cn/uni_mytrol/icon/my_nft_option_icon_check.png" mode=""></image> -->
				</view>
			</view>
			<view class="_icon_l">
				<image src="https://oss.mytrol.cn/uni_mytrol/icon/my_nft_option_icon_right.png" mode="">
				</image>
			</view>
		</view>
		<view class="_hide">
			<view class="_send _one_omit">
				<text class="send-text">受赠人</text>
				<view class="input-box">
					<input type="text" v-model="sendAddress" placeholder-class="placeholder_class" name=""
						placeholder="请输入受赠人地址" id="" />
					<text class="_paste" @click="paste()"> 粘贴 </text>
				</view>
			</view>
			<view class="_btn" @click="$noMultipleClicks(sendNFT)"> 赠送 </view>
		</view>
	</view>
</template>

<script>
	import {
		isGif
	} from '../option_mixin.js'
	import config from "@/js_sdk/general-http/config.js";
	import {
		getStore
	} from "@/static/js/global.js";
	let that;
	export default {
		props: {
			NFT_item: {
				required: true,
			},
			NFT_item_active: {
				required: true,
			}
		},
		data() {
			return {
				sendAddress: "",

			};
		},

		mounted() {
			that = this;
		},
		methods: {
			closeLogs() {
				this.$emit("closeLogs");
			},
			// 获取NFT IPFS地址
			getIpfsSrc(url) {
				if (url.indexOf("://") !== -1) {
					return url;
				}
				return config.IpfsUrl + url;
			},
			paste() {
				uni.getClipboardData({
					success: function(res) {
						that.sendAddress = res.data;
					},
				});
			},
			isGif(url, key = 'img2') {
				return isGif(url, key)
			},
			async sendNFT() {
				if (!that.sendAddress)
					return uni.showToast({
						title: "请填写您要赠送的地址",
						duration: 5000,
						icon: "none",
					});
				let userInfo = getStore("userInfo") || {
					address: ""
				};
				if (userInfo.address == that.sendAddress)
					return uni.showToast({
						title: "您已拥有该藏品",
						duration: 5000,
						icon: "none",
					});
				let id = typeof(this.NFT_item.id) == 'string' ? this.NFT_item.id : this.NFT_item.id[this
					.NFT_item_active];
				let res = await this.$api._post("/dbchain/oracle/nft/nft_transfer", {
					nft_id: id + '',
					to_addr: that.sendAddress,
				});
				if (res.data.err_code == "0") {
					uni.showToast({
						title: "区块交易中",
						duration: 5000,
						icon: "none",
					});
					setTimeout(() => {
						uni.hideToast();
						return uni.reLaunch({
							url: "/pages/index/index?key=main"
						});
					}, 5000);
				}
			},
		},
	};
</script>

<style lang="scss" scoped>
	.give_content {
		position: relative;
		top: calc((100vh - 540px) / 2);

		._back {
			position: fixed;
			z-index: 2;
			top: 28px;

			image {
				width: 40px;
				height: 40px;
			}
		}

		._bg {
			width: 336px;
			height: 415px;
			background: #000000;
			border-radius: 18px;
			position: absolute;
			left: calc((100% - 336px) / 2);
			z-index: 1;
			top: 122px;
		}

		.empty {
			width: 100%;
			position: relative;
			min-height: 294px;
			padding: 40px 0 0;

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
		}

		._user_block {
			display: flex;
			padding: 0px 12px 21px;
			justify-content: center;
			z-index: 2;
			position: relative;

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
			}

			.icon_check {
				width: 24px !important;
				height: 24px !important;
				top: 0px !important;
			}

			._icon_r {}
		}

		._send {
			padding: 20px 20px;

			.send-text {
				color: #fff;
				font-size: 18px;
				z-index: 1;
				text-align: center;
				width: 100%;
				display: block;
				padding-bottom: 6px;
			}

			.input-box {
				display: flex;
				align-items: center;
				justify-content: space-between;

				input {
					flex: 1;
					padding-right: 5px;
				}

				._paste {
					z-index: 1;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #ffb300;
					font-size: 13px;
					line-height: 30px;
				}
			}
		}

		._hide {
			// height: 135px;
			// overflow-y: hidden;
		}

		._btn {
			width: 92%;
			height: 50px;
			background: #ffb300;
			border-radius: 8px;
			margin: 0 auto;
			line-height: 50px;
			text-align: center;
			font-size: 18px;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #ffffff;
			position: relative;
			z-index: 2;
		}
	}
</style>
