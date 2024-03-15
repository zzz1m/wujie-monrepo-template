<!-- eslint-disable vue/no-v-text-v-html-on-component -->
<template>
  <div class="app-header-tools-search">
    <div
      ref="wrap"
      :class="['nav-search-input-wrap', { expanded: normalWidth }]"
    >
      <b-input
        class="nav-search-input"
        ref="input"
        v-model.trim="query"
        :placeholder="placeholder"
        :max-length="100"
        @input="onInputChange"
        @focus="onFocus"
      >
        <template #prefix>
          <img class="search-icon" :src="findIcon" @click="onFocus" />
        </template>
        <template #suffix v-if="query && normalWidth">
          <i
            class="suffix-icon ui-icon-circle-close"
            @click.stop="handleClear()"
          ></i>
        </template>
      </b-input>
      <div class="search-popper" v-if="popperShow">
        <div v-if="historyList.length && !query" class="search-history">
          <div class="search-history-title">搜索历史</div>
          <div
            v-for="(item, index) in historyList"
            :key="index + item"
            class="search-history-item"
            @click="handleHistoryClick(item)"
          >
            {{ item }}
          </div>
        </div>
        <template v-else>
          <div v-if="isLoading" class="loading">
            <img
              src="https://img.bosszhipin.com/static/file/2021/gevnrdf0yo1638516357501.gif"
            />
          </div>
          <div
            v-else-if="
              !isLoading && times > 0 && !optionList.length && !menuList.length
            "
            class="empty"
          >
            暂无相关信息，换个词试试吧
          </div>
          <div v-else>
            <div
              v-show="optionList.length && menuList.length"
              class="search-tab"
            >
              <div
                class="search-tab-item"
                :class="activeName === 'all' && 'active'"
                @mouseover="handleTabOver('all')"
              >
                <div class="search-tab-item-inner">全部</div>
              </div>
              <div
                class="search-tab-item"
                :class="activeName === 'menu' && 'active'"
                @mouseover="handleTabOver('menu')"
              >
                <div class="search-tab-item-inner">功能</div>
              </div>
            </div>
            <div v-show="activeName === 'all'" class="group-container">
              <div
                v-for="(group, index) in optionList"
                :key="index"
                class="select-group"
              >
                <div class="select-title">{{ group.source }}</div>
                <div
                  v-for="(item, index) in group.list"
                  :key="index"
                  class="select-option boss-track"
                  @click="handleClick(item)"
                >
                  <a
                    v-if="item.url.includes('http') || item.target === 'blank'"
                    :target="item.target === 'blank' ? '_blank' : '_self'"
                    :href="item.url"
                    v-html="item.title"
                  ></a>

                  <router-link
                    v-else
                    :to="getUrl(item.url)"
                    v-html="item.title"
                  ></router-link>
                </div>
              </div>
            </div>
            <div v-show="activeName === 'menu'" class="group-container">
              <div class="select-group">
                <div
                  v-for="(item, index) in menuList"
                  :key="index"
                  class="select-option boss-track track-search-menu"
                  @click="handleClick(item, true)"
                >
                  <router-link v-if="item.target !== 'blank'" :to="item.url">{{
                    item.name
                  }}</router-link>
                  <a v-else :href="item.url" target="_blank">
                    {{ item.name }}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { fetch } from '@/utils/fetch';
import findIcon from '@/assets/images/homepage/find.jpg';

const query = ref('');
const historyList = ref([]);
const optionList = ref<Option[]>([]);
const menuList = ref<MeunItem[]>([]);
const isLoading = ref(false);
const times = ref(0);
const activeName = ref('all');
const normalWidth = ref(false);
const popperShow = ref(false);

const placeholder = computed(() =>
  normalWidth.value ? '常见问题、课程、伯乐职位等' : '搜索',
);

