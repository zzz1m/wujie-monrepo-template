<template>
  <!-- 表格区域 -->
  <div class="data-list">
    <slot :data="tableData" :is-loading="isLoading" name="custom" />
    <ui-table-pro
      class="table-pro-reset-ui"
      :data="tableData"
      empty-text="暂无数据"
      height="100%"
      tooltip-effect="dark"
      :tooltip-max-width="tooltipMaxWidth"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <template slot="empty">
        <slot name="empty">
          <table-empty-tip :tip-type="tableDataType"></table-empty-tip>
        </slot>
      </template>
      <slot></slot>
      <template v-if="columnList.length">
        <template v-for="(item, index) in columnList">
          <ui-table-column
            v-if="!item.hidden"
            :key="item.prop || index"
            :align="item.align"
            :fixed="item.fixed"
            :min-width="item.minWidth"
            :prop="item.prop"
            :show-overflow-tooltip="item.showTooltip === false ? false : true"
            :sort-orders="item.sortOrders"
            :sortable="item.sortable"
            :width="item.width"
          >
            <template #header>
              {{ item.label }}
            </template>
            <template slot-scope="{ row }">
              <component :is="item.customEl" v-if="item.customEl" :custom-data="customData" :row="row" />
              <!-- 处理状态 -->
              <Status
                v-else-if="item.stateKey"
                :row="row"
                :show-state-map="item.showStateMap"
                :state-key="item.stateKey"
                :state-name="item.render ? item.render(row) : getName(row, item)"
              />
              <!-- 处理链接 path同按钮 为string或者function  -->
              <a v-else-if="getPath(item, row).match(/^http/i)" :href="getPath(item, row)" :target="item.target || '_self'">
                {{ item.render ? item.render(row) : getName(row, item) }}
              </a>
              <router-link v-else-if="getPath(item, row) && !getPath(item, row).match(/^http/i)" :target="item.target || '_self'" :to="getPath(item, row)">
                {{ item.render ? item.render(row) : getName(row, item) }}
              </router-link>
              <div v-else-if="item.htmlRender" v-html="item.htmlRender(row)"></div>
              <span v-else :class="getClass(item, row)">{{ item.render ? item.render(row) : getName(row, item) }}</span>
            </template>
          </ui-table-column>
        </template>
      </template>
      <slot name="slot-right"></slot>

      <ui-table-column
        v-if="!hiddenOperation && operationList && operationList.length"
        class-name="operate"
        :fixed="operationFixed"
        label="操作"
        :width="operationWidth"
      >
        <template slot-scope="{ row, $index }">
          <btn-wrapper
            :btn-list="operationList"
            :data="row"
            :max-show="operationBtnMax"
            @op-click="(key, row) => handleOpClick(key, row, $index)"
          ></btn-wrapper>
        </template>
      </ui-table-column>
    </ui-table-pro>
    <div v-if="!hiddenPager" v-show="!isHidePager" class="fasion-pager text-center" :class="pagerClass">
      <slot name="footer"></slot>
      <ui-pager
        v-show="tableData.length && !showLoadError && !hiddenPager"
        ref="pager"
        :current="pageData.current"
        :page-size="pageData.pageSize"
        :page-size-opts="pageSizeOpts"
        show-elevator
        show-sizer
        show-total
        text-align="center"
        :total="pageData.total"
        @update:page="onCurrentPageChange"
        @update:pageSize="onPageSizeChange"
      >
      </ui-pager>
    </div>
  </div>
</template>
<script>
import TableEmptyTip from '../table-empty-tip';
import { debounce } from '@noah/tools/src/utils/util';
import { _getValue, getNameByCode, isNull, agentWarper } from '@noah/tools/src/utils/util.js';
import Status from './status.vue';
import btnWrapper from './btn-wrapper';

