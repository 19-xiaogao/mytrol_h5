(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-nft_option-nft_gain~pages-nft_option-nft_option"],{"123d":function(t,e,i){"use strict";var n;i.d(e,"b",(function(){return r})),i.d(e,"c",(function(){return a})),i.d(e,"a",(function(){return n}));var r=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"_time"},[t.$store.state.is_whitelisted?["1"==t.isBuy?i("v-uni-view",{staticClass:"_presell"},[i("v-uni-view",{staticClass:"_t2"},[i("v-uni-view",{staticClass:"p1"},[t._v("即将开售")]),i("v-uni-view",[t._v(t._s(t.count_down))])],1)],1):t._e(),"3"==t.isBuy?i("v-uni-view",{staticClass:"_presell _not_buy"},[i("v-uni-view",{staticClass:"_t2"},[i("v-uni-view",{staticClass:"p1"},[t._v("已售罄")])],1)],1):t._e(),"2"==t.isBuy?i("v-uni-view",{staticClass:"_right",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.$noMultipleClicks(t.collect)}}},[i("v-uni-image",{staticClass:"image",attrs:{src:"https://oss.mytrol.cn/uni_mytrol/icon/buy_1.png",mode:"widthFix"}}),i("v-uni-view",{staticClass:"_t2"},[t._v(t._s("3"==t.buyStatus?"立刻购买":"可领取"))])],1):t._e()]:i("v-uni-view",{staticClass:"_right"},[i("v-uni-view",{staticClass:"_t2"},[t._v("无法购买")])],1)],2)},a=[]},"129a":function(t,e,i){"use strict";var n=i("4ea4");i("99af"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,i("96cf");var r=n(i("1da1")),a=i("0841"),o={data:function(){return{timer:"",count_down:[],isBuy:"0",outTime:!1,showRedeem:!1}},created:function(){this.getTime()},props:{getFree:{default:"true"},buyStatus:{default:"3"},publishTime:{default:"1636960980000"},NFT_item:{default:{}}},methods:{showModel:function(){uni.showToast({title:"请检查是否已领取过或是否有邀请新用户",duration:5e3,icon:"none"})},drawNFT:function(){return this.$emit("TimeClick",!1)},getTime:function(){if(this.publishTime){if(this.NFT_item.number-this.NFT_item.counter_sold_nft<1)return this.isBuy="3";var t=this.publishTime.length<13?this.publishTime+"000":this.publishTime;console.log(t);var e=(new Date).getTime();if(console.log(e),e>t)return clearInterval(this.timer),this.isBuy="2";this.isBuy="1";var i=(0,a.intervalTime)(t,e),n=i[0]>0?24*i[0]+i[1]:i[1],r=n>9?n:"0"+n,o=i[2]>9?i[2]:"0"+i[2],s=i[3]>9?i[3]:"0"+i[3],d="".concat(r,":").concat(o,":").concat(s);this.count_down=d,this.isBuy=r<1&&o<1&&s<1?"2":"1"}},collect:function(t){return this.$emit("TimeClick",!0)},redeemNft:function(){var t=this;return(0,r.default)(regeneratorRuntime.mark((function e(){var i,n,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t.redeem_code){e.next=2;break}return e.abrupt("return",!1);case 2:return n={redeem_code:t.redeem_code},e.next=5,that.$api._post("/dbchain/oracle/nft/redeem_free",n);case 5:if(r=e.sent,!(null===(i=r.data.result)||void 0===i?void 0:i.order_id)){e.next=8;break}return e.abrupt("return",uni.reLaunch({url:"/pages/index/index?key=main"}));case 8:case"end":return e.stop()}}),e)})))()}},computed:{},mounted:function(){this.timer=setInterval(this.getTime,5e3)},beforeDestroy:function(){clearInterval(this.timer)}};e.default=o},"24a6":function(t,e,i){var n=i("d841");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var r=i("4f06").default;r("e1828e60",n,!0,{sourceMap:!1,shadowMode:!1})},2655:function(t,e,i){"use strict";var n=i("24a6"),r=i.n(n);r.a},"35a11":function(t,e,i){"use strict";i.r(e);var n=i("776c"),r=i("899b");for(var a in r)"default"!==a&&function(t){i.d(e,t,(function(){return r[t]}))}(a);i("fad5");var o,s=i("f0c5"),d=Object(s["a"])(r["default"],n["b"],n["c"],!1,null,"7187be23",null,!1,n["a"],o);e["default"]=d.exports},"47a8":function(t,e,i){var n=i("be7f");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var r=i("4f06").default;r("cc5915a2",n,!0,{sourceMap:!1,shadowMode:!1})},"776c":function(t,e,i){"use strict";var n;i.d(e,"b",(function(){return r})),i.d(e,"c",(function(){return a})),i.d(e,"a",(function(){return n}));var r=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"option_template"},[i("v-uni-view",{staticClass:"_nft_img"},[i("v-uni-view",{staticClass:"empty",class:[t.loadImg>1?"_animation_img":""]},[i("v-uni-view",{staticClass:"_img"},[i("v-uni-image",{staticClass:"_img_default",attrs:{src:t.getIpfsSrc(t.NFT_item.file),mode:""},on:{error:function(e){arguments[0]=e=t.$handleEvent(e),t.onErrorImg(t.NFT_item)},load:function(e){arguments[0]=e=t.$handleEvent(e),t.onSuccessImg(t.NFT_item)}}})],1),i("v-uni-view",{staticClass:"_img1",class:[t.isGif(t.getIpfsSrc(t.NFT_item.file),null)?"none_img":""]},[i("v-uni-image",{staticClass:"_img_default",attrs:{src:"https://oss.dbchain.cloud/uni_mytrol_applet/img/nft_bg1.png",mode:""},on:{error:function(e){arguments[0]=e=t.$handleEvent(e),t.onErrorImg()},load:function(e){arguments[0]=e=t.$handleEvent(e),t.onSuccessImg()}}})],1),i("v-uni-view",{staticClass:"_img2"},[i("v-uni-image",{staticClass:"_img_default",attrs:{src:"https://oss.dbchain.cloud/uni_mytrol_applet/img/nft_bg2.png",mode:""},on:{error:function(e){arguments[0]=e=t.$handleEvent(e),t.onErrorImg()},load:function(e){arguments[0]=e=t.$handleEvent(e),t.onSuccessImg()}}})],1),i("v-uni-view",{staticClass:"_img_light"},[i("v-uni-image",{attrs:{src:t.isGif(t.getIpfsSrc(t.NFT_item.file),"img_light"),mode:"widthFix"}})],1)],1),t._t("footer",[i("v-uni-view",{staticClass:"_fot_img"},[i("v-uni-image",{attrs:{src:"https://oss.dbchain.cloud/uni_mytrol_applet/img/mock/nft_fot.png",mode:""}})],1)])],2),t._t("option")],2)},a=[]},"899b":function(t,e,i){"use strict";i.r(e);var n=i("d866"),r=i.n(n);for(var a in n)"default"!==a&&function(t){i.d(e,t,(function(){return n[t]}))}(a);e["default"]=r.a},a712:function(t,e,i){"use strict";i("c975"),Object.defineProperty(e,"__esModule",{value:!0}),e.isGif=void 0;var n=i("0841"),r=[{img2:"https://oss.mytrol.cn/uni_mytrol/img/nft_bg2.png",img_light:"https://oss.mytrol.cn/uni_mytrol/img/nft_light_1.png",img_foot:"https://oss.mytrol.cn/uni_mytrol/icon/my_nft_option_nft_bg.png"},{img2:"https://oss.mytrol.cn/uni_mytrol/img/nft_bg2.png",img_light:"https://oss.mytrol.cn/uni_mytrol/img/nft_light_2.png",img_foot:"http://oss.mytrol.cn/uni_mytrol/img/my_nft_option_nft_bg_1.png"}],a=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"img_light",i=(0,n.getFileType)(t),a="";console.log(i,e);var o=["gif"];return a=-1!==o.indexOf(i)?!e||r[1][e]:!!e&&r[0][e],console.log(a),a};e.isGif=a},be7f:function(t,e,i){var n=i("24fb");e=n(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.option_template ._nav[data-v-7187be23]{display:flex;height:67px;color:#fff;position:absolute;height:70px;width:100vw;top:0;left:0;z-index:999999999999}.option_template ._nav ._back[data-v-7187be23]{width:40px;height:40px;position:absolute;top:23px;z-index:999999999999}.option_template ._nav ._back uni-image[data-v-7187be23]{width:inherit;height:inherit}.option_template ._nav ._tit[data-v-7187be23]{width:100%;text-align:center;position:absolute;top:27px;pointer-events:none}.option_template .empty[data-v-7187be23]{width:100%;height:100%;position:relative;min-height:294px;padding:40px 0 0}.option_template ._nft_img[data-v-7187be23]{-webkit-perspective:500px;perspective:500px;position:relative}.option_template ._nft_img ._img1[data-v-7187be23]{position:absolute;left:calc((100vw - 280px) / 2);top:40px;width:280px;height:280px;z-index:2;-webkit-transform-style:preserve-3d;transform-style:preserve-3d}.option_template ._nft_img ._img1 uni-image[data-v-7187be23]{width:inherit;height:inherit}.option_template ._nft_img ._img2[data-v-7187be23]{position:absolute;left:calc((100vw - 264px) / 2);top:47px;width:264px;height:264px;z-index:3;-webkit-transform-style:preserve-3d;transform-style:preserve-3d;display:none}.option_template ._nft_img ._img2 uni-image[data-v-7187be23]{width:inherit;height:inherit}.option_template ._nft_img ._img[data-v-7187be23]{width:270px;height:270px;margin:0 auto;border-radius:18px;display:flex;justify-content:center;align-items:center;position:relative;-webkit-transform-style:preserve-3d;transform-style:preserve-3d;z-index:9999999999;top:4px}@-webkit-keyframes router-data-v-7187be23{0%{-webkit-transform:rotateY(0deg);transform:rotateY(0deg)}25%{-webkit-transform:rotateY(10deg);transform:rotateY(10deg)}50%{-webkit-transform:rotateY(20deg);transform:rotateY(20deg)}75%{-webkit-transform:rotateY(10deg);transform:rotateY(10deg)}100%{-webkit-transform:rotateY(0deg);transform:rotateY(0deg)}}@keyframes router-data-v-7187be23{0%{-webkit-transform:rotateY(0deg);transform:rotateY(0deg)}25%{-webkit-transform:rotateY(10deg);transform:rotateY(10deg)}50%{-webkit-transform:rotateY(20deg);transform:rotateY(20deg)}75%{-webkit-transform:rotateY(10deg);transform:rotateY(10deg)}100%{-webkit-transform:rotateY(0deg);transform:rotateY(0deg)}}@-webkit-keyframes router1-data-v-7187be23{0%{-webkit-transform:rotateY(0deg);transform:rotateY(0deg)}33%{-webkit-transform:rotateY(15deg);transform:rotateY(15deg)}66%{-webkit-transform:rotateY(-15deg);transform:rotateY(-15deg)}100%{-webkit-transform:rotateY(0deg);transform:rotateY(0deg)}}@keyframes router1-data-v-7187be23{0%{-webkit-transform:rotateY(0deg);transform:rotateY(0deg)}33%{-webkit-transform:rotateY(15deg);transform:rotateY(15deg)}66%{-webkit-transform:rotateY(-15deg);transform:rotateY(-15deg)}100%{-webkit-transform:rotateY(0deg);transform:rotateY(0deg)}}@-webkit-keyframes router2-data-v-7187be23{0%{-webkit-transform:rotateY(0deg);transform:rotateY(0deg)}33%{-webkit-transform:rotateY(16deg);transform:rotateY(16deg)}66%{-webkit-transform:rotateY(-16deg);transform:rotateY(-16deg)}100%{-webkit-transform:rotateY(0deg);transform:rotateY(0deg)}}@keyframes router2-data-v-7187be23{0%{-webkit-transform:rotateY(0deg);transform:rotateY(0deg)}33%{-webkit-transform:rotateY(16deg);transform:rotateY(16deg)}66%{-webkit-transform:rotateY(-16deg);transform:rotateY(-16deg)}100%{-webkit-transform:rotateY(0deg);transform:rotateY(0deg)}}.option_template ._nft_img ._img ._img_default[data-v-7187be23]{width:252px;height:252px;border-radius:18px;z-index:9999}.option_template ._nft_img ._img ._img_hot[data-v-7187be23]{width:36px;height:36px;position:absolute;bottom:30px;right:30px;z-index:inherit}.option_template ._nft_img ._img_light[data-v-7187be23]{position:absolute;top:-68px;left:0;width:100vw;z-index:-1;pointer-events:none}.option_template ._nft_img ._img_light uni-image[data-v-7187be23]{width:inherit;pointer-events:none}.option_template ._nft_img ._fot_img[data-v-7187be23]{width:215px;height:89px;margin:0 auto;position:relative;top:-8px}.option_template ._nft_img ._fot_img uni-image[data-v-7187be23]{width:inherit;height:inherit}.option_template ._animation_img ._img1[data-v-7187be23]{-webkit-animation:router1-data-v-7187be23 7s linear infinite;animation:router1-data-v-7187be23 7s linear infinite}.option_template ._animation_img ._img2[data-v-7187be23]{-webkit-animation:router1-data-v-7187be23 7s linear infinite;animation:router1-data-v-7187be23 7s linear infinite}.option_template ._animation_img ._img[data-v-7187be23]{-webkit-animation:router1-data-v-7187be23 7s linear infinite;animation:router1-data-v-7187be23 7s linear infinite}',""]),t.exports=e},d841:function(t,e,i){var n=i("24fb");e=n(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */._time[data-v-2de39937]{position:absolute;right:8px;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%)}._time ._right[data-v-2de39937]{display:flex;width:126px;height:40px;justify-content:center;align-items:center;margin-right:10px}._time ._right .image[data-v-2de39937]{width:24px;height:24px;margin-right:4px}._time ._right ._t2[data-v-2de39937]{height:24px;font-size:16px;font-family:PingFangSC-Regular,PingFang SC;font-weight:400;color:#fff;line-height:24px}._time ._presell[data-v-2de39937]{display:flex;min-width:126px;height:40px;padding:0 13px;border-radius:8px;justify-content:center;align-items:center}._time ._presell .image[data-v-2de39937]{width:18px;height:18px;margin-right:4px}._time ._presell ._t2[data-v-2de39937]{font-size:16px;font-family:SourceHanSansCN-Medium,SourceHanSansCN;font-weight:500;color:#fff;display:flex;flex-direction:column;width:100%;align-items:center}._time ._presell ._t2 .p2[data-v-2de39937]{font-size:14px}._time ._not_buy[data-v-2de39937]{justify-content:flex-end}._time ._not_buy ._t2[data-v-2de39937]{width:unset}.but-box[data-v-2de39937]{position:fixed;bottom:4px}._redeem_btn ._buy[data-v-2de39937],\r\n._redeem_btn ._redeem[data-v-2de39937]{width:95vw;margin:0 auto;height:62px;background:#ffbd21;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%);position:fixed;bottom:21px;box-shadow:0 2px 16px 6px rgba(31,31,31,.5);border-radius:12px;overflow:hidden;z-index:4}._redeem_btn ._buy .button-background-img[data-v-2de39937],\r\n._redeem_btn ._redeem .button-background-img[data-v-2de39937]{position:absolute;width:100%;height:100%}._redeem_btn ._buy .price-box[data-v-2de39937],\r\n._redeem_btn ._redeem .price-box[data-v-2de39937]{position:absolute;left:10px;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);z-index:1;display:flex;align-items:flex-end}._redeem_btn ._buy .price-box .price[data-v-2de39937],\r\n._redeem_btn ._redeem .price-box .price[data-v-2de39937]{color:#fff;margin-left:14px}._redeem_btn ._buy .price-box .price .p1[data-v-2de39937],\r\n._redeem_btn ._redeem .price-box .price .p1[data-v-2de39937]{font-weight:400;font-size:12px}._redeem_btn ._buy .price-box .price .p2[data-v-2de39937],\r\n._redeem_btn ._redeem .price-box .price .p2[data-v-2de39937]{font-weight:500;font-size:20px}._redeem_btn ._buy .price-box .remaining[data-v-2de39937],\r\n._redeem_btn ._redeem .price-box .remaining[data-v-2de39937]{font-size:12px;font-weight:500;color:#fff;margin-left:14px;padding-bottom:2px}._redeem_btn ._buy ._left[data-v-2de39937],\r\n._redeem_btn ._redeem ._left[data-v-2de39937]{padding-left:22px}._redeem_btn ._buy ._left ._t1[data-v-2de39937],\r\n._redeem_btn ._redeem ._left ._t1[data-v-2de39937]{height:14px;font-size:12px;font-family:PingFangSC-Regular,PingFang SC;font-weight:400;color:#fff;line-height:14px}._redeem_btn ._buy ._left ._t2[data-v-2de39937],\r\n._redeem_btn ._redeem ._left ._t2[data-v-2de39937]{height:24px;font-size:20px;font-family:Roboto-Medium,Roboto;font-weight:500;color:#fff;line-height:24px}._redeem_btn ._buy ._no_publish[data-v-2de39937],\r\n._redeem_btn ._redeem ._no_publish[data-v-2de39937]{text-align:center;align-items:center;color:#e2e2e2;position:relative;z-index:2;height:100%;\r\n  /* line-height: 100%; */line-height:62px;font-size:18px}._redeem_btn ._buy ._flex[data-v-2de39937],\r\n._redeem_btn ._redeem ._flex[data-v-2de39937]{display:flex;align-items:center;height:100%;justify-content:space-around}._redeem_btn ._buy ._flex .input-box[data-v-2de39937],\r\n._redeem_btn ._redeem ._flex .input-box[data-v-2de39937]{height:41px;width:207px}._redeem_btn ._buy ._flex .input-box uni-input[data-v-2de39937],\r\n._redeem_btn ._redeem ._flex .input-box uni-input[data-v-2de39937]{height:inherit;border-radius:8px;margin-left:10px}._redeem_btn ._buy ._flex ._free_btn[data-v-2de39937],\r\n._redeem_btn ._redeem ._flex ._free_btn[data-v-2de39937]{color:#fff;position:relative;opacity:.7}._redeem_btn ._buy ._flex ._free_text[data-v-2de39937],\r\n._redeem_btn ._redeem ._flex ._free_text[data-v-2de39937]{opacity:1}',""]),t.exports=e},d866:function(t,e,i){"use strict";var n=i("4ea4");i("c975"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=n(i("88a8")),a=(i("0841"),i("a712")),o={data:function(){return{loadImg:0}},props:{NFT_item:{required:!0,default:{avatar:"",code:"",created_at:"",created_by:"",description:"",file:"",id:"",name:"",nickname:"",number:"",price:"",published_at:"",tx_hash:"",user_id:"",hot:"",desc_img:"",remaining:"",collected_number:""}}},methods:{getIpfsSrc:function(t){return-1!==t.indexOf("://")?t:r.default.IpfsUrl+t},isGif:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"img2";return(0,a.isGif)(t,e)},onSuccessImg:function(t){this.loadImg+=1},onErrorImg:function(t){},longtap:function(){}}};e.default=o},fad5:function(t,e,i){"use strict";var n=i("47a8"),r=i.n(n);r.a},fbbf:function(t,e,i){"use strict";i.r(e);var n=i("129a"),r=i.n(n);for(var a in n)"default"!==a&&function(t){i.d(e,t,(function(){return n[t]}))}(a);e["default"]=r.a},fbc2:function(t,e,i){"use strict";i.r(e);var n=i("123d"),r=i("fbbf");for(var a in r)"default"!==a&&function(t){i.d(e,t,(function(){return r[t]}))}(a);i("2655");var o,s=i("f0c5"),d=Object(s["a"])(r["default"],n["b"],n["c"],!1,null,"2de39937",null,!1,n["a"],o);e["default"]=d.exports}}]);