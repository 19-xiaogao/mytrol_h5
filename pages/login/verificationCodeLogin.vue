<template>
  <view class="_m_login">
    <view class="right-box">
      <view class="title">
        <view>账号登录</view>
      </view>
      <view class="title-line"></view>
      <view class="input-box">
        <view class="input-phone">
          <input
            v-model="data.ipone"
            placeholder="请输入手机号码"
            class="input"
            type="number"
            maxlength="11"
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
          <view class="suffix_icon">
            <img
              src="https://mytrol-pub.oss-cn-shenzhen.aliyuncs.com/mytrol/system/close.png"
            />
          </view>
        </view>
        <view class="input-phone tow">
          <input
            v-model="data.code"
            placeholder="请输入短信验证码"
            type="number"
            class="input"
            maxlength="6"
            @change="
              (val) => {
                return changeVal('code', val);
              }
            "
          />
          <span
            class="suffix_send_phone"
            :style="data.hasClick ? 'color:#c7c7c7;' : ''"
            v-bind:disabled="data.hasClick"
            @click="getCode"
            >{{ data.getCodeTxt }}</span
          >
          <view class="prefix_icon">
            <img
              src="https://mytrol-pub.oss-cn-shenzhen.aliyuncs.com/mytrol/system/email.png"
            />
          </view>
        </view>
        <p class="footer" @click="handleLoginClick">账号密码登录</p>
      </view>
      <view class="btn">
        <view class="registerBtn" @click="login">登录</view>
        <p class="registerDecs">
          还有没又账号？<span
            @click="handleRouterClick('/pages/login/register')"
            >注册</span
          >
        </p>
      </view>
      <view class="pg_logo">
        <img
          src="https://mytrol-pub.oss-cn-shenzhen.aliyuncs.com/mytrol/system/bg_logo.png"
        />
      </view>
    </view>
  </view>
</template>

<script>
import rules from "@/static/js/rules.js";
import { setStore, getStore } from "../../static/js/global.js";
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
      },
    };
  },
  methods: {
    handleRouterClick(path, type = false) {
      this.$router.push(path);
    },
    setmessage(type = "error", text) {
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
              return error ? error.message : false;
            }
          );
        default:
          break;
      }
    },
    // 表单验证
    verify_form() {
      let verify_ipone = this.verify_value("ipone");
      if (verify_ipone) {
        this.setmessage("error", verify_ipone);
        this.data.isIpone = false;
        return false;
      }
      return true;
    },

    // 登陆注册
    async login() {
      if (this.verify_form()) {
        let res = await this.$api._post(
          "/dbchain/oracle/nft/loginByVerifyCode",
          {
            phone_number: this.data.ipone,
            verification_code: this.data.code,
          }
        );
        if (res.data.err_code == "0") {
          uni.showToast({
            title: "登录成功",
            duration: 5000,
            icon: "none",
          });
          return this.$router.push("/");
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

      if (this.data.hasClick) {
        return false;
      }

      let result = "Success";
      let time = new Date().getTime();
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
._m_login {
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
        color: #ffa626;
        line-height: 16px;
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
        margin-top: 7px;
        display: flex;
        justify-content: space-between;
        height: 20px;
        font-size: 14px;
        font-weight: 400;

        line-height: 20px;
        margin-bottom: 30px;
        color: #ffa626;

        .registered {
          text-align: left;
          width: 200px;

          view:nth-child(2) {
            color: #ffa626;
            font-weight: 600;
            cursor: pointer;
          }
        }

        .forgot-password {
          color: #ffa626;
          font-weight: 600;
          cursor: pointer;
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
        margin-top: 5px;
        font-size: 14px;
        font-weight: 400;
        color: #ffffff;
        text-align: end;
        span {
          color: #ffa626;
        }
      }
    }
    .pg_logo {
      width: 200px;
      height: 200px;
      margin: 0 auto;
      margin-top: 43px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
