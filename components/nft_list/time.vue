<template>
 <view class="_type" >
 	<image src="https://oss.mytrol.cn/uni_mytrol/icon/time.png" mode=""></image>
 	<view class="">
 		即将开售
 	</view>
 	<view class="">
 		{{count_down}}
 	</view>
 </view>
</template>

<script>
// import { _get, _post, APIURL } from "@/assets/js/axios_global.js";
import { intervalTime } from "@/static/js/global.js";

export default {
props:{
	stopTime:{
		required:true,
		type:String,
		default:"2021-10-15",
	}
},
  name: "timeCont",
  data() {
    return {
      timer: "",//定时器

    };
  },
  created() {
    this.getTime();

  },
  methods: {
    getTime() {
      let time = this.time;
      // let that_time = new Date().getTime();
      // let down_time = time - that_time;
      let res = intervalTime(1634256000000);

      let timeArr=`${res[0]>9?res[0]:'0'+res[0]}${res[1]>9?res[1]:'0'+res[1]}${res[2]>9?res[2]:'0'+res[2]}${res[3]>9?res[3]:'0'+res[3]}`;
      this.count_down=timeArr;
    },

  },
  computed: {
    time() {
      return new Date(`${this.stopTime} 24:00:00`).getTime();
    },
  },
  mounted() {
    this.timer = setInterval(this.getTime, 5000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
};
</script>

<style lang='scss' scoped>
._time {
  display: flex;
  justify-content: space-between;

  ._desc {
    //   height: 16px;
    font-size: 16px;
    font-family: SourceHanSansCN-Regular, SourceHanSansCN;
    font-weight: 400;
    color: #ffffff;
    line-height: 24px;
    text-align: left;
    margin-bottom: 10px;
  }
  ._cont {
    display: flex;
  }
  ._left,
  ._right {
    ._cont {
      span {
        display: inline-block;

        width: 5.9vw;
        height: 7.7vw;
        background: linear-gradient(180deg, #43474d 0%, #020202 100%);
        border: 1px solid #979797;
        font-size: 17px;
        font-family: SourceHanSansCN-Heavy, SourceHanSansCN;
        font-weight: 800;
        color: #ffffff;
        line-height: 29px;
        text-align: center;
      }
    }
  }
  ._left {
    ._cont {
      span {
        &:nth-child(2) {
          margin-right: 12px;
        }
        &:nth-child(4) {
          margin-right: 7px;
        }
        &:nth-child(6) {
          margin-right: 7px;
        }
      }
    }
  }
  ._right {
    ._desc {
      text-align: right;
    }
  }
}
</style>