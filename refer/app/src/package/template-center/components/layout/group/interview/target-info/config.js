export const TARGET_INFO_VALUE =  {
    type: 2,    
    valueList: [
        // {
        //     // 目标
        //     target: '',
        //     children: [
        //         {   
        //             // 关键成果
        //             achievements: '32关键成果1',
        //             // 关键指标
        //             indicators: '关键指标',
        //             // 权重
        //             weight: '11',
        //             // 考核标准
        //             assessmentCriteria: '考核标准考核标准',
        //             // 数据来源
        //             dataSource: '位置', 
        //             // 完成情况
        //             completionStatus: '人的额外热',
        //             // 最终结果
        //             finalResult: '123',
        //             // 最终结果名称
        //             finalResultName: '321',
        //             // 最终得分
        //             finalScore: 11
        //         },
        //     ]
        // }
    ]
};
export const targetValidate = function(value) {
    return '';
    let type = value.type;
    let list = value.valueList;
    let noData = list.some(item => {
        let type = value.type;
        if (type === 1 && item.children) {
            return  item.children.some(children => {
                let completionStatus = !children?.completionStatus ? !children?.completionStatus.trim() : !children?.completionStatus;
                return completionStatus || !children?.finalResult;
            });  
        }
        else if (type === 2 && item.children) {
            return  item.children.some(children => {
                let completionStatus = !children?.completionStatus ? !children?.completionStatus.trim() : !children?.completionStatus;
                return completionStatus || !children?.finalScore;
            });  
        }
        return false;
    });
    if (noData) {
        return '请完善目标信息';
    }
};
