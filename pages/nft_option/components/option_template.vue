<template>
	<view class="option_template">
		<view class="_nft_img">
			<view class="empty" :class="[loadImg > 1 ? '_animation_img' : '']">
				<view class="_img">
					<image class="_img_default" :src="getIpfsSrc(NFT_item.file)" mode="" @error="onErrorImg(NFT_item)"
						@load="onSuccessImg(NFT_item)"></image>
			<!-- 		<image class="_img_hot" src="https://oss.dbchain.cloud/uni_mytrol_applet/img/mock/nft_hot.png"
						mode="" @error="onErrorImg(item)" @load="onSuccessImg(item)">
					</image> -->
				</view>
				<view class="_img1" :class="[isGif(getIpfsSrc(NFT_item.file),null)?'none_img':'']">
					<image class="_img_default" src="https://oss.dbchain.cloud/uni_mytrol_applet/img/nft_bg1.png"
						mode="" @error="onErrorImg()" @load="onSuccessImg()"></image>
				</view>
				<view class="_img2">
					<image class="_img_default" src="https://oss.dbchain.cloud/uni_mytrol_applet/img/nft_bg2.png"
						mode="" @error="onErrorImg()" @load="onSuccessImg()"></image>
				</view>

				<view class="_img_light">
					<image :src="isGif(getIpfsSrc(NFT_item.file),'img_light')" mode="widthFix">
					</image>
				</view>
			</view>
			<slot name="footer">
				<view class="_fot_img">
					<image src="https://oss.dbchain.cloud/uni_mytrol_applet/img/mock/nft_fot.png" mode=""></image>
				</view>
			</slot>
		</view>

		<slot name="option"> </slot>
	</view>
</template>

<script>
	import config from "@/js_sdk/general-http/config.js";
	import {
		getFileType
	} from '@/static/js/global.js'
	import {
		isGif
	} from '../option_mixin.js'
	export default {
		data() {
			return {
				loadImg: 0,
			};
		},
		props: {
			NFT_item: {
				required: true,
				default: {
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
			},
		},
		methods: {
			// 获取NFT IPFS地址
			getIpfsSrc(url) {
				if (url.indexOf("://") !== -1) {
					return url;
				}
				return config.IpfsUrl + url;
			},

			isGif(url, key = 'img2') {
				return isGif(url, key)
			},
			onSuccessImg(item) {
				this.loadImg += 1;
			},
			onErrorImg(item) {},
			// 下载大图插件
			longtap() {},
		},
	};
</script>

<style lang="scss" scoped>
	.option_template {
		// pointer-events: none;

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
	}
</style>
