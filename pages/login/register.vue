<template>
	<view class="_m_register _hideScrollbar">
		<view class="right-box">
			<view class="title">
				<view>注册</view>
				<img @click="$router.push('/')" src="https://oss.mytrol.cn/uni_mytrol/img/login/title.png" alt="" />
			</view>
			<view class="input-box">
				<view class="input-phone _m_inp">
					<view class="_span">手机号码</view>
					<input type="number" maxlength="11" v-model="data.ipone" name="" placeholder="请输入手机号码" id=""
						@change="
              (val) => {
                return changeVal('ipone', val);
              }
            " />

					<img v-if="data.isIpone" src="https://oss.mytrol.cn/uni_mytrol/img/login/success.png" class="icon"
						alt="" />
					<img v-else src="https://oss.mytrol.cn/uni_mytrol/img/login/failed.png" class="icon" alt="" />
				</view>
				<view class="input-phone _m_inp">
					<view class="_span">短信验证码</view>
					<input type="number" v-model="data.code" placeholder="请输入短信验证码" maxlength="6" @change="
              (val) => {
                return changeVal('ipone', val);
              }
					            " />

					<view class="verifey-code" :style="data.hasClick ? 'color:#c7c7c7;' : ''"
						v-bind:disabled="data.hasClick" @click="getCode" v-preventReClick>{{ data.getCodeTxt }}</view>
				</view>
				<view class="input-phone _m_inp">
					<view class="_span">设置密码</view>
					<img src="https://oss.mytrol.cn/uni_mytrol/img/login/waring.png" class="icon waring" />
					<input v-model="data.password" placeholder="含有数字、大写字母、小写字母、特殊字符中" type="password" maxlength="18"
						@change="
              (val) => {
                return changeVal('ipone', val);
              }
					            " />

				</view>
				<view class="input-phone _m_inp">
					<view class="_span">确定密码</view>
					<input v-model="data.password2" placeholder="请再次输入密码" type="password" maxlength="18" @change="
              (val) => {
                return changeVal('ipone', val);
              }
            "></input>
				</view>
				<view class="input-phone _m_inp">
					<view class="_span">邀请码</view>
					<input :disabled="isCode" v-model="data.InvitationCode" placeholder="请输入邀请码(选填)" maxlength="8"
						@change="
              (val) => {
                return changeVal('ipone', val);
              }
            "></input>
				</view>
				<view class="footer">
					<view class="registered">
						<view>已经有账号?&nbsp;&nbsp;请</view>
						<view @click="handleLoginClick">登录</view>
					</view>
				</view>
			</view>
			<view class="btn">
				<!-- <view class="checkbox">
					<input type="checkbox" v-model="data.isUserDoc" />

					<view> 我已阅读并同意 </view>
					<view>《用户协议》和《隐私条款》</view>
				</view> -->
				<view class="registerBtn" v-points="1000" @click="login">注册</view>
			</view>
		</view>
		<!-- <view class="mask" v-show="isVerification === 1">
      <PuzzleVerification
        @clone="verifyResult"
        :onSuccess="verifyResult"
        :verificationShow="isVerification"
      />
	  
	  
	  
	  
	  
	  
    </view> -->
	</view>
