<template>
<div class="panel-data-table">
    <ui-table v-if="calcData && calcData.length"
        fixed-header max-body-height="300"
    >
        <thead slot="header">
            <tr>
                <th v-for="(item, idx) in columns" :key="idx">{{ item.label }}</th>
            </tr>
        </thead>
        <tbody slot="body">
            <tr v-for="(item,idx) in calcData" :key="idx">
                <td v-for="cell in columns" :key="cell.keys">{{ calcPlaceholder(item, cell) }}</td>
            </tr>
        </tbody>
    </ui-table>
    <div v-else class="blank-viewer">暂无数据</div>
</div>
</template>

<script>
export default {
  name: 'DataTable',
  props: {
    data: {
      type: [Array, String],
      default: () => ([])
    },
    config: {
      type: Object,
      default: () => ({})
    },
    metaValue: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    columns() {
      return this.config.columns || [];
    },
    calcData() {
      if( !this.data || this.data.length === 0){
        return [];
      }
      return this.data;
    }
  },
  methods: {
    calcPlaceholder(data, config, placeholder='--') {
      const { dicType, key, isBoolean } = config;
      if (key === 'certificateTime') {
        if (data[key]) {
          return this.$dayjs(data[key]).format('YYYY-MM');
        }
        return '';
      }
      const isBlank = data[key] === '' || data[key] === null || data[key] === undefined;
      const value = data[key];
      if(isBlank) return placeholder;
      if( dicType ){ // 字典类型
        const code = data[key];
        const item = this.metaValue[dicType].find(cell => cell.dictCode == code);
        return item ? item.dictName : placeholder;
      } else if(isBoolean) {
        return value == 1 ? '是' : '否';
      }else {
        return value;
      }
    }
  }
};
</script>
