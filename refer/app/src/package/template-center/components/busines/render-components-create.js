
// 尝试思考是否可以把 create/fill/preview 用1个共同的js来统一注入 @小龙 @一鸣
import Columns from '../layout/basic/columns/create.vue';
import SelectBox from '../layout/basic/checkbox/create.vue';
import Fill from '../layout/basic/fill/create.vue';
import Score from '../layout/basic/score/create.vue';
import Date from '../layout/basic/date/create.vue';
import DateRange from '../layout/basic/date-range/create.vue';
import Remark from '../layout/basic/remark/create.vue';
import Attachment from '../layout/basic/attachment/create.vue';
// 套件
import GroupInterview from '@/package/template-center/components/layout/group/interview/role/create.vue';
import Evaluation from '@/package/template-center/components/layout/group/interview/evaluation/create.vue';
import Assessment from '@/package/template-center/components/layout/group/interview/assessment/create.vue';

// 套件 评委评估
import estimate from '@/package/template-center/components/layout/group/promotion/estimate/create.vue';

import TargetInfo from '@/package/template-center/components/layout/group/interview/target-info/create.vue';
// 关联数据
import Single from '@/package/template-center/components/layout/relation/interview/single/create.vue';
import Multiple from '@/package/template-center/components/layout/relation/interview/multiple/create.vue';
import {
    TYPE_BASIC_RADIO, TYPE_BASIC_COLUMNS, 
    TYPE_BASIC_DATE, TYPE_BASIC_FILL, 
    TYPE_BASIC_CHECKBOX, TYPE_BASIC_DATE_RANGE,
    TYPE_BASIC_REMARK, TYPE_GROUP_INTERVIEW_ONESELF,
    TYPE_BASIC_SCORE, TYPE_BASIC_ATTACHMENT, TYPE_GROUP_INTERVIEW_SUPERIOR, 
    TYPE_GROUP_INTERVIEW_JUNIOR, TYPE_GROUP_INTERVIEW_COLLABORATION, 
    TYPE_GROUP_INTERVIEW_ASSESSMENT, TYPE_GROUP_INTERVIEW_CUSTOM,
    TYPE_GROUP_INTERVIEW_TARGET,
    TYPE_ELSE_EVALUATION, ROLE_RELATION_INTERVIEW_BASIC_SINGLE,
    ROLE_RELATION_INTERVIEW_ORDER, ROLE_RELATION_INTERVIEW_APPROVAL,
    ROLE_RELATION_INTERVIEW_BASIC_MULTIPLE, TYPE_GROUP_PROMOTION_ESTIMATE,
    ROLE_RELATION_PROMOTION_INFO
} from '@/package/template-center/model/const';

export default {
    [TYPE_BASIC_COLUMNS]: Columns,
    [TYPE_BASIC_DATE]: Date,                    // 日期
    [TYPE_BASIC_DATE_RANGE]: DateRange,              // 日期
    [TYPE_BASIC_FILL]: Fill,                    // 填空
    [TYPE_BASIC_RADIO]: SelectBox,                  // 单选多选公用一个组件
    [TYPE_BASIC_CHECKBOX]: SelectBox,            // 多选
    [TYPE_BASIC_REMARK]: Remark,                // 备注标题
    [TYPE_BASIC_SCORE]: Score,                  // 打分
    [TYPE_BASIC_ATTACHMENT]: Attachment,        // 附件

    [TYPE_GROUP_INTERVIEW_ONESELF]: GroupInterview,         // 访谈套件 本人角色
    [TYPE_GROUP_INTERVIEW_SUPERIOR]: GroupInterview,        // 访谈套件 上级
    [TYPE_GROUP_INTERVIEW_JUNIOR]: GroupInterview,          // 访谈套件 下级
    [TYPE_GROUP_INTERVIEW_COLLABORATION]: GroupInterview,   // 访谈套件 协作方
    [TYPE_GROUP_INTERVIEW_ASSESSMENT]: Assessment,          // 访谈-评估意见套件 
    [TYPE_GROUP_INTERVIEW_CUSTOM]: GroupInterview,          // 访谈-自定义套件
    [TYPE_ELSE_EVALUATION]: Evaluation,                     // 访谈组件 评估建议
    [TYPE_GROUP_INTERVIEW_TARGET]: TargetInfo,                  // 访谈-目标信息

    judge: estimate,              // 临时 后端会改这个code的字名
    [TYPE_GROUP_PROMOTION_ESTIMATE]: estimate,              // 晋升套件 评委评估

    [ROLE_RELATION_INTERVIEW_BASIC_SINGLE]: Single,         // 单子集
    [ROLE_RELATION_INTERVIEW_ORDER]: Single,                // 访谈信息
    [ROLE_RELATION_INTERVIEW_APPROVAL]: Single,             // 审批单
    [ROLE_RELATION_INTERVIEW_BASIC_MULTIPLE]: Multiple,     //  多子集
    [ROLE_RELATION_PROMOTION_INFO]: Single             // 审批单
};