</template>
<script>
	import rules from "@/static/js/rules.js";
	import {
		setStore,
		getStore
	} from "../../static/js/global.js";
	export default {
		components: {
			// PuzzleVerification,
		},
		data() {
			return {
				isVerification: 0,
				data: {
					ipone: "",
					password: "",
					password2: "",
					code: "",
					InvitationCode: "",

					isIpone: true,
					isPassword: true,
					isPassword2: true,
					isCode: true,
					hasClick: false,
					getCodeTxt: "获取验证码",
					isUserDoc: false,
				}
			}
		},
		methods: {
			setmessage(type = 'error', text) {
				uni.showToast({
					title: text,
					duration: 5000,
					icon: "none",
				});
			},
			handleRouterClick(path, type = false) {
				this.$router.push(path)
			},
			// 单个表单验证
			verify_value(key) {
				switch (key) {
					case "ipone":
						return rules.FormValidate.Form().validatePhone(
							"",
							this.data.ipone,
							(error) => {
								console.log(error);
								return error ? error.message : false;
							}
						);
						break;
					case "password":
						return rules.FormValidate.Form().validatePsdReg(
							"",
							this.data.password,
							(error) => {
								console.log(error);
								return error ? error.message : false;
							}
						);
					case "password2":
						if (!data.password2) {
							return "请再次输入密码";
						}
						return this.data.password == this.data.password2 ? undefined : "两次密码不一致";
						break;

					default:
						break;
				}
			},
			verify_form() {
				if (!this.data.isUserDoc) {
					this.setmessage("error", "请先勾选用户协议和隐私政策");
					return false;
				}
				let verify_ipone = this.verify_value("ipone");
				console.log(verify_ipone);
				if (verify_ipone) {
					this.setmessage("error", verify_ipone);
					this.data.isIpone = false;
					return false;
				}

				let verify_password = this.verify_value("password");
				console.log(verify_password);
				if (verify_password) {
					this.setmessage("error", verify_password);
					this.data.isPassword = false;
					return false;
				}

				let verify_password2 = this.verify_value("password2");
				console.log(verify_password2);
				if (verify_password2) {
					setmessage("error", verify_password2);
					this.data.isPassword2 = false;
					return false;
				}

				console.log("验证成功");
				return true;
			},
			async login() {
				if (verify_form()) {
					console.log("提交");
					let res = await this.$api._post("/dbchain/oracle/nft/register", {
						tel: this.data.ipone,
						password: this.data.password,
						verification_code: this.data.code,
						invitation_code: this.data.InvitationCode,
					});
					console.log(res);
					if (res.err_code == "0") {
						this.setmessage("success", "注册成功，请登录");
						return handleRouterClick("/login");
					}
				}
			},
			//
			// 获取验证码
			async getCode() {
				let verify_ipone = this.verify_value("ipone");
				console.log(verify_ipone);
				if (verify_ipone) {
					this.setmessage("error", verify_ipone);
					this.data.isIpone = false;
					return false;
				}

				data.hasClick = true;

				let result = "Success";
				let time = new Date().getTime();
				console.log(time);
				result = await this.$api._get(
					"/dbchain/oracle/nft/send_verf_code/register/" + data.ipone
				);
				if (result.data.err_code !== "0" && result.data.result !== "Success") {
					this.data.getCodeTxt = "重新获取";
					this.data.hasClick = false;
					return;
				}
				this.setmessage("success", "短信验证码已发送");

				//  this.hasClick = false;
				let wait = 60;
				this.data.getCodeTxt = "60";
				let timer = setInterval(() => {
					if (wait > 0) {
						wait--;
						this.data.getCodeTxt = wait + "S";
						this.data.hasClick = true;
					} else {
						this.data.getCodeTxt = "重新获取";
						this.data.hasClick = false;
						wait = 60;
						clearInterval(timer);
					}
				}, 5000);
			},

			//
			changeVal(key, val) {
				console.log(key, val);
				switch (key) {
					case "ipone":
						if (verify_value(key)) {
							this.data.isIpone = false;
						} else {
							this.data.isIpone = true;
						}
						break;
					case "password":
						if (verify_value(key)) {
							this.data.isPassword = false;
						} else {
							this.data.isPassword = true;
						}
						break;
					default:
						break;
				}

			},
			verifyResult(type, result) {
				if (type == "admin") {
					this.isVerification = 1;
				} else if (type === "slider") {
					this.isVerification = 0;
				}
			},
			handleLoginClick() {
				this.$router.push("/login");
			},
			// setup() {
			//   const { proxy } = getCurrentInstance();
			//   console.log(proxy);
			//   let isCode = getQueryString("inviteCode") ? true : false;
			//   // 数据集合
			//   let data = reactive({
			//     ipone: "",
			//     password: "",
			//     password2: "",
			//     code: "",
			//     InvitationCode: getQueryString("inviteCode") || "",

			//     isIpone: true,
			//     isPassword: true,
			//     isPassword2: true,
			//     isCode: true,
			//     hasClick: false,
			//     getCodeTxt: "获取验证码",

			//     isUserDoc: false,
			//   });
			//   // 单个表单验证
			//   let verify_value = (key) => {
			//     switch (key) {
			//       case "ipone":
			//         return rules.FormValidate.Form().validatePhone(
			//           "",
			//           data.ipone,
			//           (error) => {
			//             console.log(error);
			//             return error ? error.message : false;
			//           }
			//         );
			//         break;
			//       case "password":
			//         return rules.FormValidate.Form().validatePsdReg(
			//           "",
			//           data.password,
			//           (error) => {
			//             console.log(error);
			//             return error ? error.message : false;
			//           }
			//         );
			//       case "password2":
			//         if (!data.password2) {
			//           return "请再次输入密码";
			//         }
			//         return data.password == data.password2 ? undefined : "两次密码不一致";
			//         break;

			//       default:
			//         break;
			//     }
			//   };

			//   // 登陆注册
			//   let login = async () => {
			//     if (verify_form()) {
			//       console.log("提交");
			//       let res = await _post("/dbchain/oracle/nft/register", {
			//         tel: data.ipone,
			//         password: data.password,
			//         verification_code: data.code,
			//         invitation_code: data.InvitationCode,
			//       });
			//       console.log(res);
			//       if (res.err_code == "0") {
			//         setmessage("success", "注册成功，请登录");
			//         return proxy.$router.push("/login");
			//       }
			//     }
			//   };
			//   //
			//   // 获取验证码
			//   let getCode = async () => {
			//     let verify_ipone = verify_value("ipone");
			//     console.log(verify_ipone);
			//     if (verify_ipone) {
			//       setmessage("error", verify_ipone);
			//       data.isIpone = false;
			//       return false;
			//     }

			//     data.hasClick = true;

			//     let result = "Success";
			//     let time = new Date().getTime();
			//     console.log(time);
			//     result = await _get(
			//       "/dbchain/oracle/nft/send_verf_code/register/" + data.ipone
			//     );
			//     if (result.data.err_code !== "0" && result.data.result !== "Success") {
			//       data.getCodeTxt = "重新获取";
			//       data.hasClick = false;
			//       return;
			//     }
			//     proxy.$store.commit("setIsLoding", false);
			//     setmessage("success", "短信验证码已发送");

			//     //  this.hasClick = false;
			//     let wait = 60;
			//     data.getCodeTxt = "60";
			//     let timer = setInterval(() => {
			//       if (wait > 0) {
			//         wait--;
			//         data.getCodeTxt = wait + "S";
			//         data.hasClick = true;
			//       } else {
			//         data.getCodeTxt = "重新获取";
			//         data.hasClick = false;
			//         wait = 60;
			//         clearInterval(timer);
			//       }
			//     }, 1000);
			//   };

			//   //
			//   let changeVal = (key, val) => {
			//     console.log(key, val);
			//     switch (key) {
			//       case "ipone":
			//         if (verify_value(key)) {
			//           data.isIpone = false;
			//         } else {
			//           data.isIpone = true;
			//         }
			//         break;
			//       case "password":
			//         if (verify_value(key)) {
			//           data.isPassword = false;
			//         } else {
			//           data.isPassword = true;
			//         }
			//         break;
			//       default:
			//         break;
			//     }
			//   };
			//   return {
			//     data,
			//     login,
			//     changeVal,
			//     getCode,
			//     isCode,
			//   };
			// },
		}
	};
