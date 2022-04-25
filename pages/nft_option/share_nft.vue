<template>
	<view class="_share_nft">
		<view class="_cont">
			<view class="_title _one_omit">
				{{ NFT_item.name }}
			</view>
			<view class="_bg">
				<image src="https://oss.mytrol.cn/uni_mytrol/icon/share_nft_bg_1.png" mode="widthFix">
				</image>
			</view>
			<view class="_NFT_cont">
				<view class="_border_view">
					<view class="_NFT_img">
						<image :src="
                getIpfsSrc(
                  NFT_item.file_thumbnail
                    ? NFT_item.file_thumbnail
                    : NFT_item.file
                )
              " mode="">
						</image>
					</view>
				</view>
			</view>

			<view class="_img">
				<image src="https://oss.mytrol.cn/uni_mytrol/icon/my_nft_option_icon_center.png" mode="">
				</image>
				<view class="_text">
					{{ NFT_item.nft_number }}
				</view>
			</view>

			<view class="_desc">
				<view class="_t">
					<view class="_t1"> 拥有者 </view>
					<view class="_t2 _one_omit">
						{{ userInfo.nickname }}
					</view>
				</view>
				<view class="_t">
					<view class="_t1"> 认证时间 </view>
					<view class="_t2 _one_omit">
						{{ getFormatDateToStr(NFT_item.created_at) }}
					</view>
				</view>
				<view class="_t">
					<view class="_t1"> 认证哈希 </view>
					<view class="_t2 _one_omit">
						{{ NFT_item.tx_hash }}
					</view>
				</view>
			</view>
			<view class="_ercode" v-if="showCanvas">
				<!-- <image src="../../static/logo.png" mode=""></image> -->
				<canvas id="qrcode" canvas-id="qrcode" style="width: 72px; height: 72px" />
			</view>
		</view>
		<!-- <view class="_footer">
			<view class="_img">
				<image src="https://oss.mytrol.cn/uni_mytrol/icon/share_nft_download.png" mode=""></image>
			</view>
			<view class="_text">
				保存到相册
			</view>
		</view> -->
	</view>
</template>

<script>
	import config from "@/js_sdk/general-http/config.js";
	let that;
	import uQRCode from "@/uni_modules/Sansnn-uQRCode/components/uqrcode/common/uqrcode.js";
	import {
		formatDate,
		uni_copy,
		getStore
	} from "@/static/js/global.js";
	export default {
		data() {
			return {
				openSettingBtnHidden: true, //是否授权
				NFT_item: {
					avatar: "",
					code: "",
					created_at: "",
					created_by: "",
					description: "",
					file: "",
					denom_id: "",
					id: "",
					name: "",
					nickname: "",
					number: "",
					price: "",
					nft_number: "",
					published_at: "",
					tx_hash: "",
					user_id: "",
					hot: "",
					desc_img: "",
					remaining: "",
					collected_number: "",
				},
				ewmImg: "https://oss.dbchain.cloud/dbchain_apply/img/share/share3.png", //这是要保存的图片
				showCanvas: false,
			};
		},
		computed: {
			userInfo() {
				return getStore("userInfo") || {};
			},
		},
		methods: {
			async readCanvas() {
				// 全免url
				// https://mshare.dbchain.cloud/applet?
				// https://open.weixin.qq.com/sns/getexpappinfo?appid=wx50497d04e2a5f554&path=pages%2Fnft_option%2Fnft_gain.html?
				// 分享 url
				// https://mytroladmin.dbchain.cloud/home?
				// https://open.weixin.qq.com/sns/getexpappinfo?appid=wx50497d04e2a5f554&path=pages%2Findex%2Findex.html?
				// let json = await this.$api._get(
				//   "https://apply-sign.oss-cn-shenzhen.aliyuncs.com/mytrol/mytrolData.json"
				// );
				// json = json.data;
				let userInfo = getStore("userInfo") || {
					my_code: "968ebaa2",
				};
				let json = {
					share_url: 'https://mytroladmin.dbchain.cloud/home?'
				}
				// if (json.share_url) {
				// 	let url =
				// 		json.share_url +
				// 		`id${this.NFT_item.denom_id}=${userInfo.my_code}` +
				// 		(json.share_url.indexOf(
				// 				"https://open.weixin.qq.com/sns/getexpappinfo?appid=" == -1
				// 			) ?
				// 			"" :
				// 			"#wechat-redirect");
				// 	this.showCanvas = true;
				// 	console.log(url)
				// 	uQRCode
				// 		.make({
				// 			canvasId: "qrcode",
				// 			componentInstance: this,
				// 			size: 72,
				// 			margin: 4,
				// 			text: url,
				// 			backgroundColor: "#ffffff",
				// 			foregroundColor: "#303030",
				// 			fileType: "png",
				// 			errorCorrectLevel: uQRCode.errorCorrectLevel.H,
				// 		})
				// 		.then((res) => {});
				// }
			},
			onLoad(option) {
				if (option.id) {
					this.getNftOption(option.id);
				}
				uni.showToast({
					title: "请截图带有二维码的当前页面并保存分享",
					duration: 5000,
					icon: "none",
				});
			},
			getFormatDateToStr(date) {
				return formatDate(new Date(Number(date)), 3);
			},
			// 获取NFT详情
			async getNftOption(id) {
				let res = await this.$api._get(
					"/dbchain/oracle/nft/nft_detail_of_user_buy/" + id
				);
				let options = {
					...this.NFT_item,
					...res.data.result,
				};
				this.NFT_item = options;
				this.readCanvas();
			},
			// 获取NFT IPFS地址
			getIpfsSrc(url) {
				if (url.indexOf("://") !== -1) {
					return url;
				}
				return config.IpfsUrl + url;
			},
		},
	};
