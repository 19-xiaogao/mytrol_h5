// 处理多次点击
function noMultipleClicks(methods) {
    let that = this;
    
    if (that.noClick) {
        that.noClick= false;
        methods();
        setTimeout(function () {
            that.noClick= true;
        }, 5000)
    } else {
        // uni.showToast({
        //     title: '请勿重复点击',
        //     duration: 5000,
        //     icon: 'none'
        // })
    }
}

//导出
export default {
    noMultipleClicks //禁止多次点击
}