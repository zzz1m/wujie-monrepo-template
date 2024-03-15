import { getApiMethod } from './tools.js';
import { encrypt } from '../../utils/crypto';
import { get, post, postForm } from '../../intercept/http.js';
/**
 * 支持三种请求方式 get, post, postForm
 * 使用方式 可直接配置api字符串 也可以 使用 对象的形式配置 修改请求头等配置
 * api: 支持字符串和方法形式
 * 使用 API.COMMON._deptTreeInfo(params)
 *
 * post: {
 *			_deptTreeInfo: '/api/sys_dept/deptTreeInfo.json',
 *          _deptTreeInfo1: function (params, ...res) {
 *				return '/api/sys_dept/deptTreeInfo.json';
 *			},
 *			_deptTreeInfo2: {
 *			 	api: '/api/sys_dept/deptTreeInfo.json',
 *			 	apiConfig: {}
 *			},
 *           _deptTreeInfo2: {
 *			 	api: function (params, ...res) {
 *                  return '/api/sys_dept/deptTreeInfo.json';
 *              },
 *			 	apiConfig: {}
 *			}
 *		},
 *
 *
 */
const API = {
  COMMON: {
    post: {
      // _deptTreeInfo1: function (params, ...res) {
      // 	return '/api/sys_dept/deptTreeInfo.json';
      // },
      // _deptTreeInfo2: {
      // 	api: '/api/sys_dept/deptTreeInfo.json',
      // 	apiConfig: {}
      // },
      // 获取部门列表 id为加密的
      _getAllDeptTree: '/api/sys_dept/deptTreeInfo.json',
      // 根据用户权限获取部门树
      _getDeptTreeByUser: '/api/sys/role/getDeptTreeByUser.json',
      //  批量获取字典列表
      _batchGetDictInfo: '/api/common/dict/batchGetDictInfo.json',
      // 根据部门获取产品线
      _findProductLineByDept: '/api/sys_dept/findProductLineByDept.json',
      // 导航排序
      _toolNavSort: '/api/homepage/v2/menu/sort.json',
      // 更新菜单new状态
      _updateNew: '/api/homepage/v2/menu/updateNew.json',
      //  根据名称精确查找部门
      _findDeptByName: '/api/dept/findDeptByName.json',
      _getFieldList: '/api/sys/role/getFieldByGroup.json'
    },
    get: {
      // 获取菜单
      _getMenuList: '/api/menu/my.json',
      // 退出登录
      _getLogout: '/api/user/logout.json',
      // 获取用户信息
      _getUserInfo: '/api/user/info.json',
      // 获取 部门列表
      _getDeptList: '/api/dept/deptTree.json',
      // 获取 部门列表
      _getDepartmentList: '/api/dept/allDeptTree.json',
      // 获取产品线部门列表
      _getLineDeptList: '/api/dept/getProductLines.json',
      // 获取 部门列表
      _getPartDepartmentList: '/api/dept/deptLeaderTree.json',
      // 获取团队考勤页面列表------
      _getRegionalDepartmentList: '/api/dept/ruleDeptTree.json',
      // 获取 绩效部门列表
      _getDeptLeaderKpiTree: '/api/dept/deptLeaderKpiTree.json',
      // 公共查询人员接口
      _searchInfo: '/api/reservation/user/searchInfo.json',
      // 指定条件获取数据字典列表数据
      dictList: function (dictType, params) {
        return get(`/api/job/dict/get/${dictType}/list.json`, params);
      },
      // 内推字典列表数据
      _dictList: function (dictType, params) {
        return get(`/api/job/dict/get/${dictType}/list.json`, params);
      },
      // 获取字典list
      _getDictTypes: function (params = {}) {
        const { dictType, ...param } = params;
        return get(`/api/common/dict/get/${dictType}/list.json`, param);
      },
      // 获取字典枚举值列表 （特殊）
      _getSpecialDictTypes: function (params = {}) {
        const { url, ...param } = params;
        return get(url, param);
      },
      // 批量获取某一类型下的字典列表
      _getDictListByType: {
        api: '/api/common/dict/getDictListByType.json',
        apiConfig: { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
      },
      /**
       * @description 根据关键词搜索获取用户指定字段列表
       * @param {Object} params
       * @param {String} params.keyWord 输入关键字
       * @param {String} params.fieldList 展示字段，为空只返回 id、name、email
       */
      _fuzzySearch: '/api/user/fuzzySearch.json',
      // 根据关键字搜索
      _dictSearchByKeyword: '/api/common/dict/search.json',
      // 获取模块更新提醒
      _getModulePoster: '/api/module/poster/getModulePoster.json',
      // 模块更新关闭
      _viewModulePoster: '/api/module/poster/viewModulePoster.json',
      // 获取用户资源
      _getResouces: '/api/menu/resouces.json',
      // 获取菜单导航
      _getNavlist: '/api/homepage/v2/menu/my.json',
      // 获取在线预览URL
      _generatePreviewUrl: '/api/common/generatePreviewUrl',
      //【工作地点】获取前两层
      _getShowWorkplaceList: '/api/seat/place/getShowWorkplaceList.json',
      //根据模块获取状态列表 - 4.6.0  // module
      _getSysModuleStatusMap: '/api/common/module/getSysModuleStatusMap.json',
      //根据模块和业务类型获取状态列表 - 4.6.0  // module  businessType
      _getSysModuleStatusVO: '/api/common/module/getSysModuleStatusVO.json',
      // 待审批数量
      _getAuditCount: '/api/process/center/count.json',
      // 获取城市列表 -4.9.9
      _getCityList: '/api/common/dict/getCityList.json',
      // 通用 全局通用人员搜索
      _commonUserSearch: '/api/common/userSearch.json'
    },
    postForm: {}
  },
  ATTENDANCE: {
    get: {
      getDeptInfo: '/api/apply/user/dept/info.json',
      getApply: '/api/apply/user/apply.json',
      _getLeaveType: '/api/apply/list/leaveType.json'
    },
    post: {
      editKq: '/api/apply/user/submit/apply.json',
      getTotalTime: '/api/apply/user/calculate/apply.json',
      _searchYoldanda: '/api/apply/youlanda/areaCodeV2.json',
      _getYoldandaArea: '/api/apply/youlanda/areaV2.json',
      _getSpecialShiftList: '/api/attendance/v2/shift/getSpecialShiftList.json',
      _specRequire: '/api/attendanceSpecialUser/submit.json',
      _personalCalendar: (params = {}) => {
        return post('/api/attendance/board/personal/calendar.json', {}, { params });
      }
    }
  },
  AUDIT: {
    get: {
      // 成长中心 - 课程审批流程预览
      _previewProgressOffer: '/api/offer/user/approveStatus/previewProgress.json',
      _getDetailByProcessInstanceId: '/api/process/center/getDetailByProcessInstanceId.json'
    },
    post: {
      // 员工提交休假,公出 申请预览
      _previewProgress: (params = {}) => {
        return post('/api/apply/user/submit/previewProgress.json', params, { quiet: true });
      },
      // 【特殊考勤】预览审批流
      _attendanceSpecialUserPreviewProgress: '/api/attendanceSpecialUser/previewProgress.json',
      // // 审批中心	-【人员实习信息】审批预览）Noah默认角色
      // _previewProgressInternship: '/api/user/internship/approval/previewProgress.json',
      // // (线下培训管理 - 培训审批预览) 培训超级管理员 培训管理员 讲师
      // _previewProgressTrain: '/api/learning/train/previewProgress.json',
      // // 访谈工单流程预览
      // _previewProgressInterview: {
      //   api: '/api/interview/user/previewProgress.json',
      //   apiConfig: { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
      // },
      // // 合同管理 - 合同续签流程预览
      // _previewProgressContractWarning: '/api/contract/warning/previewProgress.json',
      // 资产管理 - 资产转移流程预览
      _previewProgressAsset: '/api/asset/previewProgress.json',
      // _previewProgressUserRecord: '/api/sys/user_record/previewProgress.json',
      // 人员异动管理 - 人员异动审批预览
      _previewProgressEntry: '/api/entry/previewProgress.json',
      // // 人员异动管理 - 人员异动审批预览
      // _previewProgressStaffChange: '/api/user/change/previewProgress.json',
      // // 人员离职管理 - 离职流程预览
      // _previewProgressLeave: '/api/user/leave/previewProgress.json',
      // // 人员异动管理 - 批量人员异动信息流程预览
      // _previewProgressStaffChangeBatch: '/api/user/change/batch/previewProgress.json',
      // // 人员异动管理 - 批量职级调整流程预览
      // _previewProgressStaffSeqBatch: '/api/user/change/batch/seq/previewProgress.json',
      // // 成长中心 - 课程审批流程预览
      // _previewProgressCourse: '/api/learning/course/previewProgress.json',
      // // 月度绩效 - 月度绩效流程预览）月度绩效上传人员
      // _previewProgressKpi: '/api/month/kpi_upload/previewProgress.json',
      // IT管理 - 申请开通公共邮箱流程
      _previewProgressEmail: '/api/it/bpm/publicEmail/previewProgress.json',
      // // 申请重置密码流程预览
      // _previewProgressPassword: '/api/it/bpm/resetPassword/previewProgress.json',
      // IT管理 - 申请回收邮箱流程预览
      _previewProgressRecycleEmail: '/api/it/bpm/recycleEmail/previewProgress.json',
      // IT管理 - 申请邮箱群组流程预览
      _previewProgressEmailGroup: '/api/it/bpm/emailGroup/previewProgress.json',
      // IT管理 - 申请调整发件人权限预览
      _previewProgressEmailSender: '/api/it/bpm/emailSender/previewProgress.json',
      // IT管理 - 申请开通VPN流程预览
      _previewProgressOpenVpn: '/api/it/bpm/openVpn/previewProgress.json',
      // IT管理 - 申请开通远程权限流程预览
      _previewProgressOpenRemote: '/api/it/bpm/openRemote/previewProgress.json',
      // IT管理 - 申请开通Vpn资源流程预览
      _previewProgressVpnResource: '/api/it/bpm/vpnResource/previewProgress.json',
      // IT管理 - 申请设备维修流程预览
      _previewProgressRepairDevice: '/api/it/bpm/repairDevice/previewProgress.json',
      // IT工单-其他问题 预览接口
      _previewProgressItOther: '/api/it/bpm/other/previewProgress.json'
      // //申请育儿假-流程预览 -v4.9.9
      // _previewProgressChildHoliday: '/api/apply/childHoliday/previewProgress.json'
    }
  },
  HOMEPAGE: {
    get: {
      _globalSearch: '/api/homepage/v2/global/search.json',
      _getRecord: '/api/homepage/v2/global/record.json',
      _lastSearchKeywords: '/api/homepage/v2/global/lastSearchKeywords.json',
      _menuSearch: '/api/homepage/v2/menu/search.json',
      _hasLightingBadge: '/api/sys/user_record/lightingPrompted.json',
      _getFloorByWorkplace: '/api/seat/place/getFloorByWorkplace.json'
    }
  },
  ENTRY: {
    get: {
      offerDetails_pendingOffer: '/api/offer/admin/get/offerApproveDetail.json',
      employ: '/api/offer/user/second/employ.json',
      pinyin: '/api/offer/user/pinyin.json',
      _offerEmail: '/api/offer/preview/offerEmail.json',
      _getFloorByWorkplace: '/api/seat/place/getFloorByWorkplace.json',
      _getUserRegisterMsg: '/api/entry/getUserRegisterMsg.json'
    },
    post: {
      _findDeptByName: '/api/offer/findDeptByName.json',
      _saveRegisterMsg: '/api/entry/saveRegisterMsg.json',
      _updateEdu: '/api/entry/user/updateEdu.json',
      setOfferDetail: function(type, params) {
        return post(`/api/offer/user/edit/offerDetail.json?type=${type}`, encrypt(params));
      },
      changeApproveStatus: function(params, action = 'submit') {
        let enParams = action === 'submit' ? encrypt(params) : params;
        if (action == 'submit') {
          return post(`/api/offer/user/approveStatus/${action}.json`, enParams);
        }
        return get(`/api/offer/admin/approveStatus/${action}.json`, enParams);
      }
    }
  },
  IT: {
    get: {
      _assetTransferDetail: '/api/asset/detail.json'
    },
    post: {
      _applyTransfer: '/api/asset/applyTransfer.json',
      _submitOpenEmailGroup: '/api/it/bpm/submitOpenEmailGroup.json',
      _emailUserList: '/api/it/email/user/list.json',
      _checkExist: '/api/it/email/checkExist.json',
      _submitRepairDevice: '/api/it/bpm/submitRepairDevice.json',
      _assetInfo: '/api/it/my/assetInfo.json',
      _submitOther: '/api/it/bpm/submitOther.json',
      _submitOpenPublicEmail: '/api/it/bpm/submitOpenPublicEmail.json',
      _submitOpenRemote: '/api/it/bpm/submitOpenRemote.json',
      _submitOpenVpnResource: '/api/it/bpm/submitOpenVpnResource.json',
      _submitOpenVpn: '/api/it/bpm/submitOpenVpn.json',
      _getUserInfo: '/api/it/bpm/getUserInfo.json'
    }
  },
  TRAIN: {
    get: {
      _offlineRelation:{
        api: '/api/learning/course/getOfflineRelationLearningNameList.json',
        apiConfig: { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
      }
    },
    post: {
      _learningTrainOffline: '/api/learning/train/offline.json',
      _offlineCourse: {
        api: '/api/learning/course/offlineLearningCourse.json',
        apiConfig: { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
      }
    }
  }

  // PSCC: {
  // }
};

export default getApiMethod(API);
