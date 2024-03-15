<template>
<div class="approval-process-container">
    <div v-if="title" class="approval-process-title">
        {{ title }}
    </div>
    <div class="approval-process-content">
        <div v-for="(item, index) in processData" :key="index" class="approval-process-item">
            <div class="approval-process-item-line base-info">
                <div class="process-icon-warp">
                    <svg-icon v-if="item.currentAudit === 2" class="process-icon preview" icon-class="audit-status-preview" />
                    <svg-icon v-else-if="srcMap[item.approveResultCode]" class="process-icon" :class="srcMap[item.approveResultCode]" :icon-class="`audit-status-${srcMap[item.approveResultCode]}`"></svg-icon>
                    <img v-else class="process-icon" :src="srcMapImg[item.approveResultCode]" />
                </div>
                <div class="process-title ellipsis">
                    <template v-if="item.currentAudit === 2">待审批</template>
                    <nari-tooltip v-else :value="item.approveResult" />
                </div>
                <div class="process-time">{{ item.approveTime }}</div>
            </div>
            <div v-if="item.nodeName || item.approveUserVOList" class="approval-process-item-line process-person">
                {{ handleNodeName(item.nodeName) }}·{{ item.approveUserVOList | userInfo }}
                <span v-if="item.remark">{{ item.remark.subTitle }}</span>
            </div>
            <!-- @node wiki上已删除 暂时注释 -->
            <!-- <div v-if="item.auditComment" class="approval-process-item-line primary-info">评估意见：{{ item.auditComment }}</div> -->
            <div v-if="item.auditComment" class="approval-process-item-line process-remark">{{ item.auditComment }}</div>
        </div>
    </div>
</div>
</template>
<script>
// import initiate from '@/assets/images/audit/process-initiate.png';
// import sucess from '@/assets/images/audit/process-success.png';
import refused from '@/assets/images/audit/process-refused.png';
export default {
    props: {
        title: {
            type: String,
            default: ''
        },
        processData: {
            type: Array,
            default: () => []
        }
    },
    filters: {
        userInfo(value) {
            if (!value || !value.length) {
                return '';
            }
            return value.map(item => {
                return item.approveName + `（${item.approveDeptName}）`;
            }).join('');
        }
    },
    data() {
        return {
            srcMapImg: {
                // '200': initiate,        // 发起申请
                // '201': wait,            // 审批中
                // '0': sucess,            // 通过
                '2': refused           // 驳回
                // '3': back,              // 撤销
                // '1': back               // 退回
            },
            srcMap: {
                '6': 'initiate',        // 提交
                '200': 'initiate',        // 发起申请
                '201': 'wait',            // 审批中
                '0': 'success',            // 通过
                // '2': 'refused',           // 驳回
                '3': 'back',              // 撤销
                '1': 'back'               // 退回
            }
        };
    },
    methods: {
        handleNodeName(name) {
            return (name || '').replace(/&nbsp;/g, ' ');
        }
    }
};
</script>
<style lang="less" scoped>
@import '@/styles/variable.less';

.approval-process-container {
    padding: 12px 16px;
    line-height: normal;
    .clear {
        content:'';
        display: block;
        clear: both;
        visibility: hidden;
        height: 0;
    }

    .approval-process-title {
        font-size: 15px;
        padding-bottom: 24px;
        color: #000;
        background: #fff;
    }

    .approval-process-content {
        flex: 1;
        overflow-y: auto;
        padding-left: 26px;
        padding-right: 20px;
        .approval-process-item {
            padding-bottom: 32px;
            position: relative;

            &::before {
                position: absolute;
                content: "";
                display: block;
                width: 1px;
                background-color: #E3E6E8;
                height: 100%;
                top: 0;
                left: -17px;
            }

            &:last-child {
                padding-bottom: 4px;

                &::before {
                    display: none;
                }
            }

            .approval-process-item-line {
                position: relative;
                &::after {
                    .clear;
                }

                &+.approval-process-item-line {
                    margin-top: 12px;
                }

                &.base-info {
                    // max-width: 340px;
                }

                &.primary-info {
                    font-size: 13px;
                    color: #00CFC5;
                    white-space: pre-wrap;
                }

                .process-icon-warp {
                    position: absolute;
                    left: -26px;
                    // top: -4px;
                    z-index: 9;
                    background-color: #fff;
                    height: 20px;
                    width: 20px;
                    color: #fff;
                    .process-icon {
                        width: 18px;
                        position: absolute;
                        left: 0;
                        top: 50%;
                        transform: translateY(-50%);
                        pointer-events: none;
                        &.success {
                            transform: scale(1.05);
                            position: relative;
                            top: 1px;
                        }
                        &.initiate {
                            transform: scale(1.09);
                            position: relative;
                            top: 1px;
                        }
                        &.back {
                            transform: scale(1.06);
                            position: relative;
                            top: 1px;
                        }
                    }
                }

                .process-title {
                    font-size: 14px;
                    color: #151B26;
                    float: left;
                }

                .process-time {
                    color: #80909c;
                    float: right;
                    font-size: 13px;
                }

                &.process-person {
                    color: #151B26;
                    font-size: 14px;
                    margin-top: 8px;
                }

                &.process-remark {
                    color: #646F79;
                    font-size: 13px;
                    white-space: pre-wrap;
                }
            }
        }
    }
}
</style>