</script>

<style lang="scss" scoped>
	._share_nft {
		background: #1c1c1c;
		min-height: 100vh;

		._cont {
			position: relative;

			._title {
				position: absolute;
				top: 40rpx;
				width: 100%;
				text-align: center;
				color: #fff;
				height: 60rpx;
				font-size: 18px;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #ffffff;
				line-height: 60rpx;
			}

			._img {
				position: absolute;
				top: 600rpx;
				width: 100%;

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

			._NFT_cont {
				._border_view {
					position: absolute;
					left: calc((100% - 540rpx) / 2);
					width: 540rpx;
					height: 540rpx;
					top: 100rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					border-radius: 18px;
					border: 1px solid #aeaeae;

					._NFT_img {
						width: 504rpx;
						height: 504rpx;
						left: calc((100% - 504rpx) / 2);

						image {
							width: 100%;
							height: 100%;
							box-shadow: 0px 0px 16px 0px rgba(53, 53, 53, 0.27);
							border-radius: 16px;
						}
					}
				}
			}

			._desc {
				position: absolute;
				bottom: 342rpx;
				color: #fff;
				padding-left: calc((100% - 540rpx) / 2);

				._t {
					display: flex;
					text-align: left;
					width: 272px;
					overflow-x: hidden;

					._t1 {
						width: 70px;
						height: 24px;
						font-size: 14px;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #d4d4d4;
						line-height: 24px;
					}

					._t2 {
						height: 24px;
						font-size: 16px;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #ffffff;
						line-height: 24px;
						max-width: 200px;
					}
				}
			}

			._ercode {
				position: absolute;
				bottom: 52rpx;
				right: 44rpx;
				border-radius: 4px;

				image {
					width: 144rpx;
					height: 144rpx;
				}

				canvas {
					border-radius: 4px;
					overflow: hidden;
				}
			}

			// background-image: url('https://oss.mytrol.cn/uni_mytrol/icon/share_nft_bg.png');
			// background-size: 100% 100%;
			._bg {
				width: 100%;
				margin: 0 auto;
				padding-top: 3px;

				image {
					width: 100%;
				}
			}
		}
	}
</style>
