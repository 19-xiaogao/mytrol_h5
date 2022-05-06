/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
	if (!name) return;
	if (typeof content !== "string") {
		content = JSON.stringify(content);
	}
	uni.setStorage({
		key: name,
		data: content,
		success: function() {
		}
	});
};

/**
 * 获取localStorage
 */
export const getStore = (name) => {
	if (!name) return;
	var value = uni.getStorageSync(name);
	if (value !== null) {
		try {
			value = JSON.parse(value);
		} catch (e) {
			value = value;
		}
	}
	return value;
};

/**
 * 删除localStorage
 */
export const removeStore = (name) => {
	if (!name) return;
	uni.removeStorageSync(name)
};


/**
 * 计算两个时间之间的时间差 多少天时分秒
 * @param {endTime} value 
 * @param {startTime} value  默认当前时间
 * @returns [days, hours, minutes, seconds]
 */

export function intervalTime(endTime, startTime = null) {
	var timestamp = new Date().getTime(); //计算当前时间戳
	var date1 = ""; //开始时间
	if (startTime) {
		date1 = startTime;
	} else {
		date1 = timestamp; //开始时间
	}
	var date2 = endTime; //结束时间
	var date3 = (date2 - date1); //时间差的毫秒数
	//计算出相差天数
	var days = Math.floor(date3 / (24 * 3600 * 1000));
	//计算出小时数
	var leave1 = date3 % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
	var hours = Math.floor(leave1 / (3600 * 1000));
	//计算相差分钟数
	var leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
	var minutes = Math.floor(leave2 / (60 * 1000));
	//计算相差秒数
	var leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数
	var seconds = Math.round(leave3 / 1000);
	return [days, hours, minutes, seconds]
}



/**
 * @param {date} 标准时间格式:Fri Nov 17 2017 09:26:23 GMT+0800 (中国标准时间)
 * @param {type} 类型
 *   type == 1 ---> "yyyy-mm-dd hh:MM:ss.fff"
 *   type == 2 ---> "yyyymmddhhMMss"
 *   type == '' ---> "yyyy-mm-dd hh:MM:ss"
 *   type == 4 ---> "2020年03月03日"
 *
 */
export const formatDate = (date, type) => {
	var year = date.getFullYear(); //年
	var month =
		date.getMonth() + 1 < 10 ?
		"0" + (date.getMonth() + 1) :
		date.getMonth() + 1; //月
	var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate(); //日
	var hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(); //时
	var minutes =
		date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(); //分
	var seconds =
		date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds(); //秒
	var milliseconds =
		date.getMilliseconds() < 10 ?
		"0" + date.getMilliseconds() :
		date.getMilliseconds(); //毫秒
	if (type == 1) {
		return (
			year +
			"-" +
			month +
			"-" +
			day +
			" " +
			hour +
			":" +
			minutes +
			":" +
			seconds +
			"." +
			milliseconds
		);
	} else if (type == 2) {
		return (
			year + "" + month + "" + day + "" + hour + "" + minutes + "" + seconds
		);
	} else if (type == 3) {
		return year + "-" + month + "-" + day;
	} else if (type == 4) {
		return year + "年" + month + "月" + day + "日";
	} else {
		return (
			year +
			"-" +
			month +
			"-" +
			day +
			" " +
			hour +
			":" +
			minutes +
			":" +
			seconds
		);
	}
};


/**
 * @param {*} date 具体日期变量
 * @param {string} dateType 需要返回类型
 * @return {string} dateText 返回为指定格式的日期字符串
 */
