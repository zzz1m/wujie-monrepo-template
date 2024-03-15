<template>
  <div class="header-tools">
    <search-tools :transform-width="true" />
    <div class="header-user">
      <!-- <ui-tooltip content="审批" effect="dark" placement="bottom" popper-class="header-tooltip" :open-delay="400">
            <router-link class="process link-text"
                to="/dashboard/audit/audit-center/list?tabType=pending"
            >
                <svg-icon icon-class="icon-approval"></svg-icon>
                <span v-if="taskCount" class="count">{{ taskCount }}</span>
            </router-link>
        </ui-tooltip>

        <ui-tooltip content="个人档案" effect="dark" placement="bottom" popper-class="header-tooltip" :open-delay="400">
            <router-link class="record-container link-text" to="/dashboard/staff/record">
                <svg-icon icon-class="icon-personal-card"></svg-icon>
            </router-link>
        </ui-tooltip> -->

      <!-- 流程中心icon -->
      <div class="header-tools-link-wrapper">
        <router-link class="process header-tools-link" to="/dashboard/audit/audit-center/list?tabType=pending">
          <span>审批</span>
          <div
            v-if="taskCount"
            class="count"
            :class="{
              t20: taskCount < 10,
              t24: taskCount >= 10 && taskCount <= 99,
              t30: taskCount > 99
            }"
          >
            <span>{{ taskCount }}</span>
          </div>
        </router-link>
        <!-- 成就中心 -->
        <!-- <router-link class="record-container header-tools-link" to="/dashboard/staff/badge">
                <span>成就中心</span>
            </router-link> -->
      </div>
      <!--  -->
      <ui-dropmenu :class="['dropmenu-user', headImage ? 'hasImage' : '']">
        <span class="user-name">{{ userName }} </span>
        <img
          v-if="headImage"
          v-loading="{
            src: headImage,
            err_html: `<div style='display: flex;height: 100%; justify-content: center;align-items: center;background-color: #fff;color:#18c3b1;font-weight: 700;font-size:15px'>${
              userName ? userName[0] : ''
            }</div>`
          }"
          alt=""
          class="avatar"
        />
        <ul slot="options">
          <li>
            <router-link to="/dashboard/staff/record"> <i class="ti-folder"></i> 我的档案 </router-link>
          </li>
          <li>
            <router-link class="header-badge-icon" to="/dashboard/staff/badge"> <i class="ti-medall"></i> 我的徽章 </router-link>
          </li>
          <li @click="onLogout"><i class="ti-power-off"></i> 退出登录</li>
        </ul>
      </ui-dropmenu>

      <div v-if="showTip" v-clickoutside="handleHideTip" class="header-notice-tip">
        <div class="badge-tip-img">
          <img
            v-if="showBadgeObj.source"
            :draggable="false"
            :src="require(`@/assets/images/recommend/${showBadgeObj.source}_${showBadgeObj.type}_light.png`)"
          />
        </div>
        <h4>恭喜您！</h4>
        <p>您有新的成就已达成</p>
        <div class="badge-btn-new" @click="handleLightUp">去点亮</div>
      </div>
    </div>
    <badgeDialog ref="badge" />
  </div>
</template>
<script>
import { commonServices, API } from '@noah/tools';
import SearchTools from './search-tools.vue';
import { mapState, mapActions } from 'vuex';
import SessionStorage from '@noah/tools/src/utils/sessionstorage';
import badgeDialog from '../badge-dialog.vue';
import { commonPreviewImg } from '@noah/tools/src/utils/util';
const { _getLogout } = commonServices;
const { _hasLightingBadge } = API.HOMEPAGE;
export default {
  name: 'HeaderTools',
  props: {},
  components: {
    SearchTools,
    badgeDialog
  },
  computed: {
    ...mapState(['userInfo', 'pageTitle', 'auditCount', 'initPoster', 'showPostDialog']),
    ...mapState('skin', ['initSkinPoster', 'showSkinDialog']),
    userName() {
      return this.userInfo.name || '用户名';
    },
    taskCount() {
      if (this.auditCount) {
        return this.auditCount > 99 ? '99+' : this.auditCount;
      } else {
        return 0;
      }
    },
    // 默认头像处理为空
    headImage() {
      if (
        this.userInfo.headImage &&
        this.userInfo.headImage !== 'https://hi.zhipin.com/api/media/public/TsP7SZkwE7ezjK5LD5WsR3zzZYpODO1B9FAlYItg7KdG3VVTM2sh.png'
      ) {
        return this.previewImg(this.userInfo.headImage);
      }
      return '';
    }
  },
  data() {
    return {
      showTip: false,
      timer: null,
      showBadgeObj: {}
    };
  },
  mounted() {
    // this.getbadgeType();
    this.getAuditCount();
    // this.getCount();
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  watch: {
    initPoster: {
      immediate: true,
      handler: function (value) {
        this.getBadgeType();
      }
    },
    initSkinPoster: {
      immediate: true,
      handler: function (value) {
        this.getBadgeType();
      }
    }
  },
  methods: {
    previewImg(imgSrc) {
      return commonPreviewImg(imgSrc);
    },
    ...mapActions(['getAuditCount']),
    // getCount() {
    //     const step = 3 * 60 * 1000;
    //     this.timer = setInterval(() => {
    //         this.getAuditCount();
    //     }, step);
    // },
    handleHideTip() {
      this.showTip = false;
      // this.$router.push({
      //     path: '/dashboard/staff/record?type=badge'
      // });
    },
    handleLightUp() {
      this.handleHideTip();
      this.$router.push({
        path: '/dashboard/staff/badge'
      });
    },
    async _logout() {
      try {
        const res = await _getLogout();
        if (res.success) {
          SessionStorage.set('IS_EDITING', 0);
          if (res.root) window.location.href = res.root;
        }
      } catch (error) {}
    },
    onLogout() {
      const IS_EDITING = SessionStorage.get('IS_EDITING');
      if (IS_EDITING == 1) {
        this.$dialog({
          title: '温馨提示',
          type: 'warning',
          content: '离开会丢失未保存的修改，确定离开吗？',
          onConfirm: () => {
            this._logout();
          }
        });
      } else {
        this._logout();
      }
    },
    // 获取是否展示徽章弹窗状态
    async getBadgeType() {
      try {
        if (this.initPoster && this.initSkinPoster && !this.showPostDialog && !this.showSkinDialog) {
          const { success, root } = await _hasLightingBadge();
          if (!success || !root || !root.id) {
            return;
          }
          let notPrompted = root.prompted === 0;
          this.showBadgeObj = root;
          if (notPrompted) {
            this.$refs.badge && this.$refs.badge.open(this.showBadgeObj);
          } else {
            this.showTip = true;
          }
          // this.showTip = root;
          // this.$refs.badge && this.$refs.badge.open();
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>
