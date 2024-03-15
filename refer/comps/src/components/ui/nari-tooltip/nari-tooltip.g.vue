<template>
  <div ref="nariTooltip" class="nari-tooltip">
    <div @click="handleClick" @mouseenter="handleCellMouseEnter($event)" @mouseleave="handleCellMouseLeave($event)">
      <div :class="['childStyle', showTip && 'tooltip']">
        <template v-if="$slots.default"><slot></slot></template>
        <template v-else>{{ value || placeholder }}</template>
      </div>
    </div>
    <ui-tooltip v-if="showTip" ref="tooltip" :content="tooltipContent" effect="dark" max-width="400px" :open-delay="300" :placement="placement"></ui-tooltip>
  </div>
</template>
<script>
import { debounce } from '@noah/tools/src/utils/util';
export default {
  name: 'NariTooltip',
  props: {
    value: {
      type: [String, Number, Boolean],
      default: ''
    },
    placement: {
      type: String,
      default: 'top'
    },
    placeholder: {
      type: String,
      default: '-'
    },
    showTip: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      tooltipContent: ''
    };
  },
  created() {
    this.activateTooltip = debounce(50, (tooltip) => tooltip.handleShowPopper());
  },
  methods: {
    // 鼠标移入
    handleCellMouseEnter(event) {
      if (!this.showTip) return;
      const target = event.target;
      // 判断是否text-overflow, 如果是就显示tooltip
      let child = target.querySelector('.childStyle');
      // use range width instead of scrollWidth to determine whether the text is overflowing
      // to address a potential FireFox bug: https://bugzilla.mozilla.org/show_bug.cgi?id=1074543#c3
      const range = document.createRange();
      range.setStart(child, 0);
      range.setEnd(child, child.childNodes.length);
      const rangeWidth = range.getBoundingClientRect().width; // 文本区域宽度
      if ((Math.floor(rangeWidth) > target.offsetWidth || child.scrollWidth > child.offsetWidth) && this.$refs.tooltip) {
        const tooltip = this.$refs.tooltip;
        // TODO 会引起整个 Table 的重新渲染，需要优化
        this.tooltipContent = target.innerText || target.textContent;
        tooltip.referenceElm = target;
        tooltip.$refs.popper && (tooltip.$refs.popper.style.display = 'none');
        tooltip.doDestroy();
        tooltip.setExpectedState(true);
        this.activateTooltip(tooltip);
      }
    },
    // 鼠标移出
    handleCellMouseLeave() {
      if (!this.showTip) return;
      const tooltip = this.$refs.tooltip;
      if (tooltip) {
        tooltip.setExpectedState(false);
        tooltip.handleClosePopper();
      }
    },
    handleClick() {
      if (!this.showTip) return;
      const tooltip = this.$refs.tooltip;
      if (tooltip) {
        tooltip.setExpectedState(false);
        tooltip.handleClosePopper();
      }
    }
  }
};
</script>
<style lang="less" scoped>
.nari-tooltip {
  .tooltip {
    display: inline-block;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    width: 100%;
  }
}
</style>
