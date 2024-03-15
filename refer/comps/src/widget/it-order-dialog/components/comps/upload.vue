<template>
<div class="upload-form-item">
    <ui-upload
        ref="upload"
        action="/api/common/it/upload.json"
        :cropper="false"
        custom exname=".pdf,.jpg,.jepg,.png,.jpeg,.doc,.docx,.xls,.xlsx" multiple
        @uploadEnd="uploadEnd"
        @uploadStart="uploadStart"
    >
        <button class="btn btn-primary btn-outline" type="button" @click="mockClick"><svg-icon class="icon" icon-class="icon-upload-new" />上传附件</button>
    </ui-upload>
    <p class="form-tip">格式支持PDF、JPG、PNG、JPEG、DOC、DOCX、XLS、XLSX格式，单个文件限制20M以内</p>
    <ul class="attachment-list">
        <li v-for="(attachment, index) in fileKeys" :key="attachment" class="attachment-list-content">
            <div class="attachment-name">
                <svg-icon :icon-class="getIconName(attachment)"></svg-icon>
                <div class="attachment-title">
                    <nari-tooltip :value="getAttaName(attachment)" />
                </div>
            </div>
            <div v-if="!(attachment.split('||')[1].startsWith(namePlace))" class="attachment-operation">
                <router-link class="text-primary check-resume" target="_blank" :to="`/api/common/onlinePreview?key=${attachment.split('||')[1]}`">
                    <div class="icon-wrapper">
                        <svg-icon icon-class="file-view-new"></svg-icon>
                    </div>
                </router-link>
                <div class="icon-wrapper" style="margin-left: 10px;" @click="download(attachment)">
                    <svg-icon icon-class="file-download-new"></svg-icon>
                </div>
                <div class="icon-wrapper it-delete" @click="removeImage(index)">
                    <svg-icon class="resume-evaluate-icon recruit-delete" icon-class="file-delete-new"></svg-icon>
                </div>
            </div>
            <template v-if="loadPercent[attachment]">
                <div class="show-percent">{{ loadPercent[attachment].percent  }}%</div>
                <div class="load-percent">
                    <div class="load-percent-bar" :style="`transform: translateX(-${100 - loadPercent[attachment].percent}%)`"></div>
                </div>
            </template>
        </li>
    </ul>
</div>
</template>

<script>
import { getIconName } from './utils.js';

export default {
  data() {
    return {
      namePlace: '@@@',
      loadPercent: {}
    };
  },
  computed: {
    fileKeys: {
      get() {
        return this.$attrs.value;
      },
      set(val) {
        this.$emit('input', val);
      }
    }
  },
  created() {
    this.getIconName = getIconName;
  },
  methods: {
    download(attachment) {
      window.open(`/api/common/file/download${attachment.split('||')[1]}`);
    },
    getAttaName(attachment) {
      if (!attachment) { return '';}
      return attachment.split('||')[0];
    },
    uploadStart(e) {
      const list = '.pdf,.jpg,.jepg,.png,.jpeg,.doc,.docx,.xls,.xlsx'.split(',');
      if(!list.some(t => e.name.endsWith(t))) return;
      const tempName = `${e.name}||${this.namePlace}${new Date().getTime() + Math.round(Math.random() * 30)}.${e.name.split('.').pop()}`;
      this.fileKeys.push(tempName);

      const interval = setInterval(() => {
        const e = this.loadPercent[tempName];
        if(e) {
          if(e.percent < 80) {
            this.$set(this.loadPercent[tempName], 'percent', e.percent + Math.round(Math.random() * 10));
            // this.loadPercent[tempName].percent = e.percent + Math.round(Math.random() * 10);
          } else {
            clearInterval(interval);
          }
        }
      }, 50);
      this.$set(this.loadPercent, tempName,{
        percent: 0,
        interval
      });
    },
    uploadEnd({ data }) {
      const res = data;
      if (res.success) {
        const name = res.root.relativePath.split('||')[0];
        const target = this.fileKeys.findIndex(t => {
          const t1 = t.split('||')[0];
          const t2 = t.split('||')[1];
          return t1 === name && t2.startsWith(this.namePlace);
        });
        clearInterval(this.loadPercent[this.fileKeys[target]].interval);
        delete this.loadPercent[this.fileKeys[target]];
        this.$set(this.fileKeys, target, res.root.relativePath);
        this.$toast({ content: '上传成功', type: 'success' });
      } else {
        this.$toast({ content: res.message || '上传失败', type: 'error' });
      }
    },
    removeImage(index) {
      const that = this;
      this.$dialog({
        title: '提示',
        content: '确定删除？',
        type: 'warning',
        preventConfirm: true,
        onConfirm() {
          this.hide();
          that.fileKeys.splice(index, 1);
        }
      });
    },
    mockClick() {
      this.$refs.upload.mockClick();
    }
  }
};
</script>
