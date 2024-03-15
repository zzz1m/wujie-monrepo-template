<template>
    <div class="name-wrap">
        <router-link
            v-if="canSee" 
            :to="`/dashboard/attendance/calendarrank?id=${id}`"
            target="_blank"
        >
            <div class="name link ellipse">{{ name || '-' }}</div>
        </router-link>
        <div v-else class="name ellipse">{{ name || '-' }}</div>
    </div>
</template>

<script>
import { _getTeamUserAuth } from '@/services/dashboard/attendance';
export default {
    props: {
        id: {type: String, default: ''},
        blanck: {type: Boolean, default: false},
        name: { type: String, default: ''},
        noTip: { type: Boolean, default: false}
    },
    data() {
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
            console.log('xxx');
            try {
                const { success, root } = await _getTeamUserAuth({
                    userId: this.id
                });
                if(success) {
                    this.canSee = !!root.hasPersonAuth;
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
};
</script>


<style lang="less" scoped>
.name-wrap {
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