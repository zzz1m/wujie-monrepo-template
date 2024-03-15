<template>
<div class="panel-data-table">
    <div v-if="tableData && tableData.length">
        <ui-table-pro
            :border="false"
            :data="tableData" empty-text="暂无数据"
            stripe tooltip-effect="dark" tooltip-max-width="200px"
        >
            <ui-table-column
                v-for=" item in education"
                :key="item.key"
                class-name="ui-edu"
                :label="item.label"
                min-width="180"
                prop="item.key"
            >
                <template slot-scope="{row}">
                    <ui-select v-if="item.action == 'select'"
                        :key="row[item.key]"
                        v-model="row[item.key]"
                        clearable
                        filterable placeholder="请选择" transfer
                        @on-change="clearBackHomeDate(row, item)"
                    >
                        <ui-option
                            v-for="dictItem in metaValue[item.dicType]"
                            :key="dictItem.dictCode"
                            :value="dictItem.dictCode"
                        >{{ dictItem.dictName }}</ui-option>
                    </ui-select>
                    <ui-input v-else-if="item.action === 'input'" v-model.trim="row[item.key]"
                        clearable :maxlength="40" placeholder="请输入"
                    ></ui-input>
                    <newSelect v-else-if="item.action === 'keyword'" placeholder="请选择" :text.sync="row[item.key]" url="/api/talentatlas/school/searchByAlias.json" @change="(val) => setSchool(row, val)"></newSelect>
                    <ui-date-picker v-else v-model="row[item.key]" clearable :disabled="row.isAbroad != 1 && item.key == 'backHomecountryDate'"
                        placeholder="请选择" type="date" value-format="yyyy-MM-dd"
                    ></ui-date-picker>
                </template>
            </ui-table-column>
            <ui-table-column fixed="right" label="操作" prop="options" width="70">
                <template slot-scope="{row, $index}">
                    <a href="javascript:void(0);" @click="delEducation(row, $index)">删除</a>
                </template>
            </ui-table-column>
        </ui-table-pro>
        <div class="save-education">
            <button class="btn btn-primary" @click="saveEducation">保存</button>
        </div>
    </div>
    <div v-else class="blank-viewer">暂无数据</div>
</div>
</template>

<script>
import { util, API } from '@noah/tools';
const { debounce } = util;
const { _updateEdu } = API.ENTRY;
import newSelect from './newSelect2.vue';
export default {
  name: 'DataEditTable',
  components: {
    newSelect
  },
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
    },
    detailId: String
  },
  data() {
    return {
      education: [
        {key: 'entryDate', label: '教育经历开始时间', action: 'date'},
        {key: 'gradDate', label: '教育经历结束时间', action: 'date'},
        {key: 'schoolName', label: '毕业院校', action: 'keyword'},
        {key: 'schoolType', label: '学习形式', dicType: 'learning_style', action: 'select'},
        {key: 'major', label: '专业名称', action: 'input'},
        {key: 'record', label: '获得学历', dicType: 'user_education', action: 'select'},
        {key: 'degreeName', label: '学位', dicType: 'degree', action: 'select'},
        // {key: 'isMaxDegree', label: '是否最高学历', dicType: 'whether_options', isBoolean: true, action: 'select'},
        {key: 'is985', label: '是否985高校', dicType: 'whether_options', isBoolean: true, action: 'select'},
        {key: 'is211', label: '是否211高校', dicType: 'whether_options', isBoolean: true, action: 'select'},
        {key: 'isAbroad', label: '是否国外及港澳台院校', dicType: 'whether_options', isBoolean: true, action: 'select'},
        {key: 'backHomecountryDate', label: '留学首次回国时间', action: 'date'}
      ]
    };
  },
  computed: {
    columns() {
      return this.config.columns || [];
    },
    tableData() {
      return this.data ? [...this.data] : [];
    }
  },
  methods: {
    setSchool(row, val) {
      if (val.area === '') {
        this.$set(row, 'isAbroad', '');
      } else if (val.area !== '中国') {
        this.$set(row, 'isAbroad', '1');
      } else {
        this.$set(row, 'isAbroad', '2');
      }
      if (val.label.includes('01')) {
        this.$set(row, 'is985', '1');
      } else {
        this.$set(row, 'is985', '2');
      }
      if (val.label.includes('02')) {
        this.$set(row, 'is211', '1');
      } else {
        this.$set(row, 'is211', '2');
      }
    },
    addEducation: debounce(300, function() {
      this.rawAddEdu();
    }),
    rawAddEdu() {
      this.tableData.push(this.getInitData());
    },
    delEducation(row, index) {
      this.$dialog({
        title: '删除',
        content: `请确认删除当前教育经历？`,
        type: 'warning',
        onConfirm: () => {
          this.tableData.splice(index, 1);
        }
      });
    },
    calcPlaceholder(data, config, placeholder='--') {
      const { dicType, key, isBoolean } = config;
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
    },
    saveEducation: debounce(300, function() {
      this.rawSaveEdu();
    }),
    async rawSaveEdu() {
      try {
        const params = {
          detailId:  this.detailId,
          educationExp: [
            ...this.tableData
          ]
        };
        if(!this.validateData()) return this.$toast('请填写完整教育经历', 'warning');
        if(!this.tableData.length) return this.$toast('教育经历不能为空', 'warning');
        const { success, root } = await _updateEdu(params);
        if(success){
          this.$toast('保存成功', 'success');
        }
      } catch (err) {
        console.log('err',err);
      }
    },
    getInitData() {
      return {
        entryDate: '',
        gradDate: '',
        schoolName: '',
        schoolType: '',
        major: '',
        record: '',
        degreeName: '',
        isMaxDegree: '',
        is985: '',
        is211: '',
        isAbroad: '',
        backHomecountryDate: ''
      };
    },
    validateData() {
      let flag = true;
      this.tableData.some(item => {
        Object.keys(item).filter(value => !['backHomecountryDate', 'isMaxDegree'].includes(value)).some(v=>{

          if(item[v] == '' || item[v] == undefined || item[v] == null){
            console.log(v, item[v]);
            flag = false;
            return;
          }
        });
      });
      return flag;
    },
    // 归国时间清空
    clearBackHomeDate(row, item) {
      if(item.key == 'isAbroad' && row[item.key] != 1){
        row.backHomecountryDate = '';
        return;
      }
    }
  }
};
</script>