export const getFormatDate = (date, dateType = "yyyy-mm-dd MM:mm:ss") => {
	// if(!isNaN(date))return getTime(Number)
	let dateObj = new Date(!isNaN(date) ? Number(date) : date);
	let month = dateObj.getMonth() + 1;
	let strDate = dateObj.getDate();
	let hours = dateObj.getHours();
	let minutes = dateObj.getMinutes();
	let seconds = dateObj.getSeconds();
	if (month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if (strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	if (hours >= 0 && hours <= 9) {
		hours = "0" + hours;
	}
	if (minutes >= 0 && minutes <= 9) {
		minutes = "0" + minutes;
	}
	if (seconds >= 0 && seconds <= 9) {
		seconds = "0" + seconds;
	}

	let dateText =
		dateObj.getFullYear() +
		"年" +
		(dateObj.getMonth() + 1) +
		"月" +
		dateObj.getDate() +
		"日";
	if (dateType == "yyyy-mm-dd") {
		dateText =
			dateObj.getFullYear() +
			"-" +
			(dateObj.getMonth() + 1) +
			"-" +
			dateObj.getDate();
	}
	if (dateType == "yyyy.mm.dd") {
		dateText =
			dateObj.getFullYear() +
			"." +
			(dateObj.getMonth() + 1) +
			"." +
			dateObj.getDate();
	}
	if (dateType == "yyyy-mm-dd MM:mm:ss") {
		dateText =
			dateObj.getFullYear() +
			"-" +
			month +
			"-" +
			strDate +
			" " +
			hours +
			":" +
			minutes +
			":" +
			seconds;
	}
	if (dateType == "mm-dd MM:mm:ss") {
		dateText =
			month + "-" + strDate + " " + hours + ":" + minutes + ":" + seconds;
	}
	if (dateType == "yyyy年mm月dd日 MM:mm:ss") {
		dateText =
			dateObj.getFullYear() +
			"年" +
			month +
			"月" +
			strDate +
			"日" +
			" " +
			hours +
			":" +
			minutes +
			":" +
			seconds;
	}
	return dateText;
};

/**
 * 多维数组解构为一维数组
 * var arr1 = [[0, 1], [2, 3], [4, 5]];
 * var arr2 = flatten(arr1); // arr2 [0, 1, 2, 3, 4, 5]
 * 优点: 多维数组也可以
 * 比如：var arr = [[1,2],3,[[[4], 5]]]
 * @param {*} arr 
 * @returns arr[]
 */
export function flatten(arr) {
	return [].concat(...arr.map(x => Array.isArray(x) ? flatten(x) : x))
}

/**
 * JS中对身份证等进行部分隐藏处理
 * function plusXing(操作的字符串, 前面保留的位数, 后面的保留的位数) {
 * @param {Object} str
 * @param {Object} frontLen
 * @param {Object} endLen
 */
export function plusXing(str, frontLen, endLen) {
	var len = str.length - frontLen - endLen;
	var xing = '****';
	return str.substring(0, frontLen) + xing + str.substring(str.length - endLen);
}

/**
 * uni中使用赋值按钮
 */
export function uni_copy(value) {
	//提示模板
	uni.setClipboardData({
		data: value, //要被复制的内容
		success: () => { //复制成功的回调函数
			uni.showToast({ //提示
				title: "复制成功"
			})
		}
	});
	// uni.showModal({
	// 	content: value, //模板中提示的内容
	// 	confirmText: "复制内容",
	// 	success: (e) => { //点击复制内容的后调函数
	// 		//uni.setClipboardData方法就是讲内容复制到粘贴板
	// 		if (e.confirm) {
	// 			uni.setClipboardData({
	// 				data: value, //要被复制的内容

	// 				success: () => { //复制成功的回调函数

	// 					uni.showToast({ //提示
	// 						title: "复制成功"
	// 					})
	// 				}
	// 			});
	// 		}

	// 	}
	// });
}



/** 
 * @description: 根据后缀判断文件类型 
 * @param {String} fileName  文件名称 
 * @return {String}  文件类型 
 */
export function getFileType(fileName) {
	// 后缀获取  
	let suffix = '';
	// 获取类型结果  
	let result = '';
	try {
		const flieArr = fileName.split('.');
		suffix = flieArr[flieArr.length - 1];
	} catch (err) {
		suffix = '';
	}
	// fileName无后缀返回 false  
	if (!suffix) {
		return false;
	}
	suffix = suffix.toLocaleLowerCase();
	// 动图格式
	const animImglist = ['gif',];
	// 进行图片匹配  
	result = animImglist.find(item => item === suffix);
	if (result) {
		return 'gif';
	}
	// 图片格式  
	const imglist = ['png', 'jpg', 'jpeg', 'bmp',];
	// 进行图片匹配  
	result = imglist.find(item => item === suffix);
	if (result) {
		return 'image';
	}
	// 匹配txt  
	const txtlist = ['txt'];
	result = txtlist.find(item => item === suffix);
	if (result) {
		return 'txt';
	}
	// 匹配 excel  
	const excelist = ['xls', 'xlsx'];
	result = excelist.find(item => item === suffix);
	if (result) {
		return 'excel';
	}
	// 匹配 word  
	const wordlist = ['doc', 'docx'];
	result = wordlist.find(item => item === suffix);
	if (result) {
		return 'word';
	}
	// 匹配 pdf  
	const pdflist = ['pdf'];
	result = pdflist.find(item => item === suffix);
	if (result) {
		return 'pdf';
	}
	// 匹配 ppt  
	const pptlist = ['ppt', 'pptx'];
	result = pptlist.find(item => item === suffix);
	if (result) {
		return 'ppt';
	}
	// 匹配 视频  
	const videolist = ['mp4', 'm2v', 'mkv', 'rmvb', 'wmv', 'avi', 'flv', 'mov', 'm4v'];
	result = videolist.find(item => item === suffix);
	if (result) {
		return 'video';
	}
	// 匹配 音频  
	const radiolist = ['mp3', 'wav', 'wmv'];
	result = radiolist.find(item => item === suffix);
	if (result) {
		return 'radio';
	}
	// 匹配 压缩包  
	const rarlist = ['rar', 'zip', 'jar', '7z'];
	result = rarlist.find(item => item === suffix);
	if (result) {
		return 'rar';
	}
	// 匹配 网页  
	const htmllist = ['htm', 'html', 'jsp', 'asp', 'shtml', 'nsp', 'php'];
	result = htmllist.find(item => item === suffix);
	if (result) {
		return 'html';
	}
	// 匹配 exe  
	const exelist = ['exe'];
	result = exelist.find(item => item === suffix);
	if (result) {
		return 'exe';
	}
	// 匹配 psd  
	const psdlist = ['psd'];
	result = psdlist.find(item => item === suffix);
	if (result) {
		return 'psd';
	}
	// 匹配 cad  
	const cadlist = ['dwg'];
	result = cadlist.find(item => item === suffix);
	if (result) {
		return 'cad';
	}
	// 匹配 镜像文件  
	const isolist = ['iso', 'bin', 'nrg', 'vsd', 'cif', 'fcd', 'img', 'ccd', 'c2d', 'dfi', 'tao', 'dao', 'cue'];
	result = isolist.find(item => item === suffix);
	if (result) {
		return 'iso';
	}
	// 其他 文件类型  
	return 'other';
}

// 获取url参数
export function getQueryUrl(url){
	if(url.indexOf('?') !== -1){
		let my_code = url.split('=')[1]
		return my_code;
	}
	return false;
}