export default {
  components: {
    TableEmptyTip,
    btnWrapper,
    Status
  },
  props: {
    // 搜索的promise方法
    searchQuery: {
      type: Function,
      default: () => () => {
        return new Promise();
      }
    },
    // 查询接口入参
    queryData: {
      type: Object,
      default: () => {}
    },
    // 进入页面 默认启动搜索方法
    initOnSearch: {
      type: Boolean,
      default: true
    },
    tooltipMaxWidth: {
      type: String,
      default: '200px'
    },
    // 是否显示分页
    hiddenPager: Boolean,
    hidePager: {
      type: Boolean,
      default: false
    },
    // 隐藏操作列
    hiddenOperation: Boolean,
    // 操作列展示方式
    operationFixed: {
      type: [String, Boolean],
      default: 'right'
    },
    // 操作列width
    operationWidth: {
      type: [Number, String],
      default: '200'
    },
    pageSizeOpts: {
      type: Array,
      default: () => {
        return [15, 30, 50, 100];
      }
    },
    pagerClass: {
      type: String,
      default: ''
    },
    // 展示列配置对象
    columnList: {
      type: Array,
      default: () => [
        // {
        //     prop: 'changeUser',         // key
        //     label: '变更负责人',          // 展示名称
        //     // hidden: true,               // 可选 是否隐藏 默认不隐藏
        //     // minWidth: '100',
        //     // fixed: 'left',           // 可选 浮动方式
        //     // showTooltip: false,      // 可选 展示tip 默认true
        //     // render: (row) => {       // 可选 自定义展示
        //     //     return row.deleted ? '启用': '回收';
        //     // }
        //     // customEl:          // 组件  可选
        // }
      ]
    },
    // 操作列list
    operationList: {
      type: Array,
      default: () => {
        return [
          // {
          //     key: 'status',
          //     name: '变更负责人',
          //     hidden(row) {            // 是否隐藏
          //         return false;
          //     },
          //     render: (row) => {       // 可选 自定义展示
          //         return row.deleted ? '启用': '回收';
          //     }
          // }
        ];
      }
    },
    // 最多展示几个按钮 更多也算一个
    operationBtnMax: {
      type: Number,
      default: 4
    },
    customData: {
      // 自定义组件 数据对象
      type: Object,
      default: () => {}
    },
    statusMap: {
      // 枚举map
      type: Object,
      default: () => {}
    },
    userQueryData: Boolean // 启用地址栏保存参数
  },
  data() {
    return {
      pageData: {
        // 分页配置
        total: 0,
        current: 1,
        pageSize: 30
      },
      isLoading: false, // 显示加载中
      showLoadError: false, // 显示报错模块
      tableData: [],
      currentOrder: {}, // 当前选中行
      pageInit: false
    };
  },
  computed: {
    // 数据为空报错加载中时的组件类型
    tableDataType() {
      if (this.isLoading) {
        return 'loading';
      } else if (this.showLoadError) {
        return 'error';
      } else if (this.tableData && !this.tableData.length) {
        return 'noData';
      } else {
        return null;
      }
    },
    isHidePager() {
      return this.tableData.length === 0 && this.hidePager;
    }
  },
  created() {
    this.warperSearchQuery = agentWarper(this.searchQuery);
    // 启用地址栏参数搜索
    if (this.userQueryData) {
      this.getQuery();
    }
    this.getNameByCode = getNameByCode;
    if (this.initOnSearch) {
      this.isLoading = true;
    }
    this.init();
  },
  mounted() {},
  methods: {
    getPath(item, row) {
      if (!item.path) {
        return '';
      }
      return typeof item.path === 'string' ? item.path : item.path(row);
    },
    getClass(item, row) {
      if (!item.cellClass) {
        return '';
      }
      if (typeof item.cellClass === 'string') {
        return item.cellClass;
      } else {
        return item.cellClass(row);
      }
    },
    init() {
      if (!this.initOnSearch) {
        return;
      }
      this.onSearch(this.pageData.current);
    },
    getPageData() {
      return {
        current: this.pageData.current,
        pageSize: this.pageData.pageSize
      };
    },
    setPageData({ current, pageSize }) {
      this.pageData.pageSize = pageSize;
      this.onSearch(current);
    },
    /**
     * @description 页面搜索方法
     * @param {Number} page 需要查询的页数
     */
    onSearch: debounce(300, async function (page = 1, config) {
      try {
        this.pageData.current = page;
        const { current, pageSize } = this.pageData;
        this.isLoading = true;
        this.tableData = [];
        this.showLoadError = false;

        const params = {
          ...this.queryData
        };
        if (!this.hiddenPager) {
          params.page = current;
          params.pageSize = pageSize;
        }
        if (this.userQueryData) {
          this.setQuery(params);
        }

        const { success, data, root } = await this.warperSearchQuery(params, config);
        let resData = data || root;
        if (success && resData) {
          this.tableData = resData.list || [];
          this.$emit('isEmpty', this.tableData.length === 0);
          if (this.hiddenPager) {
            return;
          }
          this.pageData.total = !isNull(resData.total) ? resData.total : resData.count;
          this.$emit('on-search', root);
        } else {
          this.showLoadError = true;
        }
      } catch (e) {
        console.log(e);
        this.showLoadError = true;
      } finally {
        this.isLoading = false;
      }
    }),
    /**
     * @description 操作按钮点击
     */
    handleOpClick(key, row, index) {
      this.$emit('op-click', key, row, index);
    },
    /**
     * @description 修改分页组件page
     * @param {String} page 页面数字
     */
    onCurrentPageChange(page) {
      this.onSearch(+page, {
        searchType: 'pageChange'
      });
      this.$emit('update:page', page);
    },
    /**
     * @description 修改分页组件pageSize
     * @param {String} pageSize 每页显示条数
     */
    onPageSizeChange(pageSize) {
      if (!this.pageInit) {
        this.pageInit = true;
        this.$refs.pager.currentPage = this.pageData.current;
        this.onSearch(this.pageData.current, {
          searchType: 'sizeChange'
        });
      } else {
        this.pageData.pageSize = +pageSize;
        this.onSearch(1, {
          searchType: 'sizeChange'
        });
      }
      this.$emit('update:pageSize', pageSize);
    },
    /**
     * @description 向地址栏塞值用来做缓存
     * @param {Object} data 要缓存的数据
     */
    setQuery(data) {
      let query = {};
      Object.entries(data).forEach(([key, value]) => {
        if (isNull(value)) {
          return;
        }
        query[key] = value;
      });

      this.$router.replace({
        path: this.$route.path,
        query
      });
    },
    getQuery() {
      const query = this.$route.query;
      Object.keys(this.queryData).forEach((key) => {
        if (!isNull(query[key])) {
          Object.assign(this.queryData, {
            [key]: query[key]
          });
        }
      });
      const { page, pageSize } = query;
      if (!page && !pageSize) {
        return;
      }
      this.pageData.current = +page;
      this.pageData.pageSize = +pageSize;
    },
    getName(row, item) {
      if (item.statusCode && !isNull(row[item.prop]) && this?.statusMap[item.statusCode]) {
        let statusObj = this?.statusMap[item.statusCode].find((status) => {
          return status.code === row[item.prop];
        });
        return statusObj?.name || '';
      } else {
        return row[item.prop];
      }
    }
  }
};
</script>
