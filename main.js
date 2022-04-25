import App from './App'
import {
	showLoading,
	hideLoading
} from '@/static/js/loading.js'
import{getStore,setStore} from '@/static/js/global.js'
// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
// import { IconSvg } from "./components/iconSvg"; // iconSvg
// console.log(IconSvg)
// Vue.component("icon-svg", IconSvg);
import * as api from './js_sdk/general-http/api.js'
//配置公共方法
import common from '@/static/js/common.js'
Vue.prototype.$noMultipleClicks = common.noMultipleClicks;

Vue.prototype.$api = api
Vue.prototype.$showLoading = showLoading;
Vue.prototype.$hideLoading = hideLoading;
import share from './static/js/share.js'

import store from './store'
//把vuex定义成全局组件
Vue.prototype.$store = store
// setStore('vConsole_switch_x', 150)

// setStore('vConsole_switch_x', 150)
// uni.setEnableDebug({
// 	enableDebug: true,
// 	success: () => {
// 		uni.showToast({
// 			title: '打开调试',
// 			duration: 5000,
// 			icon: "none"
// 		});
// 	}
// })

const updateManager = uni.getUpdateManager();

updateManager.onCheckForUpdate(function (res) {
  // 请求完新版本信息的回调
  console.log(res.hasUpdate);
});

updateManager.onUpdateReady(function (res) {
  uni.showModal({
    title: '更新提示',
    content: '新版本已经准备好，是否重启应用？',
    success(res) {
      if (res.confirm) {
        // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
        updateManager.applyUpdate();
      }
    }
  });

});

updateManager.onUpdateFailed(function (res) {
  // 新的版本下载失败
});

Vue.mixin(share)
const app = new Vue({
	...App,
	//挂载
	store
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
// import { IconSvg } from "./components/iconSvg/index.js"; // iconSvg
// console.log(IconSvg)
export function createApp() {
	const app = createSSRApp(App)
	// app.component("icon-svg", IconSvg);
	return {
		app
	}
}
// #endif
