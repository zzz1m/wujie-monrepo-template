<template>
  <div v-if="tableList.length" class="distance-table fix-table-warp">
    <ui-table-pro ref="dataTable" :data="tableList" :height="100" tooltip-effect="dark" tooltip-max-width="200px">
      <ui-table-column label="出发地" min-width="120px" show-overflow-tooltip>
        <template slot-scope="{ row: item }">
          {{ item.fromCityCode }}
        </template>
      </ui-table-column>
      <ui-table-column label="目的地" min-width="120px" show-overflow-tooltip>
        <template slot-scope="{ row: item }">
          {{ item.toCityCode }}
        </template>
      </ui-table-column>
      <ui-table-column label="开始日期" min-width="120px" show-overflow-tooltip>
        <template slot-scope="{ row: item }">
          {{ item.startDate }}
        </template>
      </ui-table-column>
      <ui-table-column label="离开日期" min-width="120px" show-overflow-tooltip>
        <template slot-scope="{ row: item }">
          {{ item.endDate }}
        </template>
      </ui-table-column>
      <ui-table-column label="事由" min-width="200px" show-overflow-tooltip>
        <template slot-scope="{ row: item }">
          {{ item.remark }}
        </template>
      </ui-table-column>
      <ui-table-column v-if="showAction" label="操作" min-width="120px" show-overflow-tooltip>
        <template slot-scope="scope">
          <p class="distance-action">
            <span @click="chooseEdit(scope.$index)">编辑</span><span style="margin: 0 8px; color: #e3e7ed">|</span
            ><span @click="deleteDistance(scope.$index)">删除</span>
          </p>
        </template>
      </ui-table-column>
    </ui-table-pro>
  </div>
</template>
<script>
import { attendanceServices } from '@noah/tools';
const { _searchYoldanda } = attendanceServices;
export default {
  props: {
    distanceList: {
      type: Array,
      default: () => []
    },
    showAction: {
      type: Boolean,
      default: true
    }
  },
  components: {},
  created() {
    console.log(this.distanceList, 'distanceList');
    this.fixData();
  },
  mounted() {},
  data() {
    return {
      tableList: [],
      cityObj: {},
      cityList: []
    };
  },
  computed: {},
  methods: {
    deleteDistance(index) {
      this.$emit('deleteDistance', index);
    },
    cityName(code) {
      return this.cityList.filter((item) => {
        return item.code === code;
      })[0].areaName;
    },
    chooseEdit(index) {
      this.$emit('chooseEdit', index);
    },
    async fixData() {
      this.distanceList.forEach((item) => {
        this.cityList.push(item.fromCityCode);
        this.cityList.push(item.toCityCode);
      });
      const res = await _searchYoldanda(this.cityList);
      if (res.success && res.root && res.root.length) {
        res.root.forEach((item) => {
          this.cityObj[item.code] = item.areaName;
        });
      }
      this.tableList = this.distanceList.map((item) => {
        let titem = JSON.parse(JSON.stringify(item));
        titem.fromCityCode = this.cityObj[item.fromCityCode];
        titem.toCityCode = this.cityObj[item.toCityCode];
        return titem;
      });
    }
  },
  watch: {
    distanceList: {
      deep: true,
      handler: function (e) {
        if (e.length) {
          this.fixData();
        }
      }
    }
  }
};
</script>

<style lang="less" scoped>
.distance-table {
  width: 100%;

  .distance-action {
    color: #00cfc5;
    user-select: none;

    span {
      &:first-child,
      &:last-child {
        cursor: pointer;
      }
    }
  }
}

::v-deep .ui-table-body-wrapper {
  height: auto !important;
}
</style>
