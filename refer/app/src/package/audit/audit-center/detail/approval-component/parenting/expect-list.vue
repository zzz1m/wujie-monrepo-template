<template>
    <div class="expect-list-wrap">
        <div v-for="(item,key) in list" :key="key" class="list-item">
            <div class="title">{{ item.age }}周岁</div>
            <svg-icon icon-class="child-face-deco"></svg-icon>
            <div class="item-info-wrap">
                <div class="info-item">
                    <div class="label">发放天数</div>
                    <div class="val">{{ item.days }}</div>
                </div>
                <div class="info-item">
                    <div class="label">生效日期</div>
                    <div class="val">{{ item.effectDate && $dayjs(item.effectDate).format('YYYY-MM-DD') || '-' }}</div>
                </div>
                <div class="info-item">
                    <div class="label">失效日期</div>
                    <div class="val">{{ item.expireDate && $dayjs(item.expireDate).format('YYYY-MM-DD') || '-' }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        list: {
            type: Array,
            default: () => []
        }
    }
};
</script>
<style lang="less" scoped>
.expect-list-wrap {
        .list-item {
            width: 100%;
            flex-shrink: 0;
            position: relative;
            border-radius: 8px;
            padding: 4px;
            background: rgba(0, 190, 189, 0.15);
            .svg-icon {
                position: absolute;
                top: 0;
                right: 4px;
                width: 45px;
                height: 45px;
            }
            & + .list-item {
                margin-top: 12px;
            }
            .title {
                color: #1D2129;
                font-size: 14px;
                font-style: normal;
                font-weight: 500;
                line-height: 20px;
                padding: 4px 14px 8px;
            }
            .item-info-wrap {
                width: 100%;
                height: 72px;
                flex-shrink: 0;
                border-radius: 6px;
                background: #FFF;
                display: flex;
                justify-content: space-between;
                padding: 14px;
                .info-item {
                    display: flex;
                    flex-direction: column;
                    .label {
                        color: #4E5969;
                        font-size: 13px;
                        font-style: normal;
                        font-weight: 400;
                        line-height: 22px; /* 169.231% */
                    }
                    .val {
                        color: #1D2129;
                        font-size: 13px;
                        font-style: normal;
                        font-weight: 400;
                        line-height: 22px; /* 169.231% */
                    }
                }
            }
        }
    }
</style>