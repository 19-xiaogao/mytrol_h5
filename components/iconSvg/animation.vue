<template>
  <div class="_ba_animation">
    <div class="el-message-box">
      <div class="el-message-box__header">
        <div class="el-message-box__title">
          <span>{{ title }}</span>
        </div>
      </div>
      <div class="el-message-box__content">
        <div class="el-message-box__container">
          <!---->
          <div class="el-message-box__message">
            <p>
              <strong>{{ text }}</strong>
            </p>
          </div>
        </div>
      </div>

      <div class="_animation" id="lottie"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    type: String,
    time: Number,
    title: String,
    text: String,
    params: {},
  },
  methods: {
    closeEl() {
      this.$destroy();
      try {
        document.body.removeChild(this.$el);
      } catch (error) {}
    },
  },
  created() {
    this.title ? "" : this.$emit('title', '操作提示');
    this.text ? "" : this.$emit('text', '表操作进行中');
  },
  mounted() {
    this.$nextTick(() => {
      let animationData;
      animationData = this.$global.animationJSON[
        this.type ? this.type : "save"
      ];
      var params = {
        container: document.getElementById("lottie"),
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: animationData,
      };
      params = { ...params, ...this.params };
      var anim;
      anim = lottie.loadAnimation(params);

      // 1s后消失
      setTimeout(() => {
        this.closeEl();
      }, this.time || 10000);
    });
  },
};
</script>

<style lang="scss" scoped>
._ba_animation {
  width: 100vw;
  height: 100vh;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 2018;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(76, 76, 76, 0.3);
  .el-message-box {
    padding-bottom: 60px;
    .el-message-box__message {
      min-height: unset;
    }
  }
}
._animation {
  width: 10vw;
  margin: auto;
}
</style>
