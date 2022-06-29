<template>
  <view class="_home">
    <view class="_header">
      <uni-swiper-dot
        class="uni-swiper-dot-box"
        :info="info"
        :dots="true"
        :current="current"
        :mode="mode"
        :dots-styles="dotsStyles"
        field="content"
      >
        <swiper class="swiper-box" @change="change" :current="current">
          <swiper-item v-for="(item, index) in info" :key="index">
            <view :class="item.colorClass" class="swiper-item">
              <image
                class="image"
                :src="item.url"
                mode="aspectFill"
                :draggable="false"
                @click="
                  linkTo(
                    `/pages/swiper_option/swiper_option?id=${item.id}&img=${item.router}`
                  )
                "
              />
            </view>
          </swiper-item>
        </swiper>
      </uni-swiper-dot>
      <view class="_swiper_cont" v-if="info[current]">
        <view class="_tit _one_omit">
          {{ info[current].name }}
        </view>
        <view class="_t1 _one_omit">
          {{ info[current].content }}
        </view>
      </view>
    </view>

    <view class="_vip" v-if="base_list.length > 0">
      <ls-swiper
        :autoplay="false"
        :list="base_list"
        :interval="3000"
        imgKey="imgUrl"
        imgWidth="95%"
        :previousMargin="0"
        :nextMargin="370"
        :height="108"
        :imgRadius="5"
        @clickItem="clickItem"
        :loop="false"
        @change="changeSwiper"
        :dots="true"
      />
    </view>
    <view class="_list_cont">
      <view class="_tab_list">
        <!-- TODO:盲盒系列 -->
        <view
          class="_tab"
          v-for="item in tabList"
          :key="item.id"
          @click="changeTab(item)"
        >
          <view
            class="_tit"
            :class="[activeTab == item.id ? '_active_tit' : '']"
          >
            {{ item.name }}
          </view>
          <view class="_border" v-show="activeTab == item.id"> </view>
        </view>
      </view>
      <nft-list
        class="_nft_list"
        v-for="(item, index) in NFT_List"
        :key="index"
        :NFT_item="item"
        defaultH="270"
        defaultW="310"
        @click.native="linkTo(`/pages/nft_option/nft_option?id=${item.id}&type=${activeTab}`)"
        :type="isNftType(item)"
      >
      </nft-list>
    </view>
  </view>
</template>

<script>
import LsSwiper from "../../components/ls-swiper/index.vue";
import nftList from "../../components/nft_list/nft_list.vue";
import config from "@/js_sdk/general-http/config.js";
import { flatten } from "@/static/js/global.js";
export default {
  components: {
    LsSwiper,
    nftList,
  },
  data() {
    return {
      info: [],
      // 明星嘉宾
      base_list: [],
      current: 0,
      mode: "round",
      dotsStyles: {
        backgroundColor: "rgba(255, 255, 255, 1.0)",
        border: "rgba(255, 255, 255, 1.0)",
        selectedBackgroundColor: "rgba(255, 189, 33, 1.0)",
        selectedBorder: "rgba(255, 189, 33, 1.0)",
      },
      swiperLeft: 0,
      // NFT列表
      NFT_List: [],
      // 盲盒列表
      bindBoxLists: [],
      // 全部NFT列表
      NFT_List_All: {},
      // 搜索条件
      searchData: {
        page: 0,
        size: 10,
        series_ip: "common",
      },
      activeTab: "1",

      tabList: [
        {
          name: "nft",
          id: "1",
        },
        {
          name: "盲盒",
          id: "2",
        },
      ],
    };
  },
  mounted() {
    this.getHomeList();
  },
  methods: {
    navShow(e) {
      this.info = e.home_swiper || [];
      this.base_list = e.home_ip || [];
      // this.NFT_List = e.nft_list || [];
    },
    change(e) {
      this.current = e.detail.current;
    }, // 飞天敦煌轮播图切换
    changeSwiper(e) {
      this.swiperLeft = (e.index * 100) / this.base_list.length;
    },
    changeTab(item) {
      this.activeTab = item.id;
      this.getHomeList();
      // this.$refs.orider_list.getJsonData()
    },
    clickItem(item) {
      item.router
        ? ""
        : (item.router =
            "https://oss.mytrol.cn/uni_mytrol/img/nft_swiper/nft_bg.png");
      this.linkTo(
        `/pages/swiper_option/swiper_option?id=${item.id}&img=${item.router}`
      );
    },
    linkTo(url, type = false) {
      //#ifdef MP-WEIXIN
      if (type) {
        return uni.reLaunch({
          url: url,
        });
      }
      return uni.navigateTo({
        url: url,
      });
      //#endif
      //#ifdef H5
      return this.$router.push(url);
      //#endif
    },
    // 获取NFT IPFS地址
    getIpfsSrc(url) {
      if (url.indexOf("://") !== -1) {
        return url;
      }
      return config.IpfsUrl + url;
    },
    async getNftIp() {
      let res = await this.$api._get(
        `/dbchain/oracle/nft/backend/get_serises_ip`
      );
      let data = res.data.result || [];
      data = data.sort((a, b) => {
        return Number(a.number) - Number(b.number);
      });
      this.base_list = data;
    },
    getHomeList() {
      if (this.activeTab === "1") {
        this.getNfts();
      } else {
        this.getBindBoxs();
      }
    },
    async getNfts() {
      let nft_res = await this.$api._get(
        "/dbchain/oracle/nft/lastest_nft/common/1/100"
      );
      let data = nft_res.data.result ? nft_res.data.result : [];
      data.sort(function (a, b) {
        return b.published_at - a.published_at;
      });
      this.NFT_List = data;
    },
    async getBindBoxs() {
      let nft_res = await this.$api._get(
        "/dbchain/oracle/nft/blind_box/lastest_box/1/100"
      );
      let data = nft_res.data.result ? nft_res.data.result : [];
      data.sort(function (a, b) {
        return b.published_at - a.published_at;
      });
      this.NFT_List = data;
    },
    // 获取NFT type
    isNftType(item) {
      // 已售完  1：即将出售 现售
      let opening_time = isNaN(item.opening_time)
        ? new Date(item.opening_time).getTime()
        : item.opening_time;
      let that_time = new Date().getTime();
      if (opening_time > that_time) {
        return "1";
      }
      return "0";
    },
  },
};
</script>

