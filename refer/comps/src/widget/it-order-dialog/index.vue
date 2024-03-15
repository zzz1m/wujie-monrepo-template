<template>
  <ui-dialog
      v-model="show" lock
      prevent-cancel
      prevent-close
      prevent-layer
      :show-footer="false" :title="dialogCfg.title || '标题'"
      :width="dialogCfg.width || 400"
      wrap-class="ui-dialog-reset account-dialog common-edit-dialog"
      @on-cancel="close()"
      @on-close="doClose()"
  >
      <template v-if="show && activeKey" slot="content">
          <component :is="activeKey" ref="comp" :device-id="deviceId" :process-instance-id="processInstanceId" @close="close" @success="success" />
      </template>
  </ui-dialog>
  </template>

<script>
import { tableData } from './const';
import PublicEmail from './components/public-email.vue';
import EmailGroup from './components/email-group.vue';
import Vpn from './components/vpn.vue';
import Remote from './components/remote.vue';
import Other from './components/other.vue';
import Maintenance from './components/maintenance.vue';
import VpnSource from './components/vpn-source.vue';
import AssetTransfer from './components/asset-transfer.vue';
export default {
  components: {
    PublicEmail,
    EmailGroup,
    Vpn,
    Remote,
    Other,
    Maintenance,
    VpnSource,
    AssetTransfer
  },
  data() {
    return {
      deviceId: '',
      processInstanceId: '',
      activeKey: '',
      show: false,
      dialogCfg: {}
    };
  },
  methods: {
    open(type, id, deviceId) {
      this.processInstanceId = id;
      this.deviceId = deviceId;
      this.activeKey = type;
      const config = tableData.find(t => t.key ===  type);
      Object.assign(this.dialogCfg, {
        ...(config.dialogCfg || {}),
        title: config.title
      });

      this.show = true;
    },
    doClose() {
      const elm = this.$refs.comp;
      if(elm && elm.onBack) {
        elm.onBack(true);
      } else {
        this.close();
      }
    },
    close() {
      this.show = false;
      this.activeKey = '';
    },
    success() {
      this.close();
      this.$emit('refresh');
    }
  }
};
</script>
