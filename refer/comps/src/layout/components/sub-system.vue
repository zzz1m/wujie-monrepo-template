<template>
  <div class="sub-system-channel">
    <!-- 子系统名 -->
    <div class="system-name">
      <span class="btn-backhome" @click="handleBack">
        <svg-icon icon-class="outline-arrow-left"></svg-icon>
      </span>
      <img v-loading="{ src: subSystem.icon, err_img: errorImg }" class="subsystem-thumb" />
      <ui-tooltip v-if="subSystem.name.length > 10" :content="subSystem.name" effect="dark" placement="bottom">
        <span>{{ subSystem.name.slice(0, 10) + '...' }}</span>
      </ui-tooltip>
      <span v-else>{{ subSystem.name }}</span>
    </div>
    <!-- 子系统导航 -->
    <ul v-if="subNavList.length > 0" class="nav-list">
      <li v-for="nav in subNavList" :key="nav.id">
        <a
          :class="['nav-item', navLinks.includes(nav.id + '') ? 'active' : '', isLargeScreen ? 'large' : '']"
          :href="findUrl(nav)"
          @click="onclickNav(nav, $event)"
        >
          <ui-tooltip v-if="nav.name.length > subnavlength" :content="nav.name" effect="dark" placement="bottom">
            <span class="nav-text">{{ nav.name.slice(0, subnavlength) + '...' }}</span>
          </ui-tooltip>
          <span v-else class="nav-text">{{ nav.name }}</span>
        </a>
      </li>
      <SubnavMore v-if="subnavMoreList.length > 0" :more-nav="subnavMoreList" @click-nav-more="onclickNav" />
    </ul>
  </div>
</template>

<script>
import NAV from '../common/nav-center';
import { MAX_SUB_NAV_NUM, findUrl, preventDefaultAction } from '../common/nav-tools';
import SubnavMore from '../components/sub-nav-more.vue';
import errorImg from '../../assets/images/img-error-light.png';

export default {
  name: 'SubSystem',
  components: { SubnavMore },
  props: {
    isLargeScreen: Boolean
  },
  computed: {
    subSystem() {
      return NAV.subSystem || {};
    },
    subMenus() {
      return this.subSystem.childMenus || [];
    },
    subnavMoreList() {
      return this.subMenus.slice(MAX_SUB_NAV_NUM);
    },
    subNavList() {
      return this.subMenus.slice(0, MAX_SUB_NAV_NUM);
    },
    navLinks() {
      return NAV.navLinks;
    },
    // childMenus(){
    //     return NAV.childMenus;
    // },
    subnavlength() {
      return NAV.navlength + 1;
    }
  },
  data() {
    return {
      errorImg
    };
  },
  created() {
    this.loadTargetMenu();
  },
  methods: {
    findUrl(navInfo = {}) {
      const result = findUrl(navInfo);
      return result.url;
    },
    loadTargetMenu() {
      const { navLinks, navMap } = NAV;
      const length = navLinks.length;
      if (length < 1) return;
      const navId = navLinks[length - 1];
      if (!navId) return;
      const navObj = navMap[navId + ''];
      if (!navObj) return;
      this.updateNavSort(navObj);
    },
    handleBack() {
      NAV.stopGoNext(() => {
        this.$router.push('/dashboard/pages/home');
        NAV.clearSubSystem();
      });
    },
    // 更新菜单排序
    updateNavSort(navInfo) {
      const { id } = navInfo;
      const curIndex = this.subMenus.findIndex((nav) => nav.id == id);
      if (curIndex < MAX_SUB_NAV_NUM) return;
      NAV.subSystem.childMenus.splice(curIndex, 1);
      NAV.subSystem.childMenus.splice(MAX_SUB_NAV_NUM - 1, 0, navInfo);
    },
    // 点击导航菜单
    async onclickNav(navInfo, ev) {
      if (ev && ev.metaKey) return; // 新tab打开, 阻止js逻辑执行
      preventDefaultAction(ev); // 如果没有按 meta 键

      this.updateNavSort(navInfo);
      NAV.stopGoNext(() => {
        NAV.forceUpdateUrl(function () {
          NAV.renderPageview(navInfo, true);
        });
      });
    }
  }
};
</script>
