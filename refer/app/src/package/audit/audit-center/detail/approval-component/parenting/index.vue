<template>
<div>
    <div class="approval-component__container">
        <h2 class="title">基础信息</h2>
        <ul class="approval-component__list">
            <li :class="[highlightClass(progressInfo, 'userName')]">
                <span>姓名</span>
                <div>
                    <nari-tooltip :show-tip="false" :value="progressInfo.userName" />
                </div>
            </li>
            <li :class="[highlightClass(progressInfo, 'workplaceName')]">
                <span>工作地点</span>
                <div>
                    <nari-tooltip :show-tip="false" :value="progressInfo.workplaceName" />
                </div>
            </li>
            <li :class="[highlightClass(progressInfo, 'joinDate')]">
                <span>入职日期</span>
                <div>
                   {{ progressInfo.joinDate ? $dayjs(progressInfo.joinDate).format('YYYY-MM-DD'): '-' }}
                </div>
            </li>
        </ul>
    </div>
     <div class="approval-component__container">
        <h2 class="title">政策信息</h2>
        <ul class="approval-component__list">
            <li :class="[highlightClass(progressInfo, 'cityName', true)]">
                <span>城市</span>
                <div>
                    <nari-tooltip :show-tip="false" :value="progressInfo.cityName" />
                </div>
            </li>
            <li class="row-40" :class="[highlightClass(progressInfo, 'atdPolicyConfigVO', true)]">
                <span>发放标准</span>
                <div>
                    <nari-tooltip :show-tip="false" :value="progressInfo.atdPolicyConfigVO? `${progressInfo.atdPolicyConfigVO.yearAge}周岁以下婴幼儿父母，每周岁发放${progressInfo.atdPolicyConfigVO.releaseDays}天育儿假`: '-'" />
                </div>
            </li>
        </ul>
     </div>
     <div class="approval-component__container">
        <h2 class="title">申请信息（子女出生信息）</h2>
        <ul class="approval-component__list">
            <li :class="[highlightClass(progressInfo, 'childBirthday', true)]">
                <span>出生日期</span>
                <div>
                   {{ progressInfo.childBirthday ? $dayjs(progressInfo.childBirthday).format('YYYY-MM-DD'): '-' }}
                </div>
            </li>
            <li class="row-60" :class="[highlightClass(progressInfo, 'certifyAttach', true)]">
                <span>出生证明</span>
                <div>
                    <ul v-if="progressInfo.certifyAttach" v-viewer="{ title: false, navbar: false, tooltip: false, }" class="attachment-list">
                        <li style="width: 40%">
                            <img class="preview-image" :src="progressInfo.certifyAttach" />
                        </li>
                    </ul>
                    <div v-else>-</div>
                </div>
            </li>
        </ul>
     </div>
     <div v-if="progressInfo.expectResultDTOList && progressInfo.expectResultDTOList.length" class="approval-component__container approval-no-border">
         <h2 class="title">预计发放情况</h2>
         <ExpectList :list="progressInfo.expectResultDTOList" style="padding: 10px 0;max-width: 460px" />
     </div>
</div>
</template>

<script>
import commonMixin from '../mixins';
import ExpectList from './expect-list.vue';
export default {
    name: 'ParentingIndex',
    mixins: [commonMixin],
    components: {
        ExpectList
    },
    data() {
        return {
            progressInfo: {}
        };
    },
    computed: {
        processId() {
            return this.$route.query.processId;
        }
    },
    created() {
        this.getProgressInfo();
    },
    methods: {
        // 获取访谈详情
        async getProgressInfo() {
            const { success, root } = await this.getDetailApi({
                processInstanceId: this.processId
            });
            if(!success || !root) return;
            this.progressInfo = root.detail || {};
            this.highlightFieldList = this.progressInfo.highlightFieldList || [];
        }
    }
};
</script>
