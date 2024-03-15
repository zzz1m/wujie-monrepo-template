<template>
  <div class="header-search-tools">
    <ui-popper-new
      ref="popper"
      v-clickoutsider="handleClickoutside"
      :append-to-body="true"
      :options="{
        placement: 'bottom',
        modifiers: {
          offset: {
            offset: '-25px, 0'
          }
        }
      }"
      root-class="header-tools-popper-common"
      tag-name="div"
      trigger="manual"
    >
      <div slot="reference" :class="['search-input-wrapper', normalWidth ? 'expanded' : '']" @transitionend="transitionend">
        <ui-input
          ref="input"
          v-model.trim="query"
          :class="[{ 'transform-width': transformWidth, 'has-value': query }]"
          :maxlength="maxlength"
          :placeholder="placeholder"
          type="text"
          @on-blur="onBlur"
          @on-change="onInputChange"
          @on-focus="onFocus"
        >
          <img slot="prefix" class="search-icon" src="@/assets/images/homepage/find.jpg" @click="onFocus" />
        </ui-input>
        <i v-if="query && normalWidth" class="suffix-icon ui-icon-circle-close" @click.stop="handleClear()"></i>
      </div>

      <div id="filter-result-list" :class="['select-option-wrapper']" @click.stop="() => {}">
        <div v-if="historyList.length && !this.query" class="search-history">
          <div class="search-history-title">搜索历史</div>
          <div v-for="(item, index) in historyList" :key="index + item" class="search-history-item" @click="handleHistoryClick(item)">
            {{ item }}
          </div>
        </div>
        <template v-else>
          <div v-if="isLoading" class="loading">
            <img src="https://img.bosszhipin.com/static/file/2021/gevnrdf0yo1638516357501.gif" />
          </div>
          <div v-else-if="!isLoading && times > 0 && !optionList.length && !menuList.length" class="empty">暂无相关信息，换个词试试吧</div>
          <div v-else>
            <div v-show="optionList.length && menuList.length" class="search-tab">
              <div class="search-tab-item" :class="activeName === 'all' && 'active'" @mouseover="handleTabOver('all')">
                <div class="search-tab-item-inner">全部</div>
              </div>
              <div class="search-tab-item" :class="activeName === 'menu' && 'active'" @mouseover="handleTabOver('menu')">
                <div class="search-tab-item-inner">功能</div>
              </div>
            </div>
            <div v-show="activeName === 'all'" class="group-container">
              <div v-for="(group, _index) in optionList" :key="_index" class="select-group">
                <div class="select-title">{{ group.source }}</div>
                <div v-for="(item, __index) in group.list" :key="__index" class="select-option boss-track" @click="handleClick(item)">
                  <router-link :to="getUrl(item.url)">
                    <div v-html="item.title"></div>
                  </router-link>
                </div>
              </div>
            </div>
            <div v-show="activeName === 'menu'" class="group-container">
              <div class="select-group">
                <div v-for="(item, index) in menuList" :key="index" class="select-option boss-track track-search-menu" @click="handleClick(item, true)">
                  <router-link v-if="item.target !== 'blank'" :to="item.url">{{ item.name }}</router-link>
                  <a v-else :href="item.url" target="_blank">
                    {{ item.name }}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </ui-popper-new>
  </div>
