<template>
  <li class="nav-item nav-more" :class="showMoreWindow && 'active'" @mouseenter="handlerMouseEnter()" @mouseleave="closeGuide">
    <span class="nave-more-text" :class="checkMenuNew && 'new'">更多<i class="ui-icon-menu"></i></span>
    <!-- 更多菜单 -->
    <ul
      v-if="!needSort"
      id="nav-menu-more-list"
      :class="['menu-more-list', 'more-list-anim']"
      :style="{
        display: !showMoreWindow ? 'none' : 'block'
      }"
    >
      <template>
        <h2 class="nav-more-title">更多导航</h2>
        <ui-tooltip content="排序" effect="dark" placement="top" popper-class="top-common-tooltip">
          <p class="sort-btn homepage-icon-btn" @click="startSort">
            <svg-icon icon-class="homepage-sort"></svg-icon>
          </p>
        </ui-tooltip>
        <li v-for="nav in moreNav" :key="nav.id" :click-report="nav.code">
          <a class="boss-track" :href="findUrl(nav)" @click="onclickNav(nav, $event)">
            <img v-loading="{ src: nav.icon }" alt="" />
            <p v-if="nav.isNew" class="new-menu"><img alt="" :src="getImportUrl('homepage/new-icon.png')" /></p>
            <ui-tooltip v-if="nav.name.length > 8" :content="nav.name" effect="dark" placement="bottom" popper-class="menu-more-list-tooltip">
              <span>{{ nav.name }}</span>
            </ui-tooltip>
            <span v-else>{{ nav.name }}</span>
          </a>
        </li>
      </template>
    </ul>
    <!-- 排序菜单组件 -->
    <navSort v-else v-show="showMoreWindow" :end-sort="endSort" :nav-all-list="sortAllList" :sort-call-back="sortCallBack"></navSort>
  </li>
</template>

<script>
import { MAX_NAV_NUM, findUrl } from '../common/nav-tools';
import navSort from './nav-sort';
export default {
  name: 'NavMore',
  components: {
    navSort
  },
  props: {
    moreNav: {
      type: Array,
      validator: (value) => {
        return Array.isArray(value);
      },
      default: () => []
    },
    totalNav: Function,
    sortAllList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      needSort: false,
      showMoreWindow: false,
      disappearTimer: '',
      appearTimer: ''
    };
  },
  computed: {
    checkMenuNew() {
      return this.moreNav.some((item) => {
        return item.isNew;
      });
    }
  },
  created() {},
  methods: {
    findUrl(navInfo = {}) {
      const result = findUrl(navInfo);
      return result.url;
    },
    // 点击导航
    onclickNav(navInfo, ev) {
      this.showMoreWindow = false;
      document.getElementById('nav-menu-more-list').style.display = 'none';
      this.$emit('click-nav-more', navInfo, MAX_NAV_NUM, ev);
    },
    // 排序
    startSort() {
      this.needSort = true;
    },
    // 关闭排序
    endSort() {
      this.needSort = false;
      this.showMoreWindow = false;
    },
    // 鼠标移入
    handlerMouseEnter() {
      clearTimeout(this.appearTimer);
      clearTimeout(this.disappearTimer);
      this.disappearTimer = setTimeout(() => {
        if (document.getElementById('nav-menu-more-list')) {
          document.getElementById('nav-menu-more-list').style.display = 'block';
        }
        this.showMoreWindow = true;
      }, 300);
    },
    // 关闭 更多
    closeGuide() {
      clearTimeout(this.disappearTimer);
      if (this.needSort) return;
      this.disappearTimer = setTimeout(() => {
        this.endSort();
      }, 500);
    },
    sortCallBack() {
      this.$emit('update-sort');
    }
  },
  beforedestroy() {
    clearTimeout(this.appearTimer);
    clearTimeout(this.disappearTimer);
  }
};
</script>
<style lang="less" scoped>
.nav-more {
  .nave-more-text {
    position: relative;
    > i {
      border-radius: 2px;
      margin-left: 3px;
    }
  }
  > .new::before {
    position: absolute;
    right: -5px;
    top: -2px;
    content: '';
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: #fa594a;
  }
}
.menu-more-list {
  display: none;
  width: 628px;
  background-color: #fff;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.2);
  padding: 50px 16px 14px;
  position: relative;
  font-size: 13px;
  line-height: 18px;
  text-align: center;
  user-select: none;
  border-radius: 4px;
  cursor: auto;
  z-index: -1;
  &.more-list-anim {
    animation: opacityAnim 0.5s forwards;
  }
  &.more-list-anim-leave {
    animation: opacityAnimLeave 0.4s forwards;
  }
  .nav-more-title {
    position: absolute;
    top: 20px;
    left: 22px;
    font-size: 16px;
    font-weight: 500;
    color: #1d2129;
    line-height: 20px;
  }
  .sort-btn {
    color: #86909c;
    position: absolute;
    top: 20px;
    right: 22px;
    font-size: 14px;
    font-weight: 400;
    cursor: pointer;

    border-radius: 4px;
    width: 22px;
    height: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    .svg-icon {
      width: 16px;
      height: 16px;
    }
    &:hover {
      background: #f6f7fb;
    }

    // i {
    //     font-weight: 500;
    //     margin-right: 6px;
    // }
    // &:hover {
    //     color: #00A6A7;
    // }
  }
  li {
    float: left;
    width: 25%;
    cursor: pointer;
    position: relative;
    text-align: center;
    margin-bottom: 4px;
    .boss-track {
      padding: 8px 6px;
      display: flex;
      align-items: center;
      color: #444444;
      width: 140px;
      &:hover {
        color: #00a6a7;
        background: #f7f8fa;
        border-radius: 8px;
      }
      & > img {
        width: 20px;
        height: 20px;
      }
      & > p {
        position: absolute;
        left: 0px;
        top: -7px;
        transform: translateX(0%);
        font-size: 12px;
        border-bottom-right-radius: 14px;
        overflow: hidden;
        width: 30px;
        img {
          width: 100%;
        }
      }
    }
    span {
      display: inline-block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 106px;
      color: #1d2129;
      text-align: left;
      padding-left: 8px;
      font-weight: 400;
    }
    .list-new {
      font-size: 12px;
      color: #fa594a;
      transform: scale(0.75);
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
@keyframes opacityAnimLeave {
  0% {
    opacity: 1;
    z-index: 9999;
  }
  100% {
    opacity: 0;
    z-index: -1;
  }
}
</style>
<style lang="less">
.menu-more-list-tooltip {
  z-index: 10000 !important;
}
</style>
