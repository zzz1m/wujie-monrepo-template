import HandoverTable from './comps/handover-table.vue';
import WorkHandover from './comps/work-handover.vue';
import ToLeaver from './comps/to-leaver.vue';

/**
 * 所有节点名称对照
 */
const NM = {
    // 审批环节
    Edit: ['填写表单', '发起申请'],
    ToER: ['传阅ER'], // 已删除
    Leader: ['部门负责人'],
    NextLeader: ['隔级部门负责人'],
    BeforeCEO: ['逐级审批至CEO下一级'],
    CTO: ['CTO'],
    Report2: ['汇报人2'],
    CMO: ['CMO'],
    Hr: ['第一人才发展中心', '第二人才发展中心', '人力资源部'],
    CEO: ['CEO'],
    ER: ['ER主管', 'ER审批'],
    // 离职办理环节
    SysHandover: ['系统交接'], // 已删除
    WorkHandover: ['汇报人工作交接/工作微信群退出', '工作交接'],
    ToLeaver: ['传阅离职员工'],
    ReComputer: ['办公电脑回收'],
    ReCard: ['工作证/门禁回收'],
    ReAll: ['工作证/门禁/办公电脑回收（区域）', '工作证/门禁/办公电脑回收'],
    SalarySum: ['财务借款/报销结算'],
    ReTL: ['Tableau License回收'],
    ReCRM: ['CRM权限关闭'],
    ReBoss: ['BOSS认证关闭'],
    ReQCC: ['企查查账号关闭'],
    Talent: ['人才引进', '人才引进处理'],
    Bonus: ['社会保险/公积金', '社会保险/公积金处理'],
    Stock: ['期权/股票处理'],
    Compensate: ['竞业协议/补偿金', '竞业限制/补偿金处理'],
    Certificate: ['离职证明开具', '证明开具'],
    CloseEmail: ['邮箱关闭']
};
/**
 * 节点类型
 * 最后处理的格式变为：
 * [key: NodeName]: [Value: 权限的Key]，比如：
 * 'Tableau License回收': 'RecycleOther'
 */
const NT = {
    //============ 审批环节 ================
    // 填写表单（含发页面）
    Edit: [NM.Edit],
    // ER审批
    ERAudit: [NM.ER, NM.closeWeixin, NM.closeBossBack],
    // 业务审批
    BussinessAudit: [NM.Leader, NM.NextLeader, NM.BeforeCEO, NM.CTO, NM.Report2, NM.CMO, NM.Hr, NM.CEO],
    //============ 离职办理环节 ================
    // 工作交接
    WorkHandover: [NM.WorkHandover],
    // 传阅离职员工
    ToLeaver: [NM.ToLeaver],
    // 办公电脑/工作证/门禁 回收
    Recycle: [NM.ReComputer, NM.ReCard, NM.ReAll],
    // 财务借款/报销结算
    SalarySum: [NM.SalarySum],
    // 其他系统账号/权限回收
    RecycleOther: [NM.ReTL, NM.ReCRM, NM.ReQCC, NM.CloseEmail],
    // BOSS认证关闭
    ReBoss: [NM.ReBoss],
    // 人才引进处理
    Talent: [NM.Talent],
    // 社会保险/公积金处理
    Bonus: [NM.Bonus],
    // 期权/股票处理
    Stock: [NM.Stock],
    // 竞业协议/补偿金
    Compensate: [NM.Compensate],
    // 证明开具
    Certificate: [NM.Certificate]
};

// 反转映射
function ReverseMap(mapObj, level = 1) {
    return Object.entries(mapObj).reduce((result, val) => {
        const [key, arr] = val;
        const map = arr.flat(level).reduce((a, b) => ({ ...a, [b]: key }), {});
        return {
            ...result,
            ...map
        };
    }, {});
}

const NodeNameMap = ReverseMap(NM, 0);
const NodeTypeMap = ReverseMap(NT);

export const getNodeType = ({ currentNodeName, progressInfo }) => {
    const curr = currentNodeName || (progressInfo.leaveUser && '传阅离职员工') || (progressInfo.viewUser && 'ER审批');
    const NodeName = NodeNameMap[curr];
    const Node = NodeTypeMap[curr];
    return {
        NodeName,
        Node
    };
};

