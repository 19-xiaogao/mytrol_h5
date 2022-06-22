<template>
  <view class="_m_login _hideScrollbar">
    <view class="right-box">
      <view class="title">
        <view>账号登录</view>
      </view>
      <view class="title-line"></view>
      <view class="input-box">
        <view class="input-phone">
          <input
            type="number"
            class="input"
            maxlength="11"
            v-model="data.ipone"
            name=""
            placeholder="请输入手机号码"
            id=""
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

        <view class="input-phone tow">
          <input
            type="password"
            maxlength="18"
            class="input"
            v-model="data.password"
            name=""
            id="passwordInput"
            placeholder="请输入密码"
            @change="
              (val) => {
                return changeVal('password', val);
              }
            "
            @keyup.enter="login"
          />
          <view class="prefix_icon">
            <img
              src="https://mytrol-pub.oss-cn-shenzhen.aliyuncs.com/mytrol/system/password_icon.png"
            />
          </view>
          <view class="suffix_icon" @click="handleLookPasswordClick">
            <img
              id="passwordIcon"
              src="https://mytrol-pub.oss-cn-shenzhen.aliyuncs.com/mytrol/system/lookPassword.png"
            />
          </view>
        </view>
        <view class="footer">
          <view class="forgot-password">
            <view
              @click="handleRouterClick('/pages/login/verificationCodeLogin')"
              >验证码登录</view
            >
          </view>
          <!-- <view class="forgot-password"> 验证码登录 </view> -->
          <view
            class="forgot-password"
            @click="handleRouterClick('/pages/login/retriverpassword')"
          >
            忘记密码
          </view>
        </view>
      </view>

      <view class="btn">
        <view class="registerBtn" @click="login">登录</view>
        <p class="registerDecs">
          还有没有账号？<span
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
import { setStore, getStore, getQueryUrl } from "@/static/js/global.js";
export default {
  data() {
    return {
      data: {
        ipone: "",
        password: "",
        isIpone: true,
        isPassword: true,
        myCode: "",
        privateSale: false,
        privateSaleId: 0,
        isShowPassWordType: false,
      },
    };
  },
  mounted() {
    this.init();
    this.isPrivateEntry();
    this.isMaintain();
  },
  methods: {
    init() {
      let url = location.search;
      let my_code = getQueryUrl(url);
      setStore("my_code", my_code);
    },
    isPrivateEntry() {
      if (window.location.href.split("?")[1]) {
        const privateSale = window.location.href.split("?")[1].split("=")[0];
        const privateSaleId = window.location.href.split("?")[1].split("=")[2];
        if (privateSale === "privateSale") {
          this.privateSale = true;
          this.privateSaleId = privateSaleId;
        } else {
          this.privateSale = false;
        }
      }
    },
    handleCloseClick() {
      this.data.ipone = "";
    },
    handleLookPasswordClick() {
      const inputElement = document.querySelectorAll(".uni-input-input")[1];
      if (inputElement.type === "password") {
        inputElement.type = "text";
        document.querySelector("#passwordIcon").src =
          "https://mytrol-pub.oss-cn-shenzhen.aliyuncs.com/mytrol/system/eyesClosed.png";
      } else {
        inputElement.type = "password";
        document.querySelector("#passwordIcon").src =
          "https://mytrol-pub.oss-cn-shenzhen.aliyuncs.com/mytrol/system/lookPassword.png";
      }
    },
    isMaintain() {
      this.$api._get("/dbchain/oracle/nft/get_system_status").then((res) => {
        console.log(res);
        if (res.data.result.status === "maintenance") {
          uni.navigateTo({
            url: "/pages/system/maintain",
          });
        }
      });
    },

    setmessage(type = "error", text) {
      uni.showToast({
        title: text,
        duration: 5000,
        icon: "none",
      });
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
        case "password":
          return rules.FormValidate.Form().validatePsdReg(
            "",
            this.data.password,
            (error) => {
              return error ? error.message : false;
            }
          );
        default:
          break;
      }
    },
    changeVal(key, val) {
      switch (key) {
        case "ipone":
          if (this.verify_value(key)) {
            this.data.isIpone = false;
          } else {
            this.data.isIpone = true;
          }
          break;
        case "password":
          if (this.verify_value(key)) {
            this.data.isPassword = false;
          } else {
            this.data.isPassword = true;
          }
          break;
        default:
          break;
      }
    },
    //   // 表单验证
    verify_form() {
      let verify_ipone = this.verify_value("ipone");
      if (verify_ipone) {
        this.setmessage("error", verify_ipone);
        this.data.isIpone = false;
        return false;
      }

      let verify_password = this.verify_value("password");
      if (this.verify_password) {
        this.setmessage("error", "verify_password");
        this.data.isPassword = false;
        return false;
      }
      return true;
    },

    //
    changeVal(key, val) {
      switch (key) {
        case "ipone":
          if (this.verify_value(key)) {
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
    async login() {
      if (this.verify_form()) {
        let res = await this.$api._post("/dbchain/oracle/nft/login", {
          phone_number: this.data.ipone,
          password: this.data.password,
          // my_code: getStore('my_code')
        });
        if (res.data.err_code == "0") {
          setStore("user_id", res.data.result.user_id);
          uni.showToast({
            title: "登录成功",
            duration: 5000,
            icon: "none",
          });
          if (this.privateSale) {
            return this.$router.push(
              `/pages/nft_option/exchange_nft?id=${this.privateSaleId}`
            );
          }
          return this.$router.push("/");
        }
      }
    },
    handleRouterClick(path, type = false) {
      this.$router.push(path);
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
