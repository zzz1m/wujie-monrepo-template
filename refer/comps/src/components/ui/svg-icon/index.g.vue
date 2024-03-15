<template>
  <svg aria-hidden="true" :class="svgClass" :style="{ cursor: cursor }">
    <use :xlink:href="'#' + iconName" />
  </svg>
</template>

<script>
import { svgMa } from './svg-manage';

export default {
  name: 'SvgIcon',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String
    },
    cursor: {
      type: String,
      default: ''
    }
  },
  mounted() {
    svgMa.load(this.iconName);
  },
  beforeDestroy() {
    svgMa.delete(this.iconName);
  },
  watch: {
    iconName(val) {
      svgMa.load(val);
    }
  },
  computed: {
    iconName() {
      return `svg-${this.iconClass}`;
    },
    svgClass() {
      if (this.className) {
        return 'svg-icon ' + this.className;
      } else {
        return 'svg-icon';
      }
    }
  }
};
</script>
