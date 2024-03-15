/**
 * 公共数据状态
 */

import { _getFieldGroupList, _getCitys } from '@/services/dashboard/system/common';
import { _getJobCityList } from '@/services/dashboard/recommend';

export default {
    name: 'common',
    namespaced: true,
    state: {
        fieldGroupList: [],
        addressList: []
    },
    mutations: {
        M_getCitys(state, data = []) {
            state.addressList = data;
        },
        M_getFieldGroupList(state, data = []) {
            state.fieldGroupList = data;
        }
    },
    actions: {
        // 获取所有城市信息
        A_getCitys({ dispatch, commit }) {
            return _getCitys().then(res => {
                if( res.success && res.root && res.root.length > 0 ){
                    commit('M_getCitys', res.root);
                    return res;
                }
            });
        },
        // 加载字段组
        A_getFieldGroupList({ dispatch, commit }) {
            return _getFieldGroupList().then(res => {
                if( res.success && res.root && res.root.length > 0 ){
                    commit('M_getFieldGroupList', res.root);
                    return res;
                }
            });
        },
        // 获取工作城市信息
        A__getJobCityList({ dispatch, commit }, payload={}) {
            const { name = '' } = payload;
            return _getJobCityList({name}).then(res => {
                if( res.success && res.root && res.root.length > 0 ){
                    let newArr = res.root.map(v => {
                        return {
                            label: v.name,
                            value: v.name
                        };
                    });
                    return newArr;
                }else{
                    return [];
                }
            });
        },
    }
};