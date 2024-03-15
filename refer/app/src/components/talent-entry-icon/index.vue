<template>
<div class="talent-name-wrap">
    <router-link
        v-if="canSee" 
        target="_blank"
        :to="{
            path: '/dashboard/talent-map/detail',
            query: {
                userId: id,
                target: $route.fullPath
            }
        }"
    >
        <div class="name link ellipse">{{ name || '-' }}</div>
    </router-link>
    <div v-else class="name ellipse">{{ name || '-' }}</div>
</div>
</template>

<script>
import { _canSeeUser } from '@/services/dashboard/talent-map';

export default {
    props: {
        id: {type: String, default: ''},
        blanck: {type: Boolean, default: false},
        name: { type: String, default: ''},
        noTip: { type: Boolean, default: false}
    },
    data () {
        return {
            canSee: false
        };
    },
    watch: {
        id: {
            immediate: true,
            handler() {
                if(this.id) {
                    this.checkCanSee();
                }
            }
        }
    },
    methods: {
        async checkCanSee() {
            try {
                const { success, root } = await _canSeeUser({
                    userId: this.id
                });
                if(success) {
                    this.canSee = root;
                    // console.log(this.canSee);
                }
            } catch (error) {
                // console.log(error);
            }
        }
    }
};
</script>

<style lang="less" scoped>
.talent-name-wrap {
    max-width: 100%;
    .name {
        &.link {
            color: #00B8BF;
            &:hover {
                color: #02d2d9;
            }
        }
    }
}
</style>