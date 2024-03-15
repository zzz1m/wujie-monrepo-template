import {
    get,
    post
} from '@/services/http';
import { encrypt } from '@/utils/crypto';

// 开具证明申请列表 -V4.9.2
export const _getMyCertifyApplyList = (params = {}) => {
    return get('/api/user-platform/certifyApply/getMyCertifyApplyList.json', params);
};
// 开具证明申请详情 -V4.9.2
export const _getCertifyApplyDetail = (params = {}) => {
    return get('/api/user-platform/certifyApply/getCertifyApplyDetail.json', params);
};
// 开具证明申请 -V4.9.2
export const _submitCertifyApply = (params = {}) => {
    return post('/api/user-platform/certifyApply/submitCertifyApply.json', params);
};
// 开具证明申请预览 -V4.9.2
export const _previewProgress = (params = {}) => {
    return post('/api/user-platform/certifyApply/previewProgress.json', params);
};
// 证明开具-列表查询-v4.9.2
export const _pageList = (params = {}) => {
    return post('/api/salary/certifyIssue/pageList.json', params);
};
// 证明开具-根据ID查看详情-v4.9.2
export const _getCertifyDetail = (params = {}) => {
    return get('/api/salary/certifyIssue/getCertifyDetail.json', params);
};

// 证明开具-查询时间段内薪酬信息-v4.9.2
export const _getCertifySalaryInfo = (params = {}) => {
    return get('/api/salary/certifyIssue/getCertifySalaryInfo.json', params);
};

// 证明开具 -v4.9.2
export const _issueCertificate = (params = {}) => {
    return post('/api/salary/certifyIssue/issueCertificate.json', encrypt(params));
}; 

// 证明开具-通知-v4.9.2
export const _noticeApplyUser = (params = {}) => {
    return post('/api/salary/certifyIssue/noticeApplyUser.json', params);
};

// 根据key获取证明开具的配置信息 -v4.9.2
export const _getSalaryConfigInfo = (params = {}) => {
    return get('/api/user-platform/certifyApply/getSalaryConfigInfo.json', params);
};