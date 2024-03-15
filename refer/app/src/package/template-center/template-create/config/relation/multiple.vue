<template>
<div>
    <form-item class="col">
        <span class="label">展示数据条目</span>
        <ui-radio-group v-model="multiple">
            <ui-radio label="0">单条</ui-radio>
            <ui-radio label="1">多条</ui-radio>
        </ui-radio-group>
    </form-item>
    <form-item>
        <span class="label">数据过滤</span>
        <span class="text-primary text-btn" @click="setFilter">设置{{ config.dataFilter.length && '(已设置)' || '' }}</span>
    </form-item>
    <form-item class="col">
        <div class="flex-row">
            <span class="label">关联字段</span>
            <span class="text-primary text-btn" @click="setRelationKeys">设置{{ config.fieldsList.length && '(已设置)' || '' }}</span>
        </div>
        <ul v-if="config.fieldsList.length" class="fields-list">
            <li v-for="(item, index) in config.fieldsList" :key="index">
                {{ item.label }}
            </li>
        </ul>
    </form-item>
    <!-- <form-item class="col">
        <span class="label">填写样式</span>
        <ui-radio-group v-model="fillStyle">
            <ui-radio label="1">表格</ui-radio>
            <ui-radio label="2">列表</ui-radio>
        </ui-radio-group>
    </form-item> -->
    <form-item class="col">
        <span class="label">打印格式</span>
        <ui-radio-group v-model="printStyle">
            <ui-radio label="1">横向打印</ui-radio>
            <ui-radio label="2">纵向打印</ui-radio>
        </ui-radio-group>
    </form-item>
    <!-- 高级查询 -->
    <ui-dialog v-model="seniorFilter.show"
        class="reset-dialog modify-record__dialog senior-filter-dialog" 
        title="数据过滤" width="1030" 
        lock prevent-layer prevent-confirm
        @on-confirm="onConfirm"
    >
        <senior-filter v-if="seniorFilter.show" slot="content"
            ref="filter" v-model="seniorFilter.conditions" :field-group-list="fieldGroupList" :scene-id="sceneId"
        ></senior-filter>
    </ui-dialog>
</div>
</template>
<script>
import SeniorFilter from '@/package/system/common/senior-filter';
import { _getInterviewTemplateRelationFieldVOList } from '@/services/dashboard/interview';
export default {
    name: 'RelationMultipleConfig',
    props: {
        config: { type: Object, default: null },
        moduleList: { type: Array, default: () => []}
    },
    data() {
        return {
            fieldGroupList: [],
            seniorFilter: {
                show: false,
                conditions: []
            }
        };
    },
    components: { SeniorFilter },
    computed: {
        targetModule() {
            return this.moduleList.find(i => i.type === this.config.type);
        },
        sceneId() {
            return this.targetModule?.fId;
        },
        multiple: {
            get() { return this.config.multiple? '1': '0'; },
            set(val) {
                this.config.multiple = !!Number(val);
            }
        },
        fillStyle: {
            get() { return `${this.config.fillStyle}`; },
            set(val) {
                this.config.fillStyle = Number(val);
            }
        },
        printStyle: {
            get() { return `${this.config.printStyle}`; },
            set(val) {
                this.config.printStyle = Number(val);
            }
        }
    },
    methods: {
        // 设置关联字段
        setRelationKeys() {
            this.$emit('show-multiple', this.config.id);
        },
        // 数据过滤
        async setFilter() {

            const res = await _getInterviewTemplateRelationFieldVOList({
                classDictCode: 'multi',
                tableName: this.config.type
            });
            if(res.success) {
                this.fieldGroupList = [
                    {
                        id: this.sceneId,
                        name: this.targetModule?.name,
                        fieldVOList: res.root
                    }
                ];
            }

            this.seniorFilter.conditions = JSON.parse(JSON.stringify(this.config.dataFilter));
            this.seniorFilter.show = true;

            if(this.seniorFilter.conditions.length === 0) {
                this.$nextTick(() => {
                    this.$refs.filter.addScope();
                });
            }
            
        },
        onConfirm() {

            const valid = this.$refs.filter.valid();
            if(!valid) {
                this.config.dataFilter = this.seniorFilter.conditions.filter(i => i[0].fieldId);
                this.seniorFilter.show = false;
            }
        }
    }
};
</script>