<template>
<div class="class-dashboard">
    <div class="class-item" @click="handleClassClick('A')">
        <div class="class-item-class">A</div>
        <div class="class-item-text">{{ total.classA || 0 }}人/{{ total.classARate || 0 }}%</div>
    </div>
    <div class="class-item" @click="handleClassClick('A-')">
        <div class="class-item-class">A-</div>
        <div class="class-item-text">{{ total.classAr || 0 }}人/{{ total.classArRate || 0 }}%</div>
    </div>
    <div class="class-item" @click="handleClassClick('B+')">
        <div class="class-item-class" style="color:#1C87FF">B+</div>
        <div class="class-item-text">{{ total.classBp || 0 }}人/{{ total.classBpRate || 0 }}%</div>
    </div>
    <div class="class-item" @click="handleClassClick('B')">
        <div class="class-item-class" style="color:#1C87FF">B</div>
        <div class="class-item-text">{{ total.classB || 0 }}人/{{ total.classBRate || 0 }}%</div>
    </div>
    <div class="class-item" @click="handleClassClick('C+')">
        <div class="class-item-class" style="color:#FE7086">C+</div>
        <div class="class-item-text">{{ total.classCp || 0 }}人/{{ total.classCpRate || 0 }}%</div>
    </div>
    <div class="class-item" @click="handleClassClick('C')">
        <div class="class-item-class" style="color:#FE7086">C</div>
        <div class="class-item-text">{{ total.classC || 0 }}人/{{ total.classCRate || 0 }}%</div>
    </div>
</div>
</template>

<script type="text/javascript">
export default {
    props: ['total'],
    data() {
        return {};
    },
    methods: {
        handleClassClick(classStr) {
            this.$emit('onClassChange', classStr)
        }
    }
};
</script>

<style lang="less" scoped>
.class-dashboard {
    display: flex;
    .class-item {
        flex: 1;
        height: 84px;
        text-align: center;
        cursor: pointer;
        &:hover {
            opacity: 0.8;
        }
        .class-item-class {
            font-size: 28px;
            font-weight: 500;
            color: #00BEBD;
            line-height: 40px;
            margin-top: 10px;
        }
        .class-item-text {
            font-size: 18px;
            font-family: kanzhun;
            color: #4E5969;
            line-height: 22px;
            margin-top: 2px;
        }
    }
}
</style>
