/**
 * 主要是处理组件控件的需要显示问题
 * - 有几个问题需要考虑下
 * 1、当前控件是连续序号
 * 2、当前控件是从1开始
 * 3、copyId 怎么处理？
 * 4、所有的都有1个前提：显示序号的开关是开着呢
 */

import { STRATEGY_SERIAL_RESTART, ROLE_LAYOUT } from '../model/const.js';
import Vue from 'vue';

/**
 * 
 * @param { 视图模型 } viewList 
 * @param { 配置模型 } configList 
 * @param { 是否需要递归显示父级控件序号 } deep 
 * @returns null;
 * 注意：
 * 1、非基础控件没有序号，如套件，关联控件
 */
const createSort = function( viewList = [], configList = {}, deep = false, parentIdx = ''){
    const sortArr = []; // 二维数组 用于计算不同区间的sort 排序
    let startIdx = 0;
    // 过滤出来 可见的
    const visibleViewlist = viewList.filter( ({ id }) => {
        // 评估意见的配置缺失
        return configList[ id ] && configList[ id ].hidden === false;
    });

    const totalLength = visibleViewlist.length;
    if( totalLength === 0 ) return;

    /**
     * 先过滤下有没有以下几种情况的
     * 1、序号配置成从1开始
     * 2、配置成不显示序号的
     * 3、当前控件非基础控件，如套件，关联控件
     */
    const hasBreakSort = visibleViewlist.some( ({ id }) => {
        const { serialStrategy, showSerial } = configList[ id ];
        return !showSerial || serialStrategy === STRATEGY_SERIAL_RESTART;
    });
    if( !hasBreakSort ){ // 所有的选项默认都是连续的
        setSort( visibleViewlist );
        return;
    }

    // 设置断点：从1开始 或者 当前控件不支持显示序号
    visibleViewlist.forEach( ({ id, children }, idx) => {
        const { serialStrategy, showSerial, role } = configList[ id ];
        if( !showSerial || serialStrategy === STRATEGY_SERIAL_RESTART ){ 
            const result = visibleViewlist.slice( startIdx, idx);
            if( result.length > 0 ) {
                sortArr.push( result );
            };
            // 如果最后1项的排序策略是从1开始
            if( idx === totalLength - 1 && serialStrategy === STRATEGY_SERIAL_RESTART ){
                sortArr.push( visibleViewlist.slice(idx) );
            }
            startIdx = showSerial ? idx : idx + 1;

            // 如果当前是分栏 或者非基础控件，但是处于不显示序号 
            if( !showSerial && children && children.length > 0 && ( role === ROLE_LAYOUT || !role.startsWith('basic-') ) ){
                createSort( children, configList, deep );
            }

        } else if( idx === totalLength -1 ){ // 如果所有的断点已经找到
            const result = visibleViewlist.slice( startIdx);
            if( result.length > 0 ) {
                sortArr.push( result );
            };
        }
    });
    if( sortArr.length === 0 ) return;
    // 开始处理排序
    sortArr.forEach( setSort );

    function setSort( arr = [] ){
        if( arr.length === 0 ) return;
        arr.forEach((item, idx) => {
            let serialNo = deep && parentIdx ? `${parentIdx}.${idx + 1}` : idx + 1;
            Vue.set(item, 'serialNo', serialNo);
            if( item.children && item.children.length > 0 ){
                createSort( item.children, configList, deep, item.serialNo );
            }
        });
    }

};


export default createSort;