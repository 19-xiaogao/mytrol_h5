import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
		JSONList:{},//首页轮播图 ip 列表
		userInfo:null, //个人信息
		buy_nft:null,// 已购买nft
		orderList:null,//订单 
		isTost:false,//title	String	'请稍后'	loading提示文字	
					// type	String	'square'	loading框类型	square | rectangle
					// loading-type	String	'ring'	loading动画	ring | fade-ball | scale-line | flower
					// radius	String, Number	'8'	loading框圆角值	
					// z-index	String, Number	'10076'	同css	
					// mask-alpha	Number	0.2	遮罩透明度	
					// animation	String	'fade'	loading框的动画类型	fade | slide-down | slide-up | zoom-lessen
					// bg-color	HexColor, RgbColor	'#494949'	loading框背景色	
					// ft-color	HexColor	'#fff'	loading框前景色（ 不可使用rgb()与rgba() ）	
					// duration	Number	250	动画演出时间	
					// hide-delay	Number	50	隐藏延时，防止数据加载过快，组件没渲染完就执行了hide()方法，而导致报错	
					// negative-top	Number	0	加载框向上的偏移量
		buy_html:'',//支付页面暂存	
		is_whitelisted: false // 是否能够白名单购买
	},
    mutations: {
		setJSONList(state, data = {}){
			state.JSONList=data
		},
		setBuyList(state, arr = []) {
			state.buy_nft = arr;
		},
		setOrderList(state,arr=[]){
			state.orderList = arr;
		},
		setUserInfo(state,arr={}){
			state.userInfo = {};
		},
		setIsTost(state,tost=true){
			state.isTost=tost
		},
		setBuyHtml(state,html){
			state.buy_html=html
		},
		setWhiteList(state, list){
			state.is_whitelisted = list
		}
	},
    actions: {
		
	}
})
export default store