</script>
<style lang="scss" scoped>
	._m_register {
		display: flex;
		width: 100%;
		height: 100%;

		.right-box {
			width: 100%;
			height: 100%;
			margin-top: 46px;
			padding-left: 12px;
			padding-right: 12px;

			.title {
				display: flex;
				text-align: center;
				align-items: center;
				justify-content: center;

				view {
					width: 60px;
					height: 46px;
					font-size: 30px;
					font-family: SourceHanSansCN-Medium, SourceHanSansCN SC;
					font-weight: 500;
					color: #000000;
				}
			}

			.input-box {
				margin-top: 47px;

				.input-phone {
					display: flex;
					flex-direction: column;
					justify-content: flex-start;
					margin-bottom: 26px;
					position: relative;

					.icon {
						right: 5px;
						top: 28px;
						transform: translateY(-10%);
						position: absolute;
						width: 26px;
						height: 26px;
						border-radius: 4px;
						text-align: center;
					}

					.waring {
						cursor: pointer;
					}

					.verifey-code {
						position: absolute;
						right: 10px !important;
						top: 28px;
						transform: translateY(-10%);
						cursor: pointer;
						color: #2f0088ff;
						font-weight: 600;
						left: unset;
					}
					._span{
						    height: 6.933vw;
						    font-size: 4.267vw;
						    font-family: SourceHanSansCN-Regular,SourceHanSansCN SC;
						    font-weight: 400;
						    color: #2f0088;
						    line-height: 6.933vw;
						    position: absolute;
						    top: -3.733vw;
						    z-index: 1;
						    background: #fff;
						    left: 3.467vw;
					}

					view {
						height: 26px;
						font-size: 16px;
						font-family: SourceHanSansCN-Regular, SourceHanSansCN SC;
						font-weight: 400;
						color: #2f0088;
						line-height: 26px;
						position: absolute;
						top: -14px;
						z-index: 1;
						background: #fff;
						left: 13px;
					}

					input {
						font-size: 18px;
						margin-top: 20px;
						// font-size: 12px;
						width: 100%;
						padding-bottom: 2px;
						border-bottom: 2px solid #cacaca;

						&:focus {
							border-bottom-color: #2f0088ff;
						}
					}
				}

				.footer {
					display: flex;
					justify-content: flex-end;

					.registered {
						text-align: right;
						width: 30%;
						min-width: 169px;
						font-size: 14px;
						font-family: SourceHanSansCN-Regular, SourceHanSansCN SC;
						font-weight: 400;
						color: #000000;
						display: flex;
						justify-content: flex-end;
						view:nth-child(2) {
							color: #2f0088;
							font-weight: 600;
							cursor: pointer;
						}
					}
				}
			}
		}

		.btn {
			width: 100%;
			margin-top: 57px;
			padding-bottom: 38px;

			.checkbox {
				margin-bottom: 12px;
				display: flex;
				align-items: center;
				font-size: 16px;
				font-weight: 600;
				color: #000000;
				font-size: 14px;
				font-family: SourceHanSansCN-Regular, SourceHanSansCN SC;
				font-weight: 400;
				color: #000000;
				line-height: 20px;

				input {
					cursor: pointer;
				}

				view:nth-of-type(2) {
					cursor: pointer;
					color: #FF451Dff;
				}
			}

			.registerBtn {
				cursor: pointer;
				height: 58px;
				line-height: 58px;
				text-align: center;
				background: #FF451D;
				border-radius: 6px;
				width: 100%;
				font-size: 20px;
				color: #ffffff;
				background-color: #FF451Dff;
			}
		}

		.mask {
			width: 100%;
			height: 100%;
			position: fixed;
			top: 0;
			left: 0;
			background: rgba(242, 242, 242, 0.7);
		}
	}
</style>
