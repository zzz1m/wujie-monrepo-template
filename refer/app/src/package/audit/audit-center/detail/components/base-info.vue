<template>
<div class="approval-component__container">
    <h2 class="title">基本信息</h2>
    <ul class="approval-component__list">
        <li :class="[highlightClass(data.name, 'userInfoVO.name', true)]">
            <span>姓名</span>
            <div>
                <talentIcon v-if="showTalent && data.encryptId" :id="data.encryptId" :name="data.name || '-'" :blank="true" />
                <template v-else>
                    {{ data.name || '-' }}
                </template>
            </div>
        </li>
        <li :class="[highlightClass(data.number, 'userInfoVO.number', true)]">
            <span>员工编号</span>
            <div>{{ data.number || '-' }}</div>
        </li>
        <li :class="[highlightClass(data.userNatureName, 'userInfoVO.userNatureName', true)]">
            <span>员工性质</span>
            <div>{{ data.userNatureName || '-' }}</div>
        </li>
        <template v-if="hasAgeBirth">
            <li :class="[highlightClass(data.birthDay, 'userInfoVO.birthday', true)]">
                <span>出生日期</span>
                <div>{{ data.birthday || '-' }}</div>
            </li>
            <li :class="[highlightClass(data.age, 'userInfoVO.age', true)]">
                <span>年龄</span>
                <div>{{ data.age || '-' }}</div>
            </li>
        </template>
        <li :class="[highlightClass(data.joinDate, 'userInfoVO.joinDate', true)]">
            <span>入职日期</span>
            <div>{{ data.joinDate ? $dayjs(data.joinDate).format('YYYY-MM-DD') : '-' }}</div>
        </li>
        <li :class="[highlightClass(data.deptName, 'userInfoVO.deptName', true)]">
            <span>部门</span>
            <div>{{ data.deptName || '-' }}</div>
        </li>
        <li :class="[highlightClass(data.positionName, 'userInfoVO.positionName', true)]">
            <span>岗位</span>
            <div>{{ data.positionName || '-' }}</div>
        </li>
        <li :class="[highlightClass(data.reporterName, 'userInfoVO.reporterName', true)]">
            <span>汇报人</span>
            <div>{{ data.reporterName || '-' }}</div>
        </li>
        <li :class="[highlightClass(data.workplace, 'userInfoVO.workplace', true)]">
            <span>工作地点</span>
            <div>{{ data.workplace || '-' }}</div>
        </li>
    </ul>
</div>
</template>
<script>
import commonMixin from '../approval-component/mixins';
import talentIcon from '@/components/talent-entry-icon/index.vue';

export default {
    name: 'BaseInfo',
    mixins: [commonMixin],
    components: {
        talentIcon
    },
    props: {
        data: {
            type: Object,
            default: function() {
                return {};
            }
        },
        showTalent: { 
            type: Boolean,
            default: false
        },
        // 合同续签审批新加
        hasAgeBirth: {
            type: Boolean,
            default: false
        }
    }
};
</script>