<style lang="scss" scoped>
._home {
  background: #000;
  width: 100vw;
  ._tab_list {
    padding: 10px 0;
    display: flex;
    position: relative;

    ._tab {
      ._tit {
        padding: 6px 17px;
        height: 20px;
        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #7d7d7d;
        line-height: 20px;
      }

      ._active_tit {
        height: 20px;
        font-size: 16px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #ffffff;
        line-height: 20px;
      }

      ._border {
        margin: 0 auto;
        width: 18px;
        height: 4px;
        background: #ffbd21;
        border-radius: 3px;
      }
    }

    ._redeem {
      border-radius: 8px;
      border: 1px solid rgba(49, 49, 49, 0.5);
      display: flex;
      align-items: center;
      padding: 0 11px;
      position: absolute;
      right: 14px;
      height: 36px;
      position: relative;

      ._icon {
        width: 22px;
        height: 22px;

        image {
          width: 22px;
          height: 22px;
        }
      }

      ._t1 {
        margin-left: 4px;
        font-size: 14px;
        font-family: SourceHanSansCN-Regular, SourceHanSansCN;
        font-weight: 400;
        color: #ffffff;
        line-height: 22px;
      }
    }

    .btn {
      display: block;
      width: 188rpx;
      height: 70rpx;
      position: absolute;
      top: 0;
      left: calc(538rpx - 296rpx);
    }
  }
  ._header {
    width: 93vw;
    height: 240px;
    padding: 0;
    margin-bottom: 12px;
    margin: 0 auto;

    .swiper-box {
      height: 184px;
      width: 100%;
      position: relative;
      z-index: 1;

      .swiper-item {
        height: 96.8%;
        width: 100%;
        // padding: 1.6vw 3.2vw;

        .image {
          height: inherit;
          width: inherit;
          border-radius: 8px;
        }
      }
    }

    ._swiper_cont {
      height: 52px;
      background: #151515;
      border-radius: 12px;
      width: 93.6vw;
      margin: 0 auto;
      position: relative;
      top: -15px;
      z-index: 0;
      padding-top: 20px;

      ._tit {
        padding: 0 12px;
        font-size: 16px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #ffffff;
        line-height: 22px;
      }

      ._t1 {
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #adadad;
        line-height: 18px;
        padding: 0 12px;
      }
    }
  }

  ._vip {
    width: 93.6vw;
    margin: 0 auto;
    padding-bottom: 20px;

    ._swiper_scroll {
      width: 98px;
      height: 4px;
      background: #414141;
      border-radius: 2px;
      margin: 0 auto;
      margin-top: 12px;
      margin-bottom: 16px;

      ._dot {
        width: 43px;
        height: 4px;
        background: #ffffff;
        border-radius: 2px;
        position: relative;
      }
    }
  }

  ._list_cont {
    width: 93.6vw;
    margin: 0 auto;
    padding-bottom: 40px;

    ._nft_list {
      // margin-bottom: 16px;
    }
  }
}
</style>
