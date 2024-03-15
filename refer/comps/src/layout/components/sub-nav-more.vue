<template>
  <li
    class="nav-item nav-more subnav-more nav-more-btn"
    :class="showMoreWindow && 'show-more-window'"
    @mouseenter="handlerMouseEnter()"
    @mouseleave="closeGuide"
  >
    更多<i class="ui-icon-menu"></i>
    <!-- 更多菜单 -->
    <ul v-show="showMoreWindow" class="menu-more-list" :class="showMoreWindow && 'more-list-anim'">
      <li v-for="nav in moreNav" :key="nav.id">
        <a class="boss-track" :href="findUrl(nav)" @click="onclickNav(nav, $event)">
          <ui-tooltip v-if="nav.name.length > 10" :content="nav.name" effect="dark" placement="bottom" popper-class="menu-more-list-tooltip">
            <span>{{ nav.name.slice(0, 10) + '...' }}</span>
          </ui-tooltip>
          <span v-else>{{ nav.name }}</span>
        </a>
      </li>
    </ul>
  </li>
</template>

<script>
import { findUrl } from '../common/nav-tools';
import { debounce } from '@noah/tools/src/utils/util';
export default {
  name: 'SubnavMore',
  props: {
    moreNav: {
      type: Array,
      validator: (value) => {
        return Array.isArray(value);
      },
      default: () => []
    }
  },
  data() {
    return {
      showMoreWindow: false
    };
  },
  methods: {
    findUrl(navInfo = {}) {
      const result = findUrl(navInfo);
      return result.url;
    },
    closeGuide() {
      this.showMoreWindow = false;
    },
    handlerMouseEnter: debounce(0, function () {
      this.showMoreWindow = true;
    }),
    onclickNav(navInfo, ev) {
      this.closeGuide();
      this.$emit('click-nav-more', navInfo, ev);
    }
  }
};
</script>
<style lang="less" scoped>
.nav-more {
  > i {
    border-radius: 2px;
    margin-left: 3px;
  }
}
.menu-more-list {
  width: 500px;
  background-color: #fff;
  box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.1);
  padding: 20px;
  padding-bottom: 0;
  position: relative;
  font-size: 13px;
  line-height: 18px;
  text-align: center;
  user-select: none;
  border-radius: 4px;
  opacity: 0;
  z-index: -1;
  &.more-list-anim {
    animation: opacityAnim 0.5s forwards;
  }
  li {
    float: left;
    width: 33%;
    color: #444444;
    margin-bottom: 20px;
    cursor: pointer;
    position: relative;
    text-align: left;
    &:hover {
      color: #00a6a7;
    }
    span {
      display: inline-block;
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
.menu-more-list-tooltip {
  z-index: 10000 !important;
}
@keyframes opacityAnim {
  0% {
    opacity: 0;
    z-index: -1;
  }
  100% {
    opacity: 1;
    z-index: 9999;
  }
}
</style>
<style lang="less">
.menu-more-list-tooltip {
  z-index: 10000 !important;
}
</style>
