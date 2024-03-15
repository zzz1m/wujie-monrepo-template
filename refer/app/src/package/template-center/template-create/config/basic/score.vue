<template>
<div>
    <form-item>
        <span class="label">分值范围</span>
        <div>
            <ui-select v-model.number="config.scoreMin" type="number" style="width: 56px" size="small">
                <ui-option v-for="item in minOptions" :key="item.value" :value="item.value">
                    {{ item.label }}
                </ui-option>
            </ui-select>
            <span style="margin: 0 6px; color: #C9CDD4;">-</span>
            <ui-select v-model.number="config.scoreMax" type="number" style="width: 56px" size="small">
                <ui-option v-for="item in maxOptions" :key="item.value" :value="item.value">
                    {{ item.label }}
                </ui-option>
            </ui-select>
        </div>
    </form-item>
    <!-- :maxlength="config.scoreTipsLimit" -->
    <form-item>
        <span class="label">左边提示文字</span>
        <ui-input v-model.trim="scoreTipsLeft" 
            style="width: 83px;" placeholder=""
            size="small"
            type="text" @on-blur="onBlur('scoreTipsLeft')"
        ></ui-input>
    </form-item>
    <form-item>
        <span class="label">中间提示文字</span>
        <ui-input v-model.trim="scoreTipsCenter" 
            style="width: 83px;" placeholder=""
            size="small"
            type="text" @on-blur="onBlur('scoreTipsCenter')"
        ></ui-input>
    </form-item>
    <form-item>
        <span class="label">右边提示文字</span>
        <ui-input v-model.trim="scoreTipsRight" 
            style="width: 83px;" placeholder=""
            size="small"
            type="text" @on-blur="onBlur('scoreTipsRight')"
        ></ui-input>
    </form-item>
</div>
</template>


<script>
export default {
    name: 'ScoreConfig',
    props: {
        config: { type: Object, default: null }
    },
    watch: {
        'config.id': {
            immediate: true,
            handler: function() {
                this.scoreTipsLeft = this.config.scoreTipsLeft;
                this.scoreTipsCenter = this.config.scoreTipsCenter;
                this.scoreTipsRight = this.config.scoreTipsRight;
            }
        }
    },
    data() {
        return {
            scoreTipsLeft: this.config.scoreTipsLeft,
            scoreTipsCenter: this.config.scoreTipsCenter,
            scoreTipsRight: this.config.scoreTipsRight
        };
    },
    computed: {
        minOptions() {
            return new Array(this.config.scoreMax + 1).fill(0)
                .map((_, idx) => ({ value: idx, label: idx}));
        },
        maxOptions() {
            return new Array(11 - this.config.scoreMin).fill(0)
                .map((_, idx) => ({ value: idx + this.config.scoreMin, label: idx  + this.config.scoreMin }));
        }
    },
    methods: {
        onBlur(key) {
            this.config[key] = this[key];
        }
    }

};
</script>