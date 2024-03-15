/*
 * @Author: makai makai@kanzhun.com
 * @Date: 2022-10-14 10:31:49
 * @LastEditors: makai makai@kanzhun.com
 * @LastEditTime: 2022-10-26 10:02:28
 * @FilePath: /twl-oa-vue/dashboard/src/services/dashboard/talent-map/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { get, post } from '@/services/http';

// 人才图谱-列表
export const _talentList = (params = {}) => {
    return post('/api/talentatlas/list.json', params);
};
// 标签下拉选项
export const _tagList = (params = {}) => {
    return get('/api/talentatlas/tags.json', params);
};
// 人才图谱-详情
export const _talentDetail = (params = {}) => {
    return get('/api/talentatlas/detail.json', params, { quiet: true });
};
// 人才图谱-详情
export const _growPoint = (params = {}) => {
    return get('/api/talentatlas/growth_track/point/detail.json', params);
};
// 人才图谱-个人考勤左侧
export const _attendanceLeft = (params = {}) => {
    return get('/api/talentatlas/attendance/info/left.json', params);
};
// 人才图谱-个人考勤右侧
export const _attendanceRight = (params = {}) => {
    return get('/api/talentatlas/attendance/info/right.json', params);
};
// 人才图谱-列表左侧部门树
export const _getDeptTreeByUser = (params = {}) => {
    return get('/api/talentatlas/getDeptTreeByUser.json', params);
};
// 是否有权限看人员详情
export const _canSeeUser = (params = {}) => {
    return get('/api/talentatlas/canSeeUser.json', params);
};
export const _talentDetailHead = (params = {}) => {
    return get('/api/talentatlas/header.json', params, { quiet: true });
};


