(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-swiper_option-swiper_option"],{"14b1":function(t,r,e){"use strict";var n=e("28bc"),o=e.n(n);o.a},"1da1":function(t,r,e){"use strict";function n(t,r,e,n,o,i,a){try{var c=t[i](a),u=c.value}catch(s){return void e(s)}c.done?r(u):Promise.resolve(u).then(n,o)}function o(t){return function(){var r=this,e=arguments;return new Promise((function(o,i){var a=t.apply(r,e);function c(t){n(a,o,i,c,u,"next",t)}function u(t){n(a,o,i,c,u,"throw",t)}c(void 0)}))}}e("d3b7"),Object.defineProperty(r,"__esModule",{value:!0}),r.default=o},2096:function(t,r,e){"use strict";e.r(r);var n=e("f313"),o=e("e1b9");for(var i in o)"default"!==i&&function(t){e.d(r,t,(function(){return o[t]}))}(i);e("14b1");var a,c=e("f0c5"),u=Object(c["a"])(o["default"],n["b"],n["c"],!1,null,"501f1362",null,!1,n["a"],a);r["default"]=u.exports},"28bc":function(t,r,e){var n=e("dd65");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var o=e("4f06").default;o("0b4a8d3c",n,!0,{sourceMap:!1,shadowMode:!1})},"96cf":function(t,r){!function(r){"use strict";var e,n=Object.prototype,o=n.hasOwnProperty,i="function"===typeof Symbol?Symbol:{},a=i.iterator||"@@iterator",c=i.asyncIterator||"@@asyncIterator",u=i.toStringTag||"@@toStringTag",s="object"===typeof t,f=r.regeneratorRuntime;if(f)s&&(t.exports=f);else{f=r.regeneratorRuntime=s?t.exports:{},f.wrap=_;var l="suspendedStart",h="suspendedYield",p="executing",d="completed",v={},y={};y[a]=function(){return this};var g=Object.getPrototypeOf,w=g&&g(g(G([])));w&&w!==n&&o.call(w,a)&&(y=w);var m=E.prototype=x.prototype=Object.create(y);L.prototype=m.constructor=E,E.constructor=L,E[u]=L.displayName="GeneratorFunction",f.isGeneratorFunction=function(t){var r="function"===typeof t&&t.constructor;return!!r&&(r===L||"GeneratorFunction"===(r.displayName||r.name))},f.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,E):(t.__proto__=E,u in t||(t[u]="GeneratorFunction")),t.prototype=Object.create(m),t},f.awrap=function(t){return{__await:t}},k(j.prototype),j.prototype[c]=function(){return this},f.AsyncIterator=j,f.async=function(t,r,e,n){var o=new j(_(t,r,e,n));return f.isGeneratorFunction(r)?o:o.next().then((function(t){return t.done?t.value:o.next()}))},k(m),m[u]="Generator",m[a]=function(){return this},m.toString=function(){return"[object Generator]"},f.keys=function(t){var r=[];for(var e in t)r.push(e);return r.reverse(),function e(){while(r.length){var n=r.pop();if(n in t)return e.value=n,e.done=!1,e}return e.done=!0,e}},f.values=G,P.prototype={constructor:P,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(T),!t)for(var r in this)"t"===r.charAt(0)&&o.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0],r=t.completion;if("throw"===r.type)throw r.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var r=this;function n(n,o){return c.type="throw",c.arg=t,r.next=n,o&&(r.method="next",r.arg=e),!!o}for(var i=this.tryEntries.length-1;i>=0;--i){var a=this.tryEntries[i],c=a.completion;if("root"===a.tryLoc)return n("end");if(a.tryLoc<=this.prev){var u=o.call(a,"catchLoc"),s=o.call(a,"finallyLoc");if(u&&s){if(this.prev<a.catchLoc)return n(a.catchLoc,!0);if(this.prev<a.finallyLoc)return n(a.finallyLoc)}else if(u){if(this.prev<a.catchLoc)return n(a.catchLoc,!0)}else{if(!s)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return n(a.finallyLoc)}}}},abrupt:function(t,r){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc<=this.prev&&o.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var i=n;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=r&&r<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=r,i?(this.method="next",this.next=i.finallyLoc,v):this.complete(a)},complete:function(t,r){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&r&&(this.next=r),v},finish:function(t){for(var r=this.tryEntries.length-1;r>=0;--r){var e=this.tryEntries[r];if(e.finallyLoc===t)return this.complete(e.completion,e.afterLoc),T(e),v}},catch:function(t){for(var r=this.tryEntries.length-1;r>=0;--r){var e=this.tryEntries[r];if(e.tryLoc===t){var n=e.completion;if("throw"===n.type){var o=n.arg;T(e)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,r,n){return this.delegate={iterator:G(t),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=e),v}}}function _(t,r,e,n){var o=r&&r.prototype instanceof x?r:x,i=Object.create(o.prototype),a=new P(n||[]);return i._invoke=O(t,e,a),i}function b(t,r,e){try{return{type:"normal",arg:t.call(r,e)}}catch(n){return{type:"throw",arg:n}}}function x(){}function L(){}function E(){}function k(t){["next","throw","return"].forEach((function(r){t[r]=function(t){return this._invoke(r,t)}}))}function j(t){function r(e,n,i,a){var c=b(t[e],t,n);if("throw"!==c.type){var u=c.arg,s=u.value;return s&&"object"===typeof s&&o.call(s,"__await")?Promise.resolve(s.__await).then((function(t){r("next",t,i,a)}),(function(t){r("throw",t,i,a)})):Promise.resolve(s).then((function(t){u.value=t,i(u)}),(function(t){return r("throw",t,i,a)}))}a(c.arg)}var e;function n(t,n){function o(){return new Promise((function(e,o){r(t,n,e,o)}))}return e=e?e.then(o,o):o()}this._invoke=n}function O(t,r,e){var n=l;return function(o,i){if(n===p)throw new Error("Generator is already running");if(n===d){if("throw"===o)throw i;return S()}e.method=o,e.arg=i;while(1){var a=e.delegate;if(a){var c=F(a,e);if(c){if(c===v)continue;return c}}if("next"===e.method)e.sent=e._sent=e.arg;else if("throw"===e.method){if(n===l)throw n=d,e.arg;e.dispatchException(e.arg)}else"return"===e.method&&e.abrupt("return",e.arg);n=p;var u=b(t,r,e);if("normal"===u.type){if(n=e.done?d:h,u.arg===v)continue;return{value:u.arg,done:e.done}}"throw"===u.type&&(n=d,e.method="throw",e.arg=u.arg)}}}function F(t,r){var n=t.iterator[r.method];if(n===e){if(r.delegate=null,"throw"===r.method){if(t.iterator.return&&(r.method="return",r.arg=e,F(t,r),"throw"===r.method))return v;r.method="throw",r.arg=new TypeError("The iterator does not provide a 'throw' method")}return v}var o=b(n,t.iterator,r.arg);if("throw"===o.type)return r.method="throw",r.arg=o.arg,r.delegate=null,v;var i=o.arg;return i?i.done?(r[t.resultName]=i.value,r.next=t.nextLoc,"return"!==r.method&&(r.method="next",r.arg=e),r.delegate=null,v):i:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,v)}function N(t){var r={tryLoc:t[0]};1 in t&&(r.catchLoc=t[1]),2 in t&&(r.finallyLoc=t[2],r.afterLoc=t[3]),this.tryEntries.push(r)}function T(t){var r=t.completion||{};r.type="normal",delete r.arg,t.completion=r}function P(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(N,this),this.reset(!0)}function G(t){if(t){var r=t[a];if(r)return r.call(t);if("function"===typeof t.next)return t;if(!isNaN(t.length)){var n=-1,i=function r(){while(++n<t.length)if(o.call(t,n))return r.value=t[n],r.done=!1,r;return r.value=e,r.done=!0,r};return i.next=i}}return{next:S}}function S(){return{value:e,done:!0}}}(function(){return this||"object"===typeof self&&self}()||Function("return this")())},c991:function(t,r,e){"use strict";var n=e("4ea4");e("c975"),Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0,e("96cf");var o=n(e("1da1")),i=n(e("0744")),a={components:{nftList:i.default},data:function(){return{NFT_List:[],bg_img:"",ip:""}},onLoad:function(t){this,this.bg_img=t.img,console.log(t.id),this.ip="common"==t.id?"":t.id,this.getJsonData()},methods:{getJsonData:function(){var t=this;return(0,o.default)(regeneratorRuntime.mark((function r(){var e;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:if(!t.ip){r.next=2;break}return r.abrupt("return",!1);case 2:return r.next=4,t.$api._get("/dbchain/oracle/nft/lastest_nft/".concat(t.ip,"/1/100"));case 4:e=r.sent,t.NFT_List=e.data.result;case 6:case"end":return r.stop()}}),r)})))()},linkTo:function(t){return this.$router.push(t)},getIpfsSrc:function(t){return-1!==t.indexOf("://")?t:config.IpfsUrl+t}}};r.default=a},dd65:function(t,r,e){var n=e("24fb");r=n(!1),r.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */._swiper_option[data-v-501f1362]{background-color:#1c1c1c;min-height:100vh}._swiper_option ._bg[data-v-501f1362]{width:100vw}._swiper_option ._bg uni-image[data-v-501f1362]{width:inherit}._swiper_option ._list_cont[data-v-501f1362]{width:93.6vw;margin:0 auto;position:relative;top:-40vh}',""]),t.exports=r},e1b9:function(t,r,e){"use strict";e.r(r);var n=e("c991"),o=e.n(n);for(var i in n)"default"!==i&&function(t){e.d(r,t,(function(){return n[t]}))}(i);r["default"]=o.a},f313:function(t,r,e){"use strict";var n;e.d(r,"b",(function(){return o})),e.d(r,"c",(function(){return i})),e.d(r,"a",(function(){return n}));var o=function(){var t=this,r=t.$createElement,e=t._self._c||r;return e("v-uni-view",{staticClass:"_swiper_option"},[e("v-uni-view",{staticClass:"_bg"},[t.bg_img?e("v-uni-image",{attrs:{src:t.bg_img,mode:"widthFix"}}):t._e()],1),e("v-uni-view",{staticClass:"_list_cont"},t._l(t.NFT_List,(function(r,n){return e("nft-list",{key:n,staticClass:"_nft_list",attrs:{NFT_item:r,defaultH:"270",defaultW:"310",link:"/buynft?id="+r.id},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.linkTo("/pages/nft_option/nft_option?id="+r.id)}}})})),1)],1)},i=[]}}]);