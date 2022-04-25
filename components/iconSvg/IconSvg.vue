<template>
  <svg
    class="svg-icon"
    aria-hidden="true"
    :viewBox="iconViweBox ? iconViweBox : svgViewBox"
    :class="[
      width > 0 ? '_width_inherit' : '',
      height > 0 ? '_height_inherit' : '',
    ]"
  >
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
export default {
  name: "icon-svg",
  props: {
    iconClass: {
      type: String,
      required: true,
    },
    iconViweBox: {
      type: String,
    },
    width: {
      type: [String, Number],
      default() {
        return 0;
      },
    },
    height: {
      type: [String, Number],
      default() {
        return 0;
      },
    },
  },
  computed: {
    iconName() {
      return `#${this.iconClass}`;
    },
    svgViewBox() {
      return `0 0 ${Number(this.width) || 1} ${Number(this.height) || 1}`;
    },
  },
};
</script>

<style>
.svg-icon {
  width: 1em;
  height: 1em;
  font-size: inherit;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.svg-icon._height_inherit {
  height: 100%;
}
.svg-icon._width_inherit {
  width: 100%;
}
</style>
