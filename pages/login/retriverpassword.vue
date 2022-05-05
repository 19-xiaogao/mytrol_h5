<template>
	<view class="_m_login _m_register _hideScrollbar">
		<view class="right-box">
			<view class="title">
				<view class='_span'>重置密码</view>
				<img @click="$router.push('/')" src="https://oss.mytrol.cn/uni_mytrol/img/login/title.png" alt="" />
			</view>
			<view class="input-box">
				<view class="input-phone _m_inp">
					<view class='_span'>手机号码</view>
					<input v-model="data.ipone" placeholder="请输入手机号码" type="number" maxlength="11" @change="
              (val) => {
                return changeVal('ipone', val);
              }
            " />
					<img v-if="data.isIpone" src="https://oss.mytrol.cn/uni_mytrol/img/login/success.png" class="icon"
						alt="" />
					<img v-else src="https://oss.mytrol.cn/uni_mytrol/img/login/failed.png" class="icon" alt="" />
				</view>
				<view class="input-phone _m_inp">
					<view class='_span'>短信验证码</view>
					<input v-model="data.code" placeholder="请输入短信验证码" type="number" maxlength="6" @change="
              (val) => {
                return changeVal('code', val);
              }
            " />
					<span class="verifey-code" :style="data.hasClick ? 'color:#c7c7c7;' : ''"
						v-bind:disabled="data.hasClick" @click="getCode">{{ data.getCodeTxt }}</span>
				</view>
				<view class="input-phone _m_inp">
					<view class='_span'>设置密码</view>
					<!-- <img src="https://oss.mytrol.cn/uni_mytrol/img/login/waring.png" class="icon waring" /> -->

					<input v-model="data.password" placeholder="请输入新密码" type="password" maxlength="18" @change="
              (val) => {
                return changeVal('password', val);
              }
            " />
				</view>
				<view class="input-phone _m_inp">
					<view class='_span'>确定密码</view>
					<input v-model="data.password2" type="password" maxlength="18" placeholder="请再次输入新密码" @change="
              (val) => {
                return changeVal('password2', val);
              }
            " />
				</view>
				<view class="footer">
					<view class="registered">
						<view class='_span'>返回&nbsp;&nbsp;</view>
						<view @click="handleLoginClick">登录</view>
					</view>
				</view>
			</view>
			<view class="btn">
				<view class="registerBtn" @click="login">重置密码</view>
			</view>
		</view>
	</view>
</template>

