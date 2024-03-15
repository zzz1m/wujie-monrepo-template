<style lang="less">
@import "boss-ui/src/styles/index.less";
@import './styles/index';
</style>

<template>
  <div id="wrap" :class="$route.meta.wrapClass">
    <NavBar v-show="showHeader" @on-route-change="showBackFn" />
    <div id="main" class="page-main">
      <div v-if="showSide && childMenus.length > 0" id="app-sidebar-new" class="sidebar-new"
        :class="[menuExpand ? '' : 'collapsed']" :style="{ 'width': menuExpand ? '200px' : '12px' }">
        <ui-scrollbar style="overflow-y: auto; height: 100%;">
          <Menulist :menu-list="childMenus" />
        </ui-scrollbar>
        <div :class="['btn-toggle', !menuExpand ? 'expanded' : '']" @click="toggleMenu()">
          <i class="ui-icon-arrow-left"></i>
        </div>
      </div>

      <PageContainer id="container" :class="{
        'full-page': childMenus.length === 0,
        'collapsed': !menuExpand && childMenus.length > 0,
        'no-history-back': !showBack
      }">
        <!-- 统一的返回组件 -->
        <History v-if="showBack"
          :class="[{ 'center': historyCenter, 'custom-back-style': customBackStyle, 'custom-back': customBack }, customBackClass]">
          <component :is="historyComp"></component>
        </History>

        <RouterLoading />
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive" @update:currentMenu="updateCurrentMenu"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive" @update:currentMenu="updateCurrentMenu"></router-view>
      </PageContainer>
    </div>
    <PageFooter v-if="showFooter" />
    <!-- 更新提示弹窗 -->
    <poster-dialog />
    <!-- 首页换肤弹窗 -->
    <SkinDialog />
    <page-loading />
  </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from 'vuex';

import { History, Menulist, PageFooter, NavBar, PageLoading, RouterLoading, PosterDialog, SkinDialog, NAV, PageContainer } from '@noah/components';

import SockJS from 'sockjs-client/dist/sockjs.min.js';
import Stomp from 'stompjs';

export default {
  name: 'App',
  components: {
    NavBar, Menulist, History, PageFooter,
    PosterDialog, PageLoading, SkinDialog,
    RouterLoading, PageContainer
  },
  computed: {
    ...mapState('skin', ['skinStartDate', 'skinEndDate']),
    ...mapGetters('skin', ['isSkinDuration']),
    ...mapState(['userInfo']),
    childMenus() {
      return NAV.childMenus || [];
    },
    showHeader() {
      return this.$route.meta.noHeader !== true;
    },
    showSide() {
      return this.$route.meta.noSide !== true;
    },
    historyComp() {
      return this.$route.meta.historyComp || ''; // 动态history组件配置
    },
    showFooter() {
      return this.$route.meta.showFooter || false;
    },
    historyCenter() {
      return this.$route.meta.historyCenter || false;
    },
    customBackStyle() {
      return this.$route.meta.customBackStyle || false;
    },
    customBack() {
      return this.$route.meta.customBack || false;
    },
    customBackClass() {
      return this.$route.meta.customBackClass || '';
    }
  },
  data() {
    return {
      currentPath: '',
      menuExpand: true,
      showBack: false,
      stompClient: null,
      connectNum: 0,
      socketTimer: null
    };
  },
  mounted() {
    this.getPermissions();
    window.addEventListener('resize', this.onWindowResize);
    // 换肤添加特殊class
    if (this.isSkinDuration) {
      document.querySelector('body').classList.add('zhizhi-birthday');
    } else {
      document.querySelector('body').classList.remove('zhizhi-birthday');
    }
    this.$store.dispatch('skin/getSkinDialogType', this.$route);
    // this.connect();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onWindowResize);
  },
  methods: {
    ...mapActions(['getPermissions']), // 获取待办数量 用于头部右上角显示
    showBackFn(newRoute) {
      const { hideBack } = newRoute.query; // 强制隐藏hideback
      const { showBack, backFn } = newRoute.meta;
      this.showBack = hideBack != 1 && (
        typeof backFn === 'function' || (
          showBack && window.history.length > 2
        )
      );
    },
    updateCurrentMenu(path) {
      this.currentPath = path;
    },
    toggleMenu(state) {
      if (state != undefined) this.menuExpand = state;
      else this.menuExpand = !this.menuExpand;
      this.$store.commit('updateMenuExpand', this.menuExpand);
    },
    onWindowResize() {
      const totalWidth = window.screen.width;
      const viewWidth = window.innerWidth;
      this.menuExpand = viewWidth >= totalWidth * 0.6;
    },
    connect() {
      try {
        const socket = new SockJS(`/stomp?t=${+new Date()}`);
        this.stompClient = Stomp.over(socket);
        this.stompClient.debug = () => { };
        // 向服务器发起websocket连接
        this.stompClient.connect({ email: this.userInfo.email }, () => {
          this.subscribe();
        }, error => {
          clearTimeout(this.socketTimer);
          this.socketTimer = setTimeout(() => {
            this.connect();
          }, 15 * 1000);
        });
      } catch (error) {
        console.log(error);
      }
    },
    // 订阅公告
    subscribe() {
      this.auditSubscribe();
    },
    // 审批中心订阅
    auditSubscribe() {
      this.stompClient.subscribe(`/user/${this.userInfo.email}/bpm`, (greeting) => {
        if (greeting?.body) {
          const data = JSON.parse(greeting.body);
          this.$store.commit('updateAuditCount', data.badge);
        }
      });
      this.stompClient.subscribe(`/topic/activityGiveLike`, (greeting) => {
        if (greeting?.body) {
          const data = JSON.parse(greeting.body);
          this.$store.commit('skin/updateStarNum', data.total);
        }
      });
    },
    // 发送消息
    sendMessage() {
      // this.stompClient.send('/app/chat', {}, JSON.stringify({}))
    },
    // 断开连接
    disconnect() {
      if (this.stompClient !== null) {
        this.stompClient.disconnect();
      }
    }
  }
};
</script>