let timer = 0;
const popper = {
  doShow: () => {
    timer = setTimeout(() => {
      popperShow.value = true;
    }, 500);
  },
  doClose: () => {
    clearTimeout(timer);
    popperShow.value = false;
  },
};

const wrap = ref();
onClickOutside(wrap, () => {
  handleClickoutside();
});

const input = ref<any>();
const width = 250;
function onInputChange() {
  if (input.value?.$el.offsetWidth === width && query) {
    normalWidth.value = true;
    isLoading.value = true;
    popper.doShow();
    handleQuery(query.value);
  } else {
    if (historyList.value.length) {
      popper.doShow();
    } else {
      popper.doClose();
      optionList.value = [];
      menuList.value = [];
    }
  }
}
function onFocus() {
  normalWidth.value = true;
  input.value?.focus();
  popper.doShow();
  handleQuery(query.value);
}

const handleQuery = useDebounceFn(async (keywords: string) => {
  try {
    optionList.value = [];
    menuList.value = [];
    isLoading.value = true;
    times.value = 0;
    activeName.value = 'all';

    if (!keywords) {
      isLoading.value = false;
      return;
    }

    let [globalRes, menuRes] = await Promise.all([
      fetch(`/api/homepage/v2/global/search.json?keywords=${keywords}`), // 获取查询结果列表
      fetch(`/api/homepage/v2/menu/search.json?keywords=${keywords}`), // 获取查询结果列表
    ]);
    if (!globalRes.success || !menuRes.success) return;
    // @ts-ignore
    window.BossAnalytics?.track('CommonSearch', {
      action: 'search',
      searchValue: keywords,
    });

    optionList.value = globalRes.root || [];
    menuList.value = menuRes.root || [];
    if (!optionList.value.length) {
      activeName.value = 'menu';
    }
  } catch (error) {
    console.log(error);
  } finally {
    times.value++;
    isLoading.value = false;
  }
}, 300);

function handleClick(item: MeunItem, isMenu?: boolean) {
  try {
    handleGetRecord(item, isMenu);
    query.value = '';
    popper.doClose();
    normalWidth.value = false;
    optionList.value = [];
    menuList.value = [];
  } catch (error) {
    console.log(error);
  }
}

function handleClickoutside() {
  normalWidth.value = false;
  optionList.value = [];
  menuList.value = [];
  popper.doClose();
}

function handleClear() {
  query.value = '';
  optionList.value = [];
  menuList.value = [];
  if (historyList.value.length) {
    popper.doShow();
  } else {
    popper.doClose();
  }
}

async function getHistoryList() {
  try {
    const { success, root } = await fetch(
      '/api/homepage/v2/global/lastSearchKeywords.json?month=6&num=10',
    );
    if (success) {
      historyList.value = root;
    }
  } catch (error) {
    //
  }
}
getHistoryList();

function handleHistoryClick(item: string) {
  query.value = item;
  isLoading.value = true;
  handleQuery(item);
}

async function handleGetRecord(item: MeunItem, isMenu?: boolean) {
  // 菜单和isRecord是true页面需要记录
  if (!item.isRecord && !isMenu) {
    return;
  }
  /**
   * searchType: 2是全局搜索 / 3是问题页搜索
   */
  const { success } = await fetch(
    `/api/homepage/v2/global/record.json?keywords=${query.value}&id=${item.sourceId}&type=${item.source}&searchType=2`,
  );
  if (!success) {
    return;
  }
  getHistoryList();
}

function getUrl(url: string) {
  let separator = url.indexOf('?') !== -1 ? '&' : '?';
  return url + separator + 'trackFrom=global';
}

function handleTabOver(type: string) {
  activeName.value = type;
}

interface MeunItem {
  isRecord: boolean;
  sourceId: string;
  source: string;
  target: 'blank' | 'self';
  url: string;
  title: string;
  name: string;
}

interface Option {
  module: string;
  source: string;
  list: MeunItem[];
  url: string;
  title: string;
  name: string;
}
</script>
