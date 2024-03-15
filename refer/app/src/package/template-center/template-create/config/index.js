import {
    TYPE_BASIC_DATE, TYPE_BASIC_DATE_RANGE,
    TYPE_BASIC_CHECKBOX, TYPE_BASIC_FILL, TYPE_BASIC_SCORE,
    // group
    ROLE_GROUP_INTERVIEW,
    ROLE_GROUP_PROMOTION,
    // relation
    ROLE_RELATION_INTERVIEW_BASIC_SINGLE,
    ROLE_RELATION_INTERVIEW_BASIC_MULTIPLE,
    ROLE_RELATION_INTERVIEW_ORDER,
    ROLE_RELATION_INTERVIEW_APPROVAL,
    ROLE_RELATION_PROMOTION_INFO
} from '@/package/template-center/model/const';



import CheckboxRangeConfig from './basic/checkbox-range.vue';
import FillConfig from './basic/fill.vue';
import ScoreConfig from './basic/score.vue';
import DateConfig from './basic/date.vue';

// group
import InterviewConfig from './group/interview.vue';
import PromotionConfig from './group/promotion.vue';
// relation
import RelationSingleConfig from './relation/single.vue';
import RelationMultipleConfig from './relation/multiple.vue';

export default  {
    [TYPE_BASIC_DATE]: DateConfig,
    [TYPE_BASIC_DATE_RANGE]: DateConfig,
    // [TYPE_BASIC_COLUMNS]: Empty,
    [TYPE_BASIC_FILL]: FillConfig,
    // [TYPE_BASIC_RADIO]:  Empty,
    [TYPE_BASIC_CHECKBOX]: CheckboxRangeConfig,
    // [TYPE_BASIC_REMARK]: Empty,
    [TYPE_BASIC_SCORE]: ScoreConfig,
    // [TYPE_BASIC_ATTACHMENT]:  Empty,
    // group
    [ROLE_GROUP_INTERVIEW]: InterviewConfig,
    [ROLE_GROUP_PROMOTION]: PromotionConfig,
    // relation
    [ROLE_RELATION_INTERVIEW_BASIC_SINGLE]: RelationSingleConfig,
    [ROLE_RELATION_INTERVIEW_BASIC_MULTIPLE]: RelationMultipleConfig,
    [ROLE_RELATION_INTERVIEW_ORDER]: RelationSingleConfig,
    [ROLE_RELATION_INTERVIEW_APPROVAL]: RelationSingleConfig,
    [ROLE_RELATION_PROMOTION_INFO]: RelationSingleConfig

};