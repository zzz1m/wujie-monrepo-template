import { 
    TYPE_BASIC_RADIO, TYPE_BASIC_COLUMNS, 
    TYPE_BASIC_DATE, TYPE_BASIC_FILL, 
    TYPE_BASIC_CHECKBOX, TYPE_BASIC_DATE_RANGE,
    TYPE_BASIC_REMARK, TYPE_GROUP_INTERVIEW_ONESELF,
    TYPE_BASIC_SCORE, TYPE_BASIC_ATTACHMENT,
    TYPE_ELSE_EVALUATION, ROLE_RELATION_INTERVIEW_BASIC_SINGLE,
    TYPE_GROUP_INTERVIEW_SUPERIOR, TYPE_GROUP_INTERVIEW_JUNIOR,
    TYPE_GROUP_INTERVIEW_COLLABORATION, TYPE_GROUP_INTERVIEW_ASSESSMENT,
    TYPE_GROUP_INTERVIEW_CUSTOM, ROLE_RELATION_INTERVIEW_ORDER, 
    ROLE_RELATION_INTERVIEW_APPROVAL, ROLE_RELATION_INTERVIEW_BASIC_MULTIPLE, TYPE_GROUP_PROMOTION_ESTIMATE, TYPE_GROUP_INTERVIEW_TARGET,
    ROLE_RELATION_PROMOTION_INFO
} from '@/package/template-center/model/const';

// 基本控件
import radio from '@/package/template-center/components/layout/basic/radio/fill.vue';
import columns from '@/package/template-center/components/layout/basic/columns/fill.vue';
import checkbox from '@/package/template-center/components/layout/basic/checkbox/fill.vue';
import fill from '@/package/template-center/components/layout/basic/fill/fill.vue';
import date from '@/package/template-center/components/layout/basic/date/fill.vue';
import remark from '@/package/template-center/components/layout/basic/remark/fill.vue';
import score from '@/package/template-center/components/layout/basic/score/fill.vue';
import attachment from '@/package/template-center/components/layout/basic/attachment/fill.vue';

// 访谈 套件
import groupInterview from '@/package/template-center/components/layout/group/interview/role/fill.vue';
import assessment from '@/package/template-center/components/layout/group/interview/assessment/fill.vue';
import evaluation from '@/package/template-center/components/layout/group/interview/evaluation/fill.vue';
import targetInfo from '@/package/template-center/components/layout/group/interview/target-info/fill.vue';

// 评委评估
import estimate from '@/package/template-center/components/layout/group/promotion/estimate/fill.vue';

// 关联数据
import single from '@/package/template-center/components/layout/relation/interview/single/fill.vue';
import multiple from '@/package/template-center/components/layout/relation/interview/multiple/fill.vue';

export default {
    [TYPE_BASIC_DATE]: date,                    // 日期
    [TYPE_BASIC_DATE_RANGE]: date,              // 日期
    [TYPE_BASIC_COLUMNS]: columns,              // 分栏
    [TYPE_BASIC_FILL]: fill,                    // 填空
    [TYPE_BASIC_RADIO]: radio,                  // 单选
    [TYPE_BASIC_CHECKBOX]: checkbox,            // 多选
    [TYPE_BASIC_REMARK]: remark,                // 备注标题
    [TYPE_BASIC_SCORE]: score,                  // 打分
    [TYPE_BASIC_ATTACHMENT]: attachment,        // 附件
    
    [TYPE_GROUP_INTERVIEW_ONESELF]: groupInterview,         // 访谈套件 本人角色
    [TYPE_GROUP_INTERVIEW_SUPERIOR]: groupInterview,        // 访谈套件 上级
    [TYPE_GROUP_INTERVIEW_JUNIOR]: groupInterview,          // 访谈套件 下级
    [TYPE_GROUP_INTERVIEW_COLLABORATION]: groupInterview,   // 访谈套件 协作方
    [TYPE_GROUP_INTERVIEW_ASSESSMENT]: assessment,          // 访谈套件 评估意见
    [TYPE_GROUP_INTERVIEW_CUSTOM]: groupInterview,          // 访谈套件 自定义
    [TYPE_ELSE_EVALUATION]: evaluation,                     // 访谈组件 评估意见
    [TYPE_GROUP_INTERVIEW_TARGET]: targetInfo,              // 目标信息

    judge: estimate,              // 临时 后端会改这个code的字名
    [TYPE_GROUP_PROMOTION_ESTIMATE]: estimate,              // 晋升套件 评委评估

    [ROLE_RELATION_INTERVIEW_BASIC_SINGLE]: single,         // 单子集
    [ROLE_RELATION_INTERVIEW_ORDER]: single,                // 访谈信息
    [ROLE_RELATION_INTERVIEW_APPROVAL]: single,             // 审批单
    [ROLE_RELATION_INTERVIEW_BASIC_MULTIPLE]: multiple,      // 多子集
    [ROLE_RELATION_PROMOTION_INFO]: single             // 审批单
};
