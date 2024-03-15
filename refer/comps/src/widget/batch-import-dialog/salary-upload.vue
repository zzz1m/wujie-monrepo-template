<template>
  <div class="salary-form">
    <input :id="id" accept="xlsx,xls" type="file" @change="handlerChange" />
    <ui-dialog
      v-model="showDialog"
      :confirm-loading="loading"
      lock
      :prevent-confirm="true"
      prevent-layer
      title="选择要导入的sheet页"
      width="400"
      wrap-class="salary-batch-import-dialog"
      @on-confirm="chooseSheet"
    >
      <template v-if="showDialog" slot="content">
        <ui-select v-model="sheet" filterable placeholder="选择要导入的sheet页" style="width: 100%" transfer>
          <ui-option v-for="(item, index) in sheetList" :key="index" :value="item">{{ item }}</ui-option>
        </ui-select>
      </template>
    </ui-dialog>
  </div>
</template>

<script>
const getXlsxSheet = function (file) {
  return new Promise((resolve, reject) => {
    try {
      let wb;
      let reader = new FileReader();
      reader.onload = function (e) {
        let data = e.target.result;
        wb = window.XLSX.read(data, {
          type: 'binary'
        });
        let seltext = wb.SheetNames;
        let res = [];
        seltext.map((item, index) => {
          if (!wb.Workbook.Sheets[index].Hidden) {
            res.push(item);
          }
        });
        resolve(res);
      };
      reader.readAsBinaryString(file);
    } catch (e) {
      reject(e);
    }
  });
};
import { seriesLoadScripts } from '@noah/tools/src/utils/util';
import { post } from '@noah/tools/src/intercept/http';
export default {
  props: {
    action: {
      type: String
    },
    uploadFieled: {
      // 后端需要的上传字段
      type: Object,
      default: function () {
        return {};
      }
    }
  },
  data() {
    return {
      id: 'salaryinput' + Math.floor(Math.random() * 10000),
      sheetList: [],
      sheet: '',
      showDialog: false,
      file: null,
      loading: false
    };
  },
  mounted() {
    seriesLoadScripts('/dashboard/resources/xlsx.full.min.js');
  },
  methods: {
    mockClick() {
      document.querySelector(`#${this.id}`).click();
    },
    async handlerChange(e) {
      const file = e.target.files[0];
      if (!file) return;
      this.file = file;
      const data = await getXlsxSheet(file);
      if (data.length > 1) {
        this.sheetList = data;
        this.sheet = data[0];
        this.showDialog = true;
      } else {
        this.chooseSheet();
      }
      document.querySelector(`#${this.id}`).value = null;
    },
    async chooseSheet() {
      this.loading = true;
      try {
        const fd = new FormData();
        fd.append('file', this.file);
        fd.append('sheetName', this.sheet);
        if (this.uploadFieled && this.uploadFieled.name) fd.append(this.uploadFieled.name, this.uploadFieled.value);
        this.$emit('uploadStart');
        const data = await post(this.action, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
        this.showDialog = false;
        this.$emit('uploadEnd', { data });
      } catch (error) {
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>