</template>
<script>
import { debounce } from '@noah/tools/src/utils/util';
import { API } from '@noah/tools';
const { _globalSearch, _getRecord, _lastSearchKeywords, _menuSearch } = API.HOMEPAGE;
const times = 0;
export default {
  name: 'SearchTools',
  props: {
    transformWidth: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    },
    maxlength: {
      type: Number,
      default: 100
    },
    width: {
      type: Number,
      default: 250
    }
  },
  components: {},
  data() {
    return {
      query: '',
      optionList: [],
      normalWidth: false,
      isLoading: false,
      times: times,
      historyList: [],
      menuList: [],
      activeName: 'all' // 默认全部菜单 all-全部 menu-菜单
    };
  },
  computed: {
    placeholder() {
      return this.normalWidth ? '常见问题、课程、伯乐职位等' : '搜索';
    }
  },
  created() {
    this.getHistory();
  },
  mounted() {},
  methods: {
    onInputChange(value) {
      if (this.$refs.input?.$el?.offsetWidth === this.width && this.query) {
        this.normalWidth = true;
        this.isLoading = true;
        this.$refs.popper && this.$refs.popper.doShow();
        this.handleQuery(this.query);
      } else {
        if (this.historyList.length) {
          this.$refs.popper && this.$refs.popper.doShow();
        } else {
          this.$refs.popper && this.$refs.popper.doClose();
          this.optionList = [];
          this.menuList = [];
        }
      }
    },
    onFocus() {
      this.normalWidth = true;
      this.$refs.input && this.$refs.input.focus();
      if (!this.$refs.popper) {
        return;
      }
    },
    onBlur(e) {},
    transitionend(e) {
      this.$nextTick(() => {
        if (e.propertyName === 'width') {
          if (this.$refs.input?.$el?.offsetWidth === this.width && this.query) {
            this.isLoading = true;
            this.$refs.popper.doShow();
            this.normalWidth = true;
            this.handleQuery(this.query);
          } else if (this.$refs.input?.$el?.offsetWidth === this.width && this.historyList.length) {
            if (!this.historyList.length) {
              return;
            }
            this.$refs.popper.doShow();
          } else {
            // this.$refs.popper.doClose();
          }
        }
      });
    },
    handleClickoutside(e) {
      this.normalWidth = false;
      this.optionList = [];
      this.menuList = [];
    },
    // 删除输入框值的方法
    handleClear() {
      this.query = '';
      this.optionList = [];
      this.menuList = [];
      if (this.historyList.length) {
        this.$refs.popper && this.$refs.popper.doShow();
      } else {
        this.$refs.popper && this.$refs.popper.doClose();
      }
    },

    async handleGetRecord(item, isMenu) {
      // 菜单和isRecord是true页面需要记录
      if (!item.isRecord && !isMenu) {
        return;
      }
      const { success } = await _getRecord({
        keywords: this.query,
        id: item.sourceId,
        type: item.source,
        searchType: 2 // 2是全局搜索   3是问题页搜索
      });
      if (!success) {
        return;
      }
      this.getHistory();
    },
    handleClick(item, isMenu) {
      try {
        this.handleGetRecord(item, isMenu);
        this.query = '';
        this.$refs.popper.doClose();
        this.normalWidth = false;
        this.optionList = [];
        this.menuList = [];
      } catch (error) {
        console.log(error);
      }
    },
    handleQuery: debounce(300, async function (keywords) {
      try {
        this.optionList = [];
        this.menuList = [];
        this.isLoading = true;
        this.times = 0;
        this.activeName = 'all';
        // if (!key) { return; }
        let [globalRes, menuRes] = await Promise.all([
          _globalSearch({ keywords }), // 获取查询结果列表
          _menuSearch({ keywords }) // 获取菜单列表
        ]);

        if (!globalRes.success || !menuRes.success) {
          return;
        }
        window.BossAnalytics &&
          window.BossAnalytics.track('CommonSearch', {
            action: 'search',
            searchValue: keywords
          });
        this.optionList = globalRes.root || [];
        this.menuList = menuRes.root || [];
        if (!this.optionList.length) {
          this.activeName = 'menu';
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.times++;
        this.isLoading = false;
      }
    }),
    getUrl(url) {
      let separator = url.indexOf('?') !== -1 ? '&' : '?';
      return url + separator + 'trackFrom=global';
    },
    handleHistoryClick(item) {
      this.query = item;
      this.isLoading = true;
      this.handleQuery(this.query);
    },
    async getHistory() {
      try {
        const { success, root } = await _lastSearchKeywords({
          month: 6,
          num: 10
        });
        if (!success) {
          return;
        }
        this.historyList = root || [];
      } catch (error) {
        console.log(error);
      } finally {
      }
    },
    handleTabOver(type) {
      this.activeName = type;
    }
  }
};
</script>