export const getModules = ({ currentNodeName, progressInfo, processList, isOperate }, isAdminDetail = false) => {
    if (!progressInfo) {
        return [];
    }
    const { Node: currNode, NodeName: currNodeName } = getNodeType({ currentNodeName, progressInfo });
    // console.log(currentNodeName);


    const canEdit = isOperate && processList?.find((t) => t.last === 1)?.auditStatus !== 1 && currNodeName !== 'CloseEmail';

    const include = (list) => {
        if(isAdminDetail) return true;
        return  processList?.find((t) => {
            const { Node } = getNodeType({ currentNodeName: t.nodeName, progressInfo });
            return list.includes(Node);
        }) ||
        list.includes(currNode) ||
        false;
    };

    const format = (list) =>
        list.map((t) => {
            const [title, dataKey, isShow] = t;
            return { title, dataKey, isShow: isShow === undefined ? true : isShow };
        });

    // 一些公共的判断
    const OnAudit = isAdminDetail || include(['Edit', 'ERAudit', 'BussinessAudit']) || false;
    const ShowSerial = isAdminDetail || OnAudit || include('Compensate') || false;
    const hasQCC =
    isAdminDetail || processList?.find((t) => {
        const { NodeName } = getNodeType({ currentNodeName: t.nodeName, progressInfo });
        return NodeName === 'ReQCC';
    }) || false;
    //开启了竞业约束
    const showCompetition = ['01', '04'].includes(progressInfo.userInfoLeaveJobVO?.restrictionType);
    const showCompensate = [1, '1', true].indexOf(progressInfo?.userInfoLeaveJobVO?.payEconomicCompensate) > -1;

    const isHandler = isAdminDetail || include(['RecycleOther', 'ReBoss', 'Recycle', 'SalarySum', 'Talent', 'Bonus', 'Stock', 'Compensate']);
    // 是处理人，切当前正在处理
    const isHandlerCurr = (() => {
        if(isAdminDetail) return true;
        const t = include(['RecycleOther', 'ReBoss', 'Recycle', 'SalarySum', 'Talent', 'Bonus', 'Stock', 'Compensate']);
        if(typeof t === 'object') return !!t.last;
        return !!t;
    })();
    return [
        {
            title: '基本信息',
            vo: 'userInfoVO',
            isBool: ['isTl'],
            isDate: ['joinDate'],
            isRaw: ['mobile'],
            items: format([
                ['姓名', 'name'],
                ['员工编号', 'number'],
                [
                    '员工性质',
                    'userNatureName',
                    OnAudit || include(['SalarySum', 'Bonus', 'Stock', 'Compensate', 'Certificate'])
                ],
                ['入职日期', 'joinDate', OnAudit || include(['Bonus', 'Stock', 'Compensate', 'Certificate'])],
                ['邮箱', 'email'],
                ['手机号码', 'mobile', include(['Edit', 'ERAudit', 'Bonus', 'Stock', 'Compensate', 'ReBoss'])],
                [
                    '证件号码',
                    'idCardNumber',
                    include(['Edit', 'ERAudit', 'Bonus', 'Stock', 'Compensate', 'Certificate', 'closeWeixin'])
                ],
                ['部门', 'deptName', isAdminDetail || !include(['Talent'])],
                ['岗位', 'positionName', isAdminDetail || !include(['Talent'])],
                ['管理序列', 'manageSeq', ShowSerial],
                ['管理子序列', 'manageSeqSub', ShowSerial],
                ['管理标准岗位', 'manageStdPosition', ShowSerial],
                ['管理职级', 'manageSeqLevel', ShowSerial],
                ['专业序列', 'seq', ShowSerial],
                ['专业子序列', 'seqSub', ShowSerial],
                ['专业标准岗位', 'stdPosition', ShowSerial],
                ['专业职级', 'seqLevel', ShowSerial],
                ['是否是部门负责人', 'isTl', include(['Edit', 'ERAudit', 'closeWeixin'])],
                ['汇报人', 'reporterName', OnAudit || include(['WorkHandover', 'Recycle', 'Stock', 'Compensate'])],
                ['汇报人2', 'reporterName2', OnAudit || include(['WorkHandover'])],
                ['工作地点', 'workplace', OnAudit || include(['WorkHandover', 'Recycle', 'Bonus', 'Stock', 'Compensate'])],
                ['来源渠道', 'sourceName', OnAudit],
                ['推荐人', 'inviteUserName', OnAudit],
                ['企查查账号', 'qccAccount', hasQCC]
            ])
        },
        {
            title: '表单信息',
            subModules: [
                {
                    title: '离职信息',
                    vo: 'userInfoLeaveJobVO',
                    isBool: ['payEconomicCompensate'],
                    isDate: ['lastDay', 'releaseDate', 'restrictionStartDate', 'restrictionExpiryDate'],
                    isRaw: ['restrictionTypeName', 'restrictionTerm', 'remark', 'convertVacation', 'remainLeaveInLieu'],
                    isFull: ['remark'],
                    items: format([
                        ['离职情形', 'leaveSituationName', OnAudit || include('closeWeixin')],
                        ['离职操作类型', 'opTypeName', OnAudit || include('closeWeixin')],
                        ['真实离职类型', 'realTypeName', OnAudit || include('closeWeixin')],
                        ['离职原因所属类型', 'reasonTypeName', OnAudit || include('closeWeixin')],
                        ['工作交接人', 'handoverUserName', OnAudit || include('WorkHandover')],
                        ['最后工作日期', 'lastDay'],
                        [
                            '安排年休假天数（天）',
                            'convertVacation',
                            OnAudit || include(['closeWeixin', 'Compensate', 'Certificate'])
                        ],
                        [
                            '安排调休天数（天）',
                            'remainLeaveInLieu',
                            OnAudit || include(['closeWeixin', 'Compensate', 'Certificate'])
                        ],
                        [
                            '结薪日期/解除日期',
                            'releaseDate',
                            OnAudit ||
                include(['closeWeixin', 'Talent', 'Bonus', 'Stock', 'Compensate', 'Certificate', 'closeBossBack'])
                        ],
                        [
                            '是否执行竞业限制',
                            'restrictionTypeName',
                            OnAudit || include(['closeWeixin', 'Compensate', 'Certificate'])
                        ],
                        [
                            '竞业限制标准',
                            'competitivePayName',
                            (OnAudit || include(['closeWeixin', 'Compensate'])) && showCompetition
                        ],
                        [
                            '竞业开始日期',
                            'restrictionStartDate',
                            (OnAudit || include(['closeWeixin', 'Compensate', 'Certificate'])) && showCompetition
                        ],
                        [
                            '竞业限制期限（月）',
                            'restrictionTerm',
                            (OnAudit || include(['closeWeixin', 'Compensate', 'Certificate'])) && showCompetition
                        ],
                        [
                            '竞业结束日期',
                            'restrictionExpiryDate',
                            (OnAudit || include(['closeWeixin', 'Compensate', 'Certificate'])) && showCompetition
                        ],
                        [
                            '是否支付经济补偿',
                            'payEconomicCompensate',
                            OnAudit || include(['closeWeixin', 'Compensate', 'Certificate'])
                        ],
                        [
                            '经济补偿标准',
                            'economicPayName',
                            (OnAudit || include(['closeWeixin', 'Compensate', 'Certificate'])) && showCompensate
                        ],
                        ['离职详细说明', 'remark', OnAudit || include('closeWeixin')]
                    ])
                },
                {
                    title: '合同信息',
                    vo: 'userInfoContractVO',
                    hidden: !include(['Edit', 'ERAudit', 'BussinessAudit', 'Bonus', 'Compensate', 'Certificate', 'closeWeixin']),
                    isRaw: ['duration', 'description'],
                    isFull: ['description'],
                    isDate: ['startDate', 'endDate'],
                    items: format([
                        ['签订类型', 'signType'],
                        ['合同类型', 'contractType'],
                        ['合同主体', 'contractSubject'],
                        ['合同期限', 'duration'],
                        ['合同开始日期', 'startDate'],
                        ['合同结束日期', 'endDate'],
                        ['合同签订说明', 'description']
                    ])
                },
                {
                    title: '服务期限',
                    vo: 'userInfoServiceVOList',
                    isTable: true,
                    hidden: !include(['ERAudit', 'BussinessAudit', 'Talent']) || !progressInfo?.userInfoServiceVOList?.length,
                    items: format([
                        ['服务开始时间', 'startDate'],
                        ['服务结束时间', 'endDate'],
                        ['服务期说明', 'description']
                    ]),
                    isDate: ['startDate', 'endDate']
                },
                {
                    title: '工伤记录',
                    vo: 'userInfoInjuryVOList',
                    isTable: true,
                    hidden:
            !include(['ERAudit', 'BussinessAudit', 'Bonus', 'Compensate']) ||
            !progressInfo?.userInfoInjuryVOList?.length,
                    items: [
                        ['发生时间', 'occurDate'],
                        ['停工留薪期结束日期', 'endDate'],
                        ['工伤鉴定等级', 'level'],
                        ['详情说明', 'detail']
                    ].map((t) => ({
                        title: t[0],
                        dataKey: t[1],
                        isShow: true
                    })),
                    isDate: ['occurDate']
                }
            ]
        },
        {
            title: '工作交接',
            hidden: !include(['WorkHandover']),
            editable: canEdit && currNode === 'WorkHandover',
            component: WorkHandover
        },
        {
            title: '离职交接单',
            subTitle: include(['Certificate']) ? '' : '办理以下离职交接事项不分先后',
            hidden: isAdminDetail || !include(['Certificate', 'ToLeaver']) || !progressInfo.toDoList?.length,
            component: ToLeaver,
            noBorder: true
        },
        {
            title: '离职办理事项',
            hidden: !isHandler || !progressInfo.toDoList?.length || currNodeName === 'Certificate',
            component: HandoverTable,
            currNodeName,
            currentNodeName,
            editable: canEdit && isHandler && isHandlerCurr,
            noBorder: true
        }
    ].map((t) => {
        if (t.subModules?.length && t.subModules.filter((l) => !l.hidden)?.length === 1 && !t.hidden) {
            return t.subModules[0];
        } else {
            return t;
        }
    });
};
