<template>
  <view class="_m_register _hideScrollbar">
    <view class="right-box">
      <view class="title">
        <view>注册</view>
      </view>
      <view class="title-line"></view>
      <view class="input-box">
        <view class="input-phone">
          <input
            class="input"
            type="number"
            maxlength="11"
            v-model="data.ipone"
            name=""
            placeholder="请输入手机号码"
            id=""
            @change="
              (val) => {
                return changeVal('ipone', val);
              }
            "
          />
          <view class="prefix_icon">
            <img
              src="https://mytrol-pub.oss-cn-shenzhen.aliyuncs.com/mytrol/system/phone_icon.png"
            />
          </view>
          <view class="suffix_icon" @click="handleCloseClick">
            <img
              src="https://mytrol-pub.oss-cn-shenzhen.aliyuncs.com/mytrol/system/close.png"
            />
          </view>
        </view>
        <view class="input-phone">
          <input
            type="number"
            class="input"
            v-model="data.code"
            placeholder="请输入短信验证码"
            maxlength="6"
            @change="
              (val) => {
                return changeVal('ipone', val);
              }
            "
          />
          <view
            class="suffix_send_phone"
            :style="data.hasClick ? 'color:#c7c7c7;' : ''"
            v-bind:disabled="data.hasClick"
            @click="getCode"
            >{{ data.getCodeTxt }}</view
          >
          <view class="prefix_icon">
            <img
              src="https://mytrol-pub.oss-cn-shenzhen.aliyuncs.com/mytrol/system/email.png"
            />
          </view>
        </view>
        <view class="input-phone">
          <input
            class="input"
            v-model="data.password"
            placeholder="含有数字、大小写字母"
            type="password"
            maxlength="18"
            @change="
              (val) => {
                return changeVal('ipone', val);
              }
            "
          />
          <view class="prefix_icon">
            <img
              src="https://mytrol-pub.oss-cn-shenzhen.aliyuncs.com/mytrol/system/password_icon.png"
            />
          </view>
          <view class="suffix_icon">
            <img
              src="https://mytrol-pub.oss-cn-shenzhen.aliyuncs.com/mytrol/system/tip.png"
            />
          </view>
        </view>
        <view class="input-phone tow">
          <input
            class="input"
            v-model="data.password2"
            placeholder="请再次输入密码"
            type="password"
            maxlength="18"
            @change="
              (val) => {
                return changeVal('ipone', val);
              }
            "
          />
          <view class="prefix_icon">
            <img
              src="https://mytrol-pub.oss-cn-shenzhen.aliyuncs.com/mytrol/system/password_icon.png"
            />
          </view>
          <view class="suffix_icon">
            <img
              src="https://mytrol-pub.oss-cn-shenzhen.aliyuncs.com/mytrol/system/tip.png"
            />
          </view>
        </view>
        <p class="password_tip" v-if="data.password2 !== data.password">
          两次密码不相同!
        </p>
      </view>
      <view class="btn">
        <p class="registerDecs">
          已经有账号?<span @click="handleLoginClick">返回登录</span>
        </p>
        <view class="registerBtn" @click="login">注册</view>
      </view>
    </view>
  </view>
