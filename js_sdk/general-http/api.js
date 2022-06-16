import Http from "./http";
import config from "./config";
import { http_code } from "./code.js";
import { setStore, getStore } from "@/static/js/global.js";


const http = new Http();
http.config.baseURL = config.baseURL;
const { upload, get, post } = http;

import { showLoading, hideLoading } from "@/static/js/loading.js";

let TimeLoding = false; //定时器，用于关闭打开loding的延时
let lockLoding = false; // 锁，用于锁住loding
// 关闭loding预处理
let closeLoding = (num = 3000) => {
  if (lockLoding) {
    return clearTimeout(TimeLoding);
  }
  clearTimeout(TimeLoding);
  TimeLoding = setTimeout(() => {
    lockLoding = false;
    uni.hideLoading();
  }, num);
};

let openLoding = (config = {}) => {
  let setApiLoding = (config) => {
    for (var i = 0; i < returnLodingApi.length; i++) {
      let res = returnLodingApi[i];
      if (config.url.indexOf(res) !== -1) return true;
    }
    return false;
  };
  if (setApiLoding(config)) return false;
  if (!lockLoding) {
    lockLoding = true;
  }
  return uni.showLoading({
    title: "加载中",
    mask: true,
  });
};

/**
 * 定义阻止弹出窗的api地址
 */
const returnApiAlert = [
  "/dbchain/oracle/nft/user_info", //获取用户信息
];

/**
 * 定义阻止请求失败弹出窗的api地址
 */
const returnErrorApiAlert = [
  "/dbchain/oracle/nft/user_info", //获取用户信息
  "/dbchain/oracle/nft/nft_wechatpay_result/", //轮询微信支付结果
];

/**
 * 定义阻止loding的api地址
 * @param {*} type
 * @param {*} message
 * @param {*} responce
 */
const returnLodingApi = [
  // "/dbchain/tx-simple-result/", //轮询
  // // "/dbchain/oracle/nft/nft_save_receipt_initiative", //获取单个NFT
  // // "/dbchain/oracle/nft/lastest_nft", // 获取nft列表
  // '/dbchain/oracle/nft/nft_wechatpay_result/', //轮询微信支付结果
];

let setApiDispose = () => { };

// //取消重复请求
let pending = []; //声明一个数组用于存储每个请求的取消函数和axios标识
let cancelToken = http.CancelToken;
let removePending = (config) => {
  let data = JSON.stringify(config.data) ? JSON.stringify(config.data) : "";
  for (let p in pending) {
    if (
      pending[p].u ===
      http.config.baseURL + config.url + data + "&" + config.method ||
      pending[p].u === config.url + data + "&" + config.method
    ) {
      // 每一个请求在返回时解锁
      lockLoding = false;
      closeLoding();
      //当前请求在数组中存在时执行函数体
      pending[p].f(); //执行取消操作
      pending.splice(p, 1);
    }
  }
};

function getCookie(name) {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg))
    return unescape(arr[2]);
  else
    return null;
}
// 请求拦截器

http.interceptor.request = (config) => {
  removePending(config); //在一个axios发送前执行一下取消操作
  config.header.cookie = getCookie('go_session_id');
  // 每一个请求在发送时锁住，用于响应返回时等2s无后续请求则关闭    
  lockLoding = true;
  uni.showLoading({
    title: "加载中",
    mask: true,
  });
  //发起请求时，取消掉当前正在进行的相同请求
  config.cancelToken = new cancelToken((c) => {
    // 请求地址&请求方式
    let data = JSON.stringify(config.data) ? JSON.stringify(config.data) : "";
    // 指定参数page
    // let page = JSON.stringify(config.params.page) ? JSON.stringify(config.params.page) : '';
    pending.push({
      u: config.url + data + "&" + config.method,
      f: c,
    });
  });
};

let old_api = {
  url: "",
  methods: "",
}; //记录旧的登录过期的api，以便再次请求
http.interceptor.response = (response) => {
  removePending(response.config); //在一个axios响应后再执行一下取消操作，把已经完成的请求从pending中移除
  if (
    response &&
    response.header &&
    response.header["Set-Cookie"] &&
    response.config.url.indexOf("/nft/auth_code_to_register_login") !== -1
  ) {
    wx.setStorageSync("go_session_id", response.header["Set-Cookie"]); //保存Cookie到Storage
  }

  // 每一个请求在返回时解锁
  lockLoding = false;

  // 登录失败重新自动登录
  if (response.data.err_code == "2" || response.data.err_code == "4" || response.data.err_code == "5") {
    uni.navigateTo({
      url: '/pages/login/login'
    })
  }
  if (response.data.err_code == "28") {
    uni.navigateTo({
      url: "/pages/system/maintain"
    })
  }

  if (!(response.data.err_code == "0" || response.data.err_code == "2")) {
    uni.showToast({
      title: http_code[response.data.err_code],
      duration: 5000,
      icon: "none",
    });
  }
  uni.hideLoading();
  return response;
};

const test = (data) => get("ajax/echo/text?name=uni-app", data);
const _get = (url) => get(url);
const _post = (url, data) => post(url, data);
export { test, _get, _post };
