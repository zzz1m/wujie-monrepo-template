<template>
    <div class="distance-table fix-table-warp" v-if="tableList.length">
        <ui-table-pro :height="100" ref="dataTable" :data="tableList" tooltip-effect="dark" tooltip-max-width="200px">
            <ui-table-column label="出发地" show-overflow-tooltip>
                <template slot-scope="{row:item}">
                    {{ item.fromCityCode}}
                </template>
            </ui-table-column>
            <ui-table-column label="目的地" show-overflow-tooltip>
                <template slot-scope="{row:item}">
                    {{ item.toCityCode}}
                </template>
            </ui-table-column>
            <ui-table-column label="开始日期" show-overflow-tooltip>
                <template slot-scope="{row:item}">
                    {{ item.startDate}}
                </template>
            </ui-table-column>
            <ui-table-column label="离开日期" show-overflow-tooltip>
                <template slot-scope="{row:item}">
                    {{ item.endDate}}
                </template>
            </ui-table-column>
            <ui-table-column label="事由" show-overflow-tooltip>
                <template slot-scope="{row:item}">
                    {{ item.remark}}
                </template>
            </ui-table-column>
        </ui-table-pro>
    </div>
</template>
<script>
import { _searchYoldanda } from '@/services/dashboard/attendance';
export default {
    props: {
        distanceList: {
            type: Array,
            default: ()=> []
        }
    },
    components: {
    },
    created() {
        console.log(this.distanceList, 'distanceList');
        this.fixData();
    },
    mounted() {
    },
    data() {
        return {
           tableList: [],
           cityObj: {},
           cityList: []
        };
    },
    computed:{
    },
    methods: {
       cityName(code) {
           return this.cityList.filter(item => {
               return item.code === code;
           })[0].areaName
       },
       fixTime(t) {
           console.log(t)
           let time = new Date(t).getTime();
           let year = new Date(time).getFullYear();
           let month = new Date(time).getMonth() + 1 
           month = month < 10 ? '0' + month : month;
           let day = new Date(time).getDate() < 10 ? '0' + new Date(time).getDate() : new Date(time).getDate();
           return year + '-' + month + '-' + day;
        },
        async fixData() {
            console.log(this.distanceList, '123123123123123')
            this.distanceList.forEach(item =>{
                this.cityList.push(item.fromCityCode);
                this.cityList.push(item.toCityCode)
            })
            const res = await _searchYoldanda(this.cityList)
            if (res.success && res.root && res.root.length) {
                res.root.forEach(item => {
                    this.cityObj[item.code] = item.areaName;
                })
            }
            this.tableList = this.distanceList.map(item => {
                let titem = JSON.parse(JSON.stringify(item));
                titem.fromCityCode = this.cityObj[item.fromCityCode];
                titem.toCityCode = this.cityObj[item.toCityCode];
                return titem
            })
        }
    }
};
</script>

<style lang="less" scoped>
    .distance-table {
        width: 100%;
        .distance-action {
            color: #00CFC5;
            user-select: none;
            span {
                &:first-child, &:last-child {
                    cursor: pointer;
                }
            }
        }
    }
    ::v-deep .ui-table-body-wrapper {
        height: auto!important;
    }
</style>
