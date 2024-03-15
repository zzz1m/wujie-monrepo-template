<template>
<div class="performance-user-content">
    <div class="table-wrapper">
        <ui-table-pro :data="currentList" class="table-pro-reset-ui"
            tooltip-effect="dark" tooltip-max-width="200px" 
            empty-text="暂无数据" height="100%"
        >   
            <ui-table-column v-for="item in headerList" :key="item.key" :prop="item.key" :label="item.key" :min-width="item.minWidth"  show-overflow-tooltip></ui-table-column>
        </ui-table-pro>
    </div>
                
    <ui-pager
        text-align="center"
        show-total
        show-elevator
        :total="pageData.total" :current="pageData.current"
        :page-size="pageData.pageSize" :page-size-opts="[15, 30, 50, 100]"
        @update:page="onCurrentPageChange" @update:pageSize="onPageSizeChange"
    >
    </ui-pager>
</div>
</template>

<script>

export default {
    name: 'EditDialog',
    components: {
    },
    props: {
        tableList: {
            type: Array,
            default: () =>  []
        }
    },
    data () {
        return {
            pageData: {                         // 分页配置
                total: 30,
                current: 1,
                pageSize: 15
            }
        };
    },
    computed: {
        headerList() {
            if (!this.tableList.length) {
                return [];
            }
            return Object.entries(this.tableList[0]).map(([key, value]) => {
                return {
                    key: key,
                    value: value,
                    minWidth: key.length*14 + 30 > 120 ? key.length*14 + 30 : 120
                };
            });
        },
        currentList() {
            const { current, pageSize } = this.pageData;
            return this.tableList.slice((current-1)*pageSize, pageSize*current);
        }
    },
    created () {
        this.pageData.total = this.tableList.length;
    },

    methods: {
        /**
         * @description 修改分页组件page
         * @param {String} page 页面数字
         */
        onCurrentPageChange(page) {
            this.pageData.current = page;
        },

        /**
         * @description 修改分页组件pageSize
         * @param {String} pageSize 每页显示条数
         */
        onPageSizeChange(pageSize) {
            this.pageData.pageSize = +pageSize;
        },
        async onSave() {
            return true;
        }
    }
};
</script>