</template>
<script>
import rules from "@/static/js/rules.js";
import { setStore, getStore } from "../../static/js/global.js";
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
        isUserDoc: true,
      },
    };
  },
  methods: {
    setmessage(type = "error", text) {
      uni.showToast({
        title: text,
        duration: 5000,
        icon: "none",
      });
    },
    handleCloseClick() {
      this.data.ipone = "";
    },
    handleRouterClick(path, type = false) {
      this.$router.push(path);
    },
    // 单个表单验证
    verify_value(key) {
      switch (key) {
        case "ipone":
          return rules.FormValidate.Form().validatePhone(
            "",
            this.data.ipone,
            (error) => {
              return error ? error.message : false;
            }
          );
          break;
        case "password":
          return rules.FormValidate.Form().validatePsdReg(
            "",
            this.data.password,
            (error) => {
              return error ? error.message : false;
            }
          );
        case "password2":
          if (!this.data.password2) {
            return "请再次输入密码";
          }
          return this.data.password == this.data.password2
            ? undefined
            : "两次密码不一致";
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
      if (verify_ipone) {
        this.setmessage("error", verify_ipone);
        this.data.isIpone = false;
        return false;
      }

      let verify_password = this.verify_value("password");
      if (verify_password) {
        this.setmessage("error", verify_password);
        this.data.isPassword = false;
        return false;
      }

      let verify_password2 = this.verify_value("password2");
      if (verify_password2) {
        this.setmessage("error", verify_password2);
        this.data.isPassword2 = false;
        return false;
      }
      return true;
    },
    initDataParams() {
      const data = {
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
        isUserDoc: true,
      };
      this.data = data;
    },
    async login() {
      if (this.verify_form()) {
        let res = await this.$api._post("/dbchain/oracle/nft/register", {
          phone_number: this.data.ipone,
          password: this.data.password,
          verification_code: this.data.code,
          // invitation_code: this.data.InvitationCode,
        });
        if (res.data.err_code == "0") {
          uni.showToast({
            title: "注册成功，请登录",
            duration: 5000,
            icon: "none",
          });
          this.initDataParams();

          setTimeout(() => {
            this.handleRouterClick("/pages/login/login");
          }, 1000);
        }
      }
    },
    //
    // 获取验证码
    async getCode() {
      let verify_ipone = this.verify_value("ipone");
      if (verify_ipone) {
        this.setmessage("error", verify_ipone);
        this.data.isIpone = false;
        return false;
      }

      this.data.hasClick = true;

      let result = "Success";
      let time = new Date().getTime();
      result = await this.$api._get(
        "/dbchain/oracle/nft/send_verf_code/register/" + this.data.ipone
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
      }, 1000);
    },

    //
    changeVal(key, val) {
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
      this.$router.push("/pages/login/login");
    },
  },
};
</script>
<style lang="scss" scoped>
._m_register {
  display: flex;
  width: 100%;
  height: 100vh;
  background: #1c1c1c;
  .right-box {
    width: 100%;
    margin-top: 88px;
    padding-left: 31px;
    padding-right: 31px;
    box-sizing: border-box;

    .title {
      display: flex;
      justify-content: flex-start;
      view {
        font-size: 30px;
        font-weight: 400;
        color: #ffffff;
      }
    }
    .title-line {
      width: 100%;
      height: 1px;
      background: #939393;
      margin: 27px 0;
    }

    .input-box {
      .tow {
        margin-bottom: 0px !important;
      }
      .password_tip {
        margin-top: 10px;
        font-size: 14px;
        font-weight: 400;
        color: #ffffff;
        line-height: 16px;
        text-align: right;
      }
      .input-phone {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        margin-bottom: 30px;
        position: relative;
        height: 50px;

        .input {
          box-sizing: border-box;
          padding-left: 41px;
          font-size: 14px;
          height: 100%;
          color: #fff;
          letter-spacing: 1.2px;
          width: 100%;
          border-radius: 4px 4px 4px 4px;
          overflow: hidden;
          background: rgba(115, 115, 115, 0.2);
          input:focus {
            color: #fff;
          }
        }
        .prefix_icon {
          position: absolute;
          width: 30px;
          height: 30px;
          top: 50%;
          left: 6px;
          transform: translateY(-50%);
          img {
            width: 100%;
            height: 100%;
          }
        }
        .suffix_icon {
          position: absolute;
          width: 30px;
          height: 30px;
          top: 50%;
          right: 6px;
          transform: translateY(-50%);
          z-index: 11;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .suffix_send_phone {
          position: absolute;

          top: 50%;
          right: 10px;
          transform: translateY(-50%);
          z-index: 11;
          font-size: 14px;
          font-weight: 400;
          color: #ffa626;
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
            color: #ff451d;
            font-weight: 600;
            cursor: pointer;
          }
        }
      }
    }
  }

  .btn {
    width: 100%;
    padding-top: 65px;

    .registerBtn {
      cursor: pointer;
      width: 100%;
      font-size: 20px;
      color: #ffffff;
      text-align: center;
      height: 58px;
      line-height: 58px;
      border-radius: 6px;
      background: linear-gradient(168deg, #ffbc21 0%, #ff932a 100%);
      border-radius: 4px 4px 4px 4px;
      opacity: 1;
    }
    .registerDecs {
      margin-bottom: 5px;
      font-size: 14px;
      font-weight: 400;
      color: #ffffff;
      text-align: end;
      span {
        color: #ffa626;
      }
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
