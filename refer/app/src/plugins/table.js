import Vue from 'vue';
import {
    Column,
    Header,
    Icon,
    Table,
    Tooltip,
    VXETable
} from 'vxe-table';

// 使用它的虚拟树形表格解决数据大时的卡顿问题
import UTablec from 'umy-ui/packages/u-table/index';
import UTableColumnc from 'umy-ui/packages/u-table-column/index';
import { UTable, UTableColumn } from 'umy-ui';
import "vxe-table/lib/index.css";

VXETable.setup({
    // 自定义配置
});

Vue.use(UTableColumnc);
Vue.use(UTablec);
Vue.use(UTableColumn);
Vue.use(UTable);

Vue.use(Column);
Vue.use(Header);
Vue.use(Icon);
Vue.use(Tooltip);
Vue.use(Table);