<template>
    <information-regist
v-model="show"
            :process-instance-id="processInstanceId" title="重新发起"
            @on-confirm="sureRegister"
></information-regist>
</template>
<script>
import { EntranceInformationRegist as InformationRegist} from '@noah/components';
export default {
    props: {
        auditData: {
            type: Object,
            default: () => ({})
        },
        'on-confirm': {
            type: Function,
            default: function () {}
        }
    },
    data() {
        return {
            show: false,
            processInstanceId: ''
        };
    },
    components: {
        InformationRegist
    },
    methods: {
        sureRegister(data) {
            this.$emit('on-confirm', data);
        },
        open(data) {
            this.processInstanceId = data.processInstanceId;
            this.show = true;
        }
    }
};
</script>