<script>
	import rules from "@/static/js/rules.js";
	import {
		setStore,
		getStore
	} from "../../static/js/global.js";
	export default {
		components: {},
		data() {
			return {
				isVerification: 0,
				data: {
					ipone: "",
					password: "",
					password2: "",
					code: "",

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
						if (!this.data.password2) {
							return "请再次输入密码";
						}
						return this.data.password == this.data.password2 ? undefined : "两次密码不一致";
						break;

					default:
						break;
				}
			},
			// 表单验证
			verify_form() {
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
					this.setmessage("error", verify_password2);
					this.data.isPassword2 = false;
					return false;
				}

				console.log("验证成功");
				return true;
			},

			// 登陆注册
			async login() {
				if (this.verify_form()) {
					console.log("提交");
					let res = await this.$api._post("/dbchain/oracle/nft/reset_password", {
						phone_number: this.data.ipone,
						password: this.data.password,
						verification_code: this.data.code,
					});
					console.log(res);
					if (res.data.err_code == "0") {
						this.setmessage("success", "重置密码成功，请重新登录");
						return this.$router.push("/pages/login/login");
					}
				}
			},
			//
			// 获取验证码
			async getCode() {
				console.log('xxxxxxx')
				let verify_ipone = this.verify_value("ipone");
				console.log(verify_ipone);
				if (verify_ipone) {
					this.setmessage("error", verify_ipone);
					this.data.isIpone = false;
					return false;
				}

				if(this.data.hasClick ){
					return false
				}

				let result = "Success";
				let time = new Date().getTime();
				console.log(time);
        console.log(this.data, 'iphone5555')
				result = await this.$api._get(
					"/dbchain/oracle/nft/send_verf_code/reset_password/" + this.data.ipone
				);

				if (result.data.err_code !== "0" && result.data.result !== "Success") {
					this.data.getCodeTxt = "重新获取";
					this.data.hasClick = false;
					return;
				}

				this.setmessage("success", "短信验证码已发送");
				this.isValidateCode = true;
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
				console.log(type);
				if (type == "admin") {
					this.isVerification = 1;
				} else if (type === "slider") {
					console.log(type);
					this.isVerification = 0;
				}
			},
			handleLoginClick() {
				this.$router.push("/pages/login/login");
			},

			submitRegister() {
				// dbchain/oracle/nft/reset_password
			},
		},
		// setup() {
		//   const { proxy } = getCurrentInstance();
		//   console.log(proxy);
		//   // 数据集合
		//   let data = reactive({
		//     ipone: "",
		//     password: "",
		//     password2: "",
		//     code: "",

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
		//   // 表单验证
		//   let verify_form = () => {
		//     let verify_ipone = verify_value("ipone");
		//     console.log(verify_ipone);
		//     if (verify_ipone) {
		//       setmessage("error", verify_ipone);
		//       data.isIpone = false;
		//       return false;
		//     }

		//     let verify_password = verify_value("password");
		//     console.log(verify_password);
		//     if (verify_password) {
		//       setmessage("error", verify_password);
		//       data.isPassword = false;
		//       return false;
		//     }

		//     let verify_password2 = verify_value("password2");
		//     console.log(verify_password2);
		//     if (verify_password2) {
		//       setmessage("error", verify_password2);
		//       data.isPassword2 = false;
		//       return false;
		//     }

		//     console.log("验证成功");
		//     return true;
		//   };

		//   // 登陆注册
		//   let login = async () => {
		//     if (verify_form()) {
		//       console.log("提交");
		//       let res = await _post("/dbchain/oracle/nft/reset_password", {
		//         tel: data.ipone,
		//         password: data.password,
		//         verification_code: data.code,
		//       });
		//       console.log(res);
		//       if (res.err_code == "0") {
		//         setmessage("success", "重置密码成功，请重新登录");
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
		//       "/dbchain/oracle/nft/send_verf_code/reset_password/" + data.ipone
		//     );

		//     if (result.data.err_code !== "0" && result.data.result !== "Success") {
		//       data.getCodeTxt = "重新获取";
		//       data.hasClick = false;
		//       return;
		//     }
		//     proxy.$store.commit("setIsLoding", false);
		//     setmessage("success", "短信验证码已发送");
		//     proxy.isValidateCode = true;
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
		//   };
		// },
		// data() {
		//   return {
		//     isVerification: 0,
		//   };
		// },
		// methods: {
		//   verifyResult(type, result) {
		//     console.log(type);
		//     if (type == "admin") {
		//       this.isVerification = 1;
		//     } else if (type === "slider") {
		//       console.log(type);
		//       this.isVerification = 0;
		//     }
		//   },
		//   handleLoginClick() {
		//     this.$router.push("/login");
		//   },

		//   submitRegister() {
		//     // dbchain/oracle/nft/reset_password
		//   },
		// },
	};
</script>

<style lang="scss" scoped>
	._m_login {
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

				span {
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
						top: 30px;
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
						top: 32px;
						transform: translateY(-10%);
						cursor: pointer;
						color: #FF451Dff;
						font-weight: 600;
						left: unset;
						z-index: 99;
					}

					span {
						height: 26px;
						font-size: 16px;
						font-family: SourceHanSansCN-Regular, SourceHanSansCN SC;
						font-weight: 400;
						color: #FF451D;
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
							border-bottom-color: #FF451Dff;
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
							color: #FF451D;
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

				span:nth-of-type(2) {
					cursor: pointer;
					color: #FF451Dff;
				}
			}

			.registerBtn {
				cursor: pointer;
				height: 58px;
				line-height: 58px;
				text-align: center;
				border-radius: 6px;
				width: 100%;
				font-size: 20px;
				color: #ffffff;
				background: linear-gradient(270deg, #FF451D 0%, #FFCA2A 100%);
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
