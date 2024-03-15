// 组织架构

import { _getDeptEnumInfo, _workplaceList } from '@/services/dashboard/organization/common';
import { _deptTreeInfo } from '@/services/dashboard/organization/dep';
import { _getDictList } from '@/services/dashboard/system/dictionary';

export default {
    name: 'org',
    namespaced: true,
    state: {
        orgEnumData: null, // 组织架构枚举
        orgUserList: [], // 所有员工
        orgDepList: [], // 所以部门
    },
    mutations: {
        M__getOrgEnumData(state, data = {}) {
            state.orgEnumData = data;
        },
        M__getAllUser(state, data = []) {
            state.orgUserList = data;
        },
        M__getDepTree(state, data = []) {
            state.orgDepList = data;
        },
    },
    actions: {
        // 获取枚举
        A__getOrgEnumData({ dispatch, commit }) {
            let enumData = {};
            let typeList = ['dept_level', 'dept_label', 'workplace'];
            let promiseList = [];
            typeList.forEach(typeName => {
                promiseList.push(
                    _getDictList(typeName).then(res => {
                        if (res.success && res.root) {
                            enumData[typeName] = res.root || [];
                        }
                    })
                );
            });
            Promise.all(promiseList).then(() => {
                // console.log('----promiseList----', enumData);
                commit('M__getOrgEnumData', enumData);
            });
        },
        // 获取所有部门（适用于选择部门的组件）
        A__getDepTree({ dispatch, commit }) {
            return _deptTreeInfo().then(res => {
                if (!res.success) return;
                const formatTree = (arr) => {
                    let _arr = arr.map(item => {
                        return {
                            parentCategoryCode: item.parentId,
                            categoryCode: item.id,
                            categoryName: item.name,
                            deptType: item.deptType,
                            haveChildren: item.children && item.children.length ? 1 : 0,
                            children: item.children && item.children.length ? formatTree(item.children) : item.children
                        };
                    });
                    return _arr;
                };
                let list = formatTree(res.root || []);
                commit('M__getDepTree', list);
                return list;
            });
        }
    }
};