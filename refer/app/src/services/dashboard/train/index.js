import { get, post } from '@/services/http';

// 讲师管理-讲师等级下拉选项
export const _allGrade = (params = {}) => {
    return get('/api/learning/lecturerGrade/all.json', params);
};

// 讲师管理-列表获取
export const _getTeacherList = (params = {}) => {
    return get('/api/learning/lecturer/list.json', params);
};

// 讲师管理-启用、停用
export const _getStatus = (params = {}) => {
    return get('/api/learning/lecturer/status.json', params);
};

// 讲师管理-删除
export const _remove= (params = {}) => {
    return post('/api/learning/lecturer/remove.json', params, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
};

// 【学习平台】首页-全部课程
export const _getPlatformHomePageCoursePageList = (params = {}) => {
    return post('/api/learning/platform/getPlatformHomePageCoursePageList.json', params);
};

// 【学习平台】首页-正在学习
export const _getStudyingCourseList = (params = {}) => {
    return get('/api/learning/platform/getStudyingCourseList.json', params, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
};

// 【学习平台】正在学习
export const _getStudyingCoursePageList = (params = {}) => {
    return get('/api/learning/platform/getStudyingCoursePageList.json', params, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
};

// 【学习平台】已完成
export const _getStudyFinishedCourseList = (params = {}) => {
    return get('/api/learning/platform/getStudyFinishedCourseList.json', params, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
};

// 【培训管理】我报名的培训
export const _myTrainList= (params = {}) => {
    return post('/api/learning/train/enroll/myTrainList.json', params);
};

// 【培训管理】获取培训列表
export const _learningTrainList = (params = {}) => {
    return post('/api/learning/train/list.json', params);
};

// 【培训管理】发布培训
export const _learningTrainOnline = (params = {}) => {
    return post('/api/learning/train/online.json', params);
};

// 【培训管理】保存并发布培训
export const _learningTrainPublish = (params = {}) => {
    return post('/api/learning/train/publish.json', params);
};

// 【培训管理】删除培训 
export const _learningTrainDelete = (params = {}) => {
    return post('/api/learning/train/delete.json', params);
};

// 【培训管理】编辑培训 
export const _learningTrainEdit = (params = {}) => {
    return post('/api/learning/train/edit.json', params);
};

// 【培训管理】下线培训 
export const _learningTrainOffline = (params = {}) => {
    return post('/api/learning/train/offline.json', params);
};

// 【培训管理】获取签到二维码
export const _learningTrainQrCode = (params = {}) => {
    return get('/api/learning/train/signin/qrCode.json', params);
};

// 【培训管理】获取签到二维码详情
export const _learningTrainQrCodeInfo = (params = {}) => {
    return get('/api/learning/train/signin/getInfo.json', params);
};

// 【培训管理】新增线下培训
export const _learningTrainAdd = (params = {}) => {
    return post('/api/learning/train/add.json', params);
};

// 【培训管理】获取报名列表
export const _learningTrainEnrollList = (params = {}) => {
    return post('/api/learning/train/enroll/list.json', params);
}; 

// 【培训管理】报名审核通过
export const _learningTrainEnrollApprove = (params = {}) => {
    return post('/api/learning/train/enroll/approve.json', params);
};

// 【培训管理】报名审核删除
export const _learningTrainDel = (params = {}) => {
    return post('/api/learning/train/enroll/del.json', params);
};

// 【培训管理】报名审核拒绝
export const _learningTrainEnrollReject = (params = {}) => {
    return post('/api/learning/train/enroll/reject.json', params);
};

// 【培训管理】管理员添加报名信息
export const _learningTrainEnrollAdd = (params = {}) => {
    return post('/api/learning/train/enroll/add.json', params);
};

// 【培训管理】管理员添加报名信息
export const _learningTrainSigninList = (params = {}) => {
    return post('/api/learning/train/signin/list.json', params);
}; 

// 【培训管理】获取培训详情
export const _learningTrainGetById = (params = {}) => {
    return post('/api/learning/train/getById.json', params);
};

// 【培训管理】获取培训id和类型
export const _getLearningType = (params = {}) => {
    return get('/api/learning/course/getLearningType.json', params);
};

// 【学习平台】课程详情页
export const _getCourseIntroduceDetail = (params = {}) => {
    return get('/api/learning/course/getCourseIntroduceDetail.json', params);
};

// 【学习平台】开始学习
export const _saveLearningSchedule = (params = {}) => {
    return post('/api/learning/platform/saveLearningSchedule.json', params);
};

// 【学习平台】继续学习
export const _updateLearningSchedule = (params = {}) => {
    return post('/api/learning/platform/updateLearningSchedule.json', params, {
        quiet: true
    });
};

// 【学习平台】最近一次学习
export const _getRecentStudyingCourseDetail = (params = {}) => {
    return get('/api/learning/platform/getRecentStudyingCourseDetail.json', params);
}; 

// 【培训管理】报名培训
export const _learningTrainEnrollEnroll = (params = {}) => {
    return post('/api/learning/train/enroll/enroll.json', params);
};

// 【培训管理】取消报名
export const _learningTrainEnrollCancel = (params = {}) => {
    return post('/api/learning/train/enroll/cancel.json', params);
};

// 【课程中心配置】列表查询
export const _courseCenterConfigList = (params = {}) => {
    return get('/api/learning/course/center/config/list.json', params);
};

// 【课程中心配置】课程banner发布下线
export const _publishOroffline = (params = {}, action) => {
    return post(`/api/learning/course/center/config/state/${action}.json`, params, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
};

// 【课程中心配置】课程banner添加或修改
export const _addOrUpdate = (params = {}) => {
    return post('/api/learning/course/center/config/addOrUpdate.json', params);
};

// 【课程中心配置】课程banner删除
export const _bannerDel = (params = {}, action) => {
    return post('/api/learning/course/center/config/del.json', params, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
};

// 【课程中心配置】课程banner排序
export const _bannerSort = (params = {}) => {
    return post('/api/learning/course/center/config/sort.json', params);
};

// 【课程中心配置】保存
export const _courseCenterSave = (params = {}) => {
    return post('/api/learning/course/center/config/save.json', params);
};

// 讲师管理-获取讲师（排除掉已经是讲师的）
export const _searchInfo= (params = {}) => {
    return get('/api/learning/lecturer/user/searchInfo.json', params);
};

// 讲师管理-创建
export const _teacherAdd= (params = {}) => {
    return post('/api/learning/lecturer/add.json', params);
};

//【讲师管理】根据userId获取
export const _getLecturerByUserId = (params = {}) => {
    return get('/api/learning/lecturer/getLecturerByUserId.json', params);
};

// 讲师管理-编辑-回显
export const _teacherInfo= (params = {}) => {
    return get('/api/learning/lecturer/info.json', params);
};

// 讲师管理-编辑-保存
export const _teacherUpdate= (params = {}) => {
    return post('/api/learning/lecturer/update.json', params);
};

// 讲师等级-获取列表
export const _gradeList= (params = {}) => {
    return get('/api/learning/lecturerGrade/list.json', params);
};

// 讲师等级-排序保存
export const _updateSort= (params = {}) => {
    return post('/api/learning/lecturerGrade/updateSort.json', params);
};

// 讲师等级-删除
export const _delete= (params = {}) => {
    return post('/api/learning/lecturerGrade/remove.json', params, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
};

// 讲师等级-创建-保存
export const _gradeAdd= (params = {}) => {
    return post('/api/learning/lecturerGrade/add.json', params);
};

// 讲师等级-编辑-保存
export const _gradeUpdate= (params = {}) => {
    return post('/api/learning/lecturerGrade/update.json', params);
};

// 讲师等级-编辑-回显
export const _gradeInfo= (params = {}) => {
    return get('/api/learning/lecturerGrade/info.json', params);
};

// 讲师等级-名称重复查询
export const _gradeRepeat= (params = {}) => {
    return get('/api/learning/lecturerGrade/repeat.json', params);
};

// 课程分类-创建分类
export const _categoryAdd= (params = {}) => {
    return post('/api/learning/courseCategory/add.json', params);
};

// 课程分类-创建&编辑-更新
export const _categoryUpdate= (params = {}) => {
    return post('/api/learning/courseCategory/update.json', params);
};

// 课程分类-编辑-回显
export const _categoryInfo= (params = {}) => {
    return get('/api/learning/courseCategory/info.json', params);
};

// 课程分类-获取列表
export const _categoryTree= (params = {}) => {
    return get('/api/learning/courseCategory/tree.json', params);
};

export const _checkVideoTransfered = (params = {}) => {
    return get('/api/learning/course/isTransferFinished.json', params);
};

// 课程分类-排序
export const _categorySort= (params = {}) => {
    return post('/api/learning/courseCategory/updateSort.json', params);
};

// 课程分类-删除
export const _categorRemove= (params = {}) => {
    return post('/api/learning/courseCategory/remove.json', params, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
};
// 课程分类-获取子分类
export const _getSubList= (params = {}) => {
    return get('/api/learning/courseCategory/subList.json', params);
};

// 课程分类-名称重复校验
export const _repeatNameCheck= (params = {}) => {
    return get('/api/learning/courseCategory/count.json', params);
};

// 学习数据概览
export const _getLearningData= (params = {}) => {
    return post('/api/learning/view/getLearningData.json', params);
};

// 课程管理-发布
export const _courseRelease= (params = {}) => {
    return post('/api/learning/course/publishLearningCourse.json', params, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
};

// 课程管理-列表查询
export const _courseList= (params = {}) => {
    return post('/api/learning/course/getLearningCoursePageList.json', params);
};

// 课程管理-保存
export const _courseSave= (params = {}) => {
    return post('/api/learning/course/saveLearningCourse.json', params);
};

// 课程管理-编辑-保存或发布
export const _courseUpdate= (params = {}) => {
    return post('/api/learning/course/updateLearningCourse.json', params);
};

// 课程管理-删除
export const _courseDelete= (params = {}) => {
    return post('/api/learning/course/deleteLearningCourse.json', params, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
};

// 课程管理-审批详情
export const _getDetailApprove= (params = {}) => {
    return get('/api/process/center/getDetailByProcessInstanceId.json', params);
};

// 课程管理-学习详情
export const _getStudyDetail= (params = {}) => {
    return get('/api/learning/course/getLearningCourseSchedulePageList.json', params, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
};

// 课程管理-学习进度
export const _getProgress= (params = {}) => {
    return get('/api/learning/course/getLearningCourseScheduleDetailList.json', params, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
};

// 课程管理-筛选已启用的讲师
export const _openAll = (params = {}) => {
    return get('/api/learning/lecturer/all.json', params);
};

// 删除视频
export const _videoDelete= (params = {}) => {
    return post('/api/common/vod/delVodFile.json', params, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
};
// 删除文件
export const _fileDelete= (params = {}) => {
    return post('/api/learning/course/deleteOssKey.json', params, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
};

// 课程管理-课程选取
export const _selectCourse= (params = {}) => {
    return post('/api/learning/course/selectLearningCoursePageList.json', params);
};

// 课程管理-下线
export const _offlineCourse= (params = {}) => {
    return post('/api/learning/course/offlineLearningCourse.json', params, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
};

// 课程管理-下线-关联课程
export const _offlineRelation= (params = {}) => {
    return get('/api/learning/course/getOfflineRelationLearningNameList.json', params, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
};

// 课程管理（培训管理）-获取标准岗位
export const _findByMultiPositionName = (params = {}) => {
    return get('/api/sys/dict/findByMultiPositionName.json', params);
};

// 学习明细导出
export const _exportLearningDetail = (params = {}) => {
    return post('/api/learning/view/exportLearningDetail.json', params);
};

// 课程明细导出
export const _exportCourseDetail = (params = {}) => {
    return post('/api/learning/view/exportCourseDetail.json', params);
};

// 导出全部课程
export const _exportLearningCourse = (params = {}) => {
    return post('/api/learning/course/exportLearningCourse.json', params);
};

// 获取视频播放学习进度
export const _getLearningScheduleInfo = (params = {}) => {
    return get('/api/learning/platform/learningScheduleInfo.json', params);
};

export const _exportLearningDetailById = (params = {}) => {
    return get('/api/learning/view/exportLearningDetailById.json', params);
};

// 【图书管理】获取图书分页列表
export const _bookList = (params = {}) => {
    return get('/api/learning/book/list.json', params);
};

// 【图书管理】获取图书下拉列表
export const _bookdropDown = (params = {}) => {
    return get('/api/learning/book/dropDown.json', params);
};

// 【图书管理】获取图书详情页
export const _bookdetail = (params = {}) => {
    return get('/api/learning/book/detail.json', params);
};

// 【图书管理】增加/编辑图书
export const _bookupdate = (params = {}) => {
    return post('/api/learning/book/addOrUpdate.json', params);
};

// 【图书管理】上线
export const _bookstate = (params = {}) => {
    if (params.type === 'on') {
        return post('/api/learning/book/online.json?id=' + params.id, params);
    }
    return post('/api/learning/book/offline.json?id=' + params.id, params);
};

// 【图书管理】评价
export const _bookevaluate = (params = {}) => {
    return post('/api/learning/book/evaluate.json', params);
};

// 【图书管理】获取人员评分
export const _bookuserScore = (params = {}) => {
    return post('/api/learning/book/userScore.json?id=' + params.id, params);
};

// 【书单管理】获取书单分页列表
export const _bookshelfList = (params = {}) => {
    return get('/api/learning/bookshelf/list.json', params);
};

// 【书单管理】获取书单分页列表
export const _bookshelfupdate = (params = {}) => {
    return post('/api/learning/bookshelf/addOrUpdate.json', params);
};

// 【书单管理】获取书单分页列表
export const _bookshelfdelete = (params = {}) => {
    return post('/api/learning/bookshelf/delete.json?id=' + params.id, params);
};
// learningBook
const moduel = 'learningBook';

// 评论审核列表接口
export const _auditPsccList = (params = {}) => {
    return get(`/api/comment/audit/${moduel}/list.json`, params);
};

// 评论审核通过
export const _auditPsccPass = (params = {},) => {
    return post(`/api/comment/audit/${moduel}/pass.json?id=${params.id}`, params);
};

// 评论审核驳回
export const _auditPsccReject = (params = {}) => {
    return post(`/api/comment/audit/${moduel}/reject.json?id=${params.id}`, params);
};

// 评论审核删除
export const _auditPsccDelete = (params = {}) => {
    return post(`/api/comment/audit/${moduel}/delete.json?id=${params.id}`, params);
};

// 管理端获取评论树
export const _commenttree = (params = {}) => {
    return get(`/api/comment/admin/${moduel}/tree.json`, params);
};
// 删除
export const _commentdelete = (params = {}) => {
    return post(`/api/comment/admin/${moduel}/delete.json?id=${params.id}`, params);
};
// 置顶
export const _top = (params = {}) => {
    return post(`/api/comment/admin/${moduel}/top.json?id=${params.id}`, params);
};
// 取消置顶
export const _unTop = (params = {}) => {
    return post(`/api/comment/admin/${moduel}/unTop.json?id=${params.id}`, params);
};

// 分页获取评论树
export const _pageTree = (params = {}) => {
    return get(`/api/comment/${moduel}/pageTree.json`, params);
};

// 获取置顶评论树
export const _topTree = (params = {}) => {
    return get(`/api/comment/${moduel}/topTree.json`, params);
};

// 评论点赞
export const _like = (params = {}) => {
    if (params.like) {
        return post(`/api/comment/${moduel}/like.json?id=${params.id}`, params);
    }
    return post(`/api/comment/${moduel}/unLike.json?id=${params.id}`, params);
    
};

// 评论保存
export const _save = (params = {}) => {
    return post(`/api/comment/${moduel}/save.json`, params);
};

// 评论删除
export const _deleteComment = (params = {}) => {
    return post(`/api/comment/${moduel}/delete.json`, params);
};

export const _trainReportList = (params = {}) => {
    return get(`/api/learning/train/report/list.json`, params);
};
export const _trainReportDelete = (params = {}) => {
    return post(`/api/learning/train/report/delete.json?id=${params.id}`, params);
};

