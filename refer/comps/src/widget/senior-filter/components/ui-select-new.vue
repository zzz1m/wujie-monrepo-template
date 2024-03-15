<template>
  <div :class="['ui-select-new']">
    <div ref="checkedVal" :class="['checkedVal', label ? '' : 'blank', canFilter ? 'filterable' : '', $attrs.disabled ? 'disabled' : '']">
      {{ label || '请选择' }}
    </div>

    <ui-select ref="select" v-model="selectedVal" placeholder="" trigger="click" v-bind="$attrs" v-on="$listeners" @click.native="loadData">
      <template v-if="!isLoading && list.length > 0">
        <ui-option v-for="(item, key) in list" :key="key" :value="item[config.value]" @click.native="selectedField(item)">{{ item[config.label] }}</ui-option>
      </template>
    </ui-select>
  </div>
</template>

<script>
import { deepCopy } from '@noah/tools/src/utils/object';

export default {
  name: 'ui-select-new',
  props: {
    label: String,
    remote: Boolean,
    remoteMethod: Function,
    optionsList: {
      type: Array,
      default: () => []
    },
    config: {
      type: Object,
      default: () => ({
        value: 'id',
        label: 'name'
      })
    }
  },
  watch: {
    optionsList: {
      immediate: true,
      deep: true,
      handler(newval, oldval) {
        this.initMenu(newval);
      }
    }
  },
  data() {
    return {
      list: [],
      isLoading: false,
      selectedVal: '',
      canFilter: false
    };
  },
  created() {
    this.$nextTick(() => {
      this.canFilter = false;
      this.selectedVal = this.$parent.data.fieldId;
    });
  },
  methods: {
    initMenu(data) {
      if (!this.remote) {
        this.list = deepCopy(data);
      }
    },
    async loadData() {
      this.canFilter = true;
      if (this.remote) {
        // 加载远程数据
        this.isLoading = true;
        this.list = await this.remoteMethod();
        this.isLoading = false;
      }
    },
    selectedField(item) {
      this.$emit('option-selected', item);
    }
  }
};
</script>
