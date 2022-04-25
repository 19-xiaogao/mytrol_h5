<template>
	<view class="page">
		<view class="main1">
			<view class="outer2 flex-row justify-between">
				<view class="mod1"></view>
			</view>
			<view class="outer3"></view>
			<view class="outer4 flex-row justify-between">
				<input class="info1" placeholder="手机号" maxlength="11" v-model="phone" type="number" @input="
            (val) => {
              return changePhone(val);
            }
          " />
				<button class="main2" @click="getCode(phone)">
					<span class="info2">{{ getCodeTxt }}</span>
				</button>
			</view>
			<view class="outer5"></view>
			<input class="word1" placeholder="验证码" maxlength="8" v-model="code" />
			<view class="outer6"></view>
			<image :src="src1" mode="widthFix" class="outer7" @click="handleConfirm(phone)"></image>
			<view class="outer8"></view>
		</view>
		<span class="code">白名单验证码获取</span>
		<image :src="src2" mode="widthFix" class="logo"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone: "",
				code: "",
				getCodeTxt: "获取验证码",
				timer: null,
				src1: "https://mytrol-pub.oss-cn-shenzhen.aliyuncs.com/mytrol/h5WebSite/2.png",
				src2: "https://mytrol-pub.oss-cn-shenzhen.aliyuncs.com/mytrol/h5WebSite/1.png",
			};
		},
		methods: {
			async getCode(val) {
				const Reg = /^[1][345678][0-9]{9}$/;

				if (Reg.test(val)) {
					const res = await this.$api._get(
						"/dbchain/oracle/nft/send_verf_code/register/" + val
					);

					if (res.data.err_code === "0") {
						this.setmessage("success", "短信验证码已发送");
						let num = 60;
						this.timer = setInterval(() => {
							--num;
							this.getCodeTxt = num + "s";
							if (num === 0) {
								this.getCodeTxt = "重新获取";
								clearInterval(this.timer);
							}
						}, 1000);
					}
					return;
				}
				this.setmessage("fail", "格式不正确");
			},

			changePhone(res) {
				if (res.detail.value === "") {
					this.getCodeTxt = "获取验证码";
				}
			},

			async handleConfirm() {},

			setmessage(type = "error", text) {
				uni.showToast({
					title: text,
					duration: 5000,
					icon: "none",
				});
			},
		},
	};
</script>

<style lang="scss" scoped>
	.page {
		position: relative;
		width: 100%;
		background-color: rgba(28, 28, 28, 1);

		.main1 {
			width: 375px;
			height: 723px;

			.outer2 {
				width: 194px;
				height: 37px;
				margin: 11px 0 0 13px;

				.mod1 {
					width: 146px;
					height: 35px;
					margin-top: 2px;
				}
			}

			.outer3 {
				width: 32px;
				height: 5px;
				background-color: rgba(255, 255, 255, 1);
				margin: 46px 0 0 30px;
			}

			.outer4 {
				position: relative;
				width: 317px;
				height: 33px;
				margin: 59px 0 0 30px;

				.info1 {
					width: 200px;
					display: block;
					overflow-wrap: break-word;
					color: #FFFFFF;
					font-size: 15px;
					white-space: nowrap;
					line-height: 20px;
				}

				.main2 {
					position: absolute;
					top: 0;
					left: 100%;
					margin-left: -90px;
					height: 33px;
					border-radius: 3px;
					background: #1c1c1c;
					border: 0.5px solid rgba(255, 255, 255, 1);
					width: 89px;

					.info2 {
						display: block;
						color: rgba(255, 255, 255, 1);
						font-size: 14px;
						white-space: nowrap;
						line-height: 33px;
						margin-left: -2px;
					}
				}
			}

			.outer5 {
				width: 316px;
				height: 2px;
				background-color: rgba(255, 255, 255, 0.5);
				margin: 3px 0 0 30px;
			}

			.word1 {
				width: 200px;
				display: block;
				overflow-wrap: break-word;
				color: #FFFFFF;
				font-size: 15px;
				white-space: nowrap;
				line-height: 20px;
				margin: 42px 0 0 30px;
			}

			.outer6 {
				width: 316px;
				height: 2px;
				background-color: rgba(255, 255, 255, 0.5);
				margin: 3px 0 0 30px;
			}

			.outer7 {
				height: 44px;
				background: url(https://mytrol-pub.oss-cn-shenzhen.aliyuncs.com/mytrol/h5WebSite/2.png) 0px 0px no-repeat;
				width: 316px;
				margin: 55px 0 0 30px;
			}

			.outer8 {
				width: 232px;
				height: 233px;
				margin: 40px 0 0 72px;
			}
		}

		.code {
			z-index: 16;
			position: absolute;
			left: 30px;
			top: 36px;
			width: 224px;
			height: 39px;
			display: block;
			overflow-wrap: break-word;
			color: rgba(255, 255, 255, 1);
			font-size: 28px;
			font-family: PingFangSC-Medium;
			white-space: nowrap;
			line-height: 28px;
			text-align: left;
		}

		.logo {
			position: absolute;
			top: 401px;
			left: 71px;
			width: 233px;
			height: 234px;
		}
	}
</style>
