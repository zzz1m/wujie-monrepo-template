<template>
  <div class="app-header-tools">
    <app-nav-search />
    <div class="header-tools-link-wrapper">
      <router-link class="nav-item process" to="/dashboard/audit/audit-center/list?tabType=pending">
        <span>审批</span>

        <div v-if="auditCount" class="count" :class="{
          t20: auditCount < 10,
          t24: auditCount >= 10 && auditCount <= 99,
          t30: auditCount > 99,
        }">
          <span>{{ auditCount }}</span>
        </div>
      </router-link>
      <b-dropdown trigger="hover" class="feedback-dropmenu" :popup-max-height="500">
        <span class="nav-item">建议反馈</span>
        <template #content>
          <div class="feedback-content">
            <div class="feedback-title">Boss Hi扫码</div>
            <img src="https://img.bosszhipin.com/static/file/2023/89yo92dl3g1688038579537.jpg" />
            <div class="feedback-info">或点此加入群聊</div>
            <a target="_blank"
              href="https://hi.zhipin.com/openApp/index.html?scheme=bosshi%3A%2F%2Fchat%2FjumpToChat%3FchatId%3D66620696%26qrCode%3Dhi-102-Q-5e40efed8eb76370c27c%26chatType%3D2">
              <div class="people">
                <BossHiSvg />
                <span>Noah系统反馈</span>
              </div>
            </a>
          </div>
        </template>
      </b-dropdown>
    </div>
    <div class="header-user" v-if="userInfo">
      <b-dropdown trigger="hover" class="user-info-dropmenu">
        <div class="user-info">
          <span class="user-name">{{ userInfo.name }}</span>
          <img v-if="headImage" v-loading="{
            src: headImage,
            err_html: `<div style='display: flex;height: 100%; justify-content: center;align-items: center;background-color: #fff;color:#18c3b1;font-weight: 700;font-size:15px'>${userInfo.name ? userInfo.name[0] : ''
              }</div>`,
          }" class="avatar" alt="" />
        </div>
        <template #content>
          <b-dropdown-option @click="jumpFile">我的档案</b-dropdown-option>
          <b-dropdown-option @click="jumpBadge">我的徽章</b-dropdown-option>
          <b-dropdown-option class="border-t border-gray-100" @click="logout">
            退出登陆
          </b-dropdown-option>
        </template>
      </b-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import vLoading from '@/directives/loading';
import { useAppStore } from '@/store/app';
import { fetch } from '@/utils/fetch';
import BossHiSvg from '@/assets/svg/bosshi.vue';
import { commonPreviewImg } from '@/utils/util';
// @ts-ignore
import SockJS from 'sockjs-client/dist/sockjs.min.js';
// @ts-ignore
import Stomp from 'stompjs';

const appStore = useAppStore();
const { getAuditCount, updateAuditCount } = appStore;
const auditCount = computed(() => appStore.auditCount);
const userInfo = computed(() => appStore.userInfo);
getAuditCount();

const headImage = computed(() => {
  if (
    userInfo.value?.headImage &&
    userInfo.value?.headImage !==
    'https://hi.zhipin.com/api/media/public/TsP7SZkwE7ezjK5LD5WsR3zzZYpODO1B9FAlYItg7KdG3VVTM2sh.png'
  ) {
    return commonPreviewImg(userInfo.value?.headImage);
  }
  return '';
});

const router = useRouter();

const jumpFile = () => {
  router.push('/dashboard/staff/record');
};

const jumpBadge = () => {
  router.push('/dashboard/staff/badge');
};

const state = useSessionStorage('IS_EDITING', 0);
const logout = () => {
  if (state.value === 1) {
    // 阻止后退
  } else {
    onLogOut();
  }
};

async function onLogOut() {
  try {
    const { success, root } = await fetch('/api/user/logout.json');
    if (success) {
      state.value = 0;
      if (root) window.location.href = root;
    }
  } catch (error) {
    //
  }
}

let stompClient: any = null;
let socketTimer: number = 0;

if (!import.meta.env.DEV) {
  connect();
}

function connect() {
  if (!userInfo.value) return;
  try {
    const socket = new SockJS(`/stomp?t=${+new Date()}`);
    stompClient = Stomp.over(socket);
    stompClient.debug = () => { };
    // 向服务器发起websocket连接
    stompClient.connect(
      { email: userInfo.value?.email },
      () => {
        subscribe();
      },
      () => {
        clearTimeout(socketTimer);
        socketTimer = setTimeout(() => {
          connect();
        }, 15 * 1000);
      },
    );
  } catch (error) {
    console.log(error);
  }
}

function subscribe() {
  if (!userInfo) return;
  stompClient.subscribe(`/user/${userInfo.value?.email}/bpm`, (greeting: any) => {
    if (greeting?.body) {
      const data = JSON.parse(greeting.body);
      updateAuditCount(data.badge);
    }
  });
}
</script>
