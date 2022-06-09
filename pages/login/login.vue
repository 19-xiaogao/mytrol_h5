<template>
  <view class="_m_login _hideScrollbar">
    <view class="right-box">
      <view class="title">
        <view>登录</view>
        <img
          @click="$router.push('/')"
          src="https://oss.mytrol.cn/uni_mytrol/img/login/title.png"
          alt=""
        />
      </view>
      <view class="input-box">
        <view class="input-phone _m_inp">
          <view>手机号码</view>
          <input
            type="number"
            maxlength="11"
            v-model="data.ipone"
            name=""
            placeholder="请输入手机号码"
            id=""
          />

          <img
            v-if="data.isIpone"
            src="https://oss.mytrol.cn/uni_mytrol/img/login/success.png"
            class="icon"
            alt=""
          />
          <img
            v-else
            src="https://oss.mytrol.cn/uni_mytrol/img/login/failed.png"
            class="icon"
            alt=""
          />
        </view>

        <view class="input-phone _m_inp">
          <view>密码</view>
          <input
            type="password"
            maxlength="18"
            v-model="data.password"
            name=""
            placeholder="请输入密码"
            id=""
            @change="
              (val) => {
                return changeVal('password', val);
              }
            "
            @keyup.enter="login"
          />

          <img
            v-if="data.isPassword"
            src="https://oss.mytrol.cn/uni_mytrol/img/login/success.png"
            class="icon"
            alt=""
          />
          <img
            v-else
            src="https://oss.mytrol.cn/uni_mytrol/img/login/failed.png"
            class="icon"
            alt=""
          />
        </view>
        <view class="footer">
          <view class="registered">
            <!-- <view>还没有账号?&nbsp;&nbsp;</view>
						<view @click="handleRouterClick('/pages/login/register')">注册</view> -->
          </view>
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
          break;
        case "password":
          return rules.FormValidate.Form().validatePsdReg(
            "",
            this.data.password,
            (error) => {
              return error ? error.message : false;
            }
          );
          break;
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
    // setup() {
    //   const { proxy } = getCurrentInstance();
    //   const router = useRouter();
    //   const handleRouterClick = (path) => {
    //     router.push(path);
    //   };
    //   let data = reactive({
    //     ipone: "",
    //     password: "",
    //     isIpone: true,
    //     isPassword: true,
    //   });
  },
};
</script>

<style lang="scss" scoped>
._m_login {
  display: flex;
  width: 100%;
  height: 100%;

  .right-box {
    width: 100%;
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
        height: 56px;

        view {
          height: 26px;
          font-size: 16px;
          font-family: SourceHanSansCN-Regular, SourceHanSansCN SC;
          font-weight: 400;
          color: #000;
          line-height: 26px;
          position: absolute;
          top: -14px;
          z-index: 30;
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
            border-bottom-color: #ff451dff;
          }
        }

        .icon {
          right: 5px;
          top: 18px;
          transform: translateY(-10%);
          position: absolute;
          width: 26px;
          height: 26px;
          border-radius: 4px;
          text-align: center;
        }
      }

      .footer {
        display: flex;
        justify-content: space-between;
        height: 20px;
        font-size: 14px;
        font-family: SourceHanSansCN-Regular, SourceHanSansCN SC;
        font-weight: 400;
        color: #000000;
        line-height: 20px;
        margin-bottom: 30px;
        padding-top: 208px;

        .registered {
          text-align: left;
          width: 200px;

          view:nth-child(2) {
            color: #ff451d;
            font-weight: 600;
            cursor: pointer;
          }
        }

        .forgot-password {
          color: #ff451d;
          font-weight: 600;
          cursor: pointer;
        }
      }
    }

    .btn {
      width: 100%;
      padding-bottom: 38px;

      .registerBtn {
        cursor: pointer;
        width: 100%;
        font-size: 20px;
        color: #ffffff;
        text-align: center;
        height: 58px;
        line-height: 58px;
        background: #2f0088;
        border-radius: 6px;
        background: linear-gradient(270deg, #ff451d 0%, #ffca2a 100%);
      }
    }
  }
}
</style>
