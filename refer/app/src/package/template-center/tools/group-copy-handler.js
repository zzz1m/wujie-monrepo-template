/**
 * 主要是处理填写阶段或者预览阶段，根据存储的param动态生成viewlist中的选项问题
 */
import { ROLE_GROUP_INTERVIEW, TYPE_ELSE_EVALUATION } from '../model/const.js';
import { deepCopy } from '@/utils/object';
import { extend } from '../model/tools.js';
import Vue from 'vue';


export const createCopiedInterviewGroup = function( params = {}, viewlist = [], config = {} ) {
    const copiedMap = getCopyGroup( params );
    setGroupHide(params, config);
    // 获取只是访谈套件的copy信息
    const copiedInterviewGroups = getInterviewGroupsMap( copiedMap, config );
    if( copiedInterviewGroups.length < 1 ) return;
    copiedInterviewGroups.forEach(copyId => {
        const idx = viewlist.findIndex(item => item.id === copyId );
        const copyItem = viewlist.find(item => item.id === copyId );
        const copiedGroups = copiedMap[ copyId ]; // 依赖当前copyid的所有数据集合

        const result = handleCopyViewItem( copyItem, copiedGroups );

        viewlist.splice(idx+1, 0, ...result );
    });


    // 处理copy的viewitem信息
    function handleCopyViewItem( viewitem, copiedGroups ){
        return copiedGroups.sort(( cur, target ) => cur.sort - target.sort)
            .map(item => {
                const { id, copyId } = item;

                const groupConfigInfo = deepCopy(config[copyId]);
                extend(groupConfigInfo, { id, copyId });
                // 扩展套件的配置信息
                Vue.set(config, id, groupConfigInfo );

                const children = createCopiedChildren( deepCopy( viewitem.children || [] ),  id );
                return { id, copyId, children };
            });
    }


    // 开始递归生成copy的viewlist
    function createCopiedChildren( children = [], parentId ){
        if( children && children.length < 1 ) return [];
        return children.map( item => {
            const { id, children } = item;
            const target = copiedMap[ id ].find(cell => cell.parentId === parentId );
            const newId = target.id;

            const itemConfigInfo = deepCopy(config[id]);
            extend(itemConfigInfo, { id: newId, copyId: id, parentId  });
            // 扩展套件的配置信息
            Vue.set(config, newId, itemConfigInfo );

            return {
                id: newId,
                copyId: id,
                children: createCopiedChildren( children, target.id )
            };
        });
    }
};

/**
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
 * * * * * * * * * * * * * * * * * * * * * * 辅助函数 * * * * * * * * * * * * * * * * * * * * * * * * * 
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
 */

// 把param里所有带有copyid的字段进行分组
function getCopyGroup( params = {} ) {
    const copyGroupArr = {};
    const keysArr = Object.keys( params );
    if( keysArr.length < 1 ) return {};

    const arr = keysArr.filter(key => {
        const { copyId } = params[key];
        return Boolean( copyId );
    });
    arr.reduce(( current, next ) => {
        const param = params[next];
        const copyId = param.copyId;
        param.id = next;
        if( current.hasOwnProperty( copyId ) ){
            current[ copyId ].push( param );
        }else {
            current[ copyId ] = [ param ];
        }
        return current;
    }, copyGroupArr);
    return copyGroupArr;
}

// 获取访谈套件的copy信息
function getInterviewGroupsMap( copiedMap = {}, config = {} ){
    const keysArr = Object.keys( copiedMap );
    if( keysArr.length < 1 ) return [];

    return keysArr.filter(key => {
        const { role, type } = config[key];
        return role === ROLE_GROUP_INTERVIEW && type !== TYPE_ELSE_EVALUATION;
    });
}
// 处理如果没有值 隐藏套件的逻辑  （套件如果param为空，则代表这个套件被用户删除了）
function setGroupHide(params, config) {
    Object.values(config).forEach( viewConfig => {
        if (viewConfig.role.startsWith('group-') && !params[viewConfig.id]) {
            viewConfig.hidden = true;
        }
    });
}


// 以下为mock测试数据
const params = {
    'group-interview_superior_7c22-103a-488b-ac2c-7318-evaluation': {
        'value': {
            'userid': '',
            'interviewTime': '',
            'advice': '',
            'suggest': ''
        },
        'parentId': 'group-interview_superior_7c22-103a-488b-ac2c-7318'
    },
    'group-interview_superior_7c22-103a-488b-ac2c-7318': {
        'value': {
            'userid': '',
            'interviewTime': '2022-07-01',
            'advice': '',
            'suggest': ''
        },
        'parentId': null
    },
    'basic_radio_8d0e-a868-4e2e-a45f-bbc8': {
        'value': {
            'optionId': '',
            'extra': ''
        },
        'parentId': 'basic_columns_1b81-88c2-4225-98ae-dab1'
    },
    'copy_basic-choose_radio_b5fd-f85f-433f-ac09-07c6': {
        'value': {
            'optionId': '',
            'extra': ''
        },
        'parentId': 'copy_basic-layout_columns_8d51-871e-40d4-8c8d-566d',
        'copyId': 'basic_radio_8d0e-a868-4e2e-a45f-bbc8',
        'sort': 1658490862946
    },
    'copy_basic-layout_columns_8d51-871e-40d4-8c8d-566d': {
        'value': '',
        'parentId': 'copy_group-interview_superior_246b-e258-40e1-b42a-1326',
        'copyId': 'basic_columns_1b81-88c2-4225-98ae-dab1',
        'sort': 1658490862946
    },
    'copy_group-interview_evaluation_4db4-a458-4257-8bea-ebfb': {
        'value': {
            'userid': '',
            'interviewTime': '',
            'advice': '',
            'suggest': ''
        },
        'parentId': 'copy_group-interview_superior_246b-e258-40e1-b42a-1326',
        'copyId': 'group-interview_superior_7c22-103a-488b-ac2c-7318-evaluation',
        'sort': 1658490862946
    },
    'copy_group-interview_superior_246b-e258-40e1-b42a-1326': {
        'value': {
            'userid': '',
            'interviewTime': '2022-07-16',
            'advice': '',
            'suggest': ''
        },
        'parentId': null,
        'copyId': 'group-interview_superior_7c22-103a-488b-ac2c-7318',
        'sort': 1658490862947
    },
    'copy_basic-choose_radio_a267-2773-4ccd-b77e-11c3': {
        'value': {
            'optionId': 'options_2014-42c0-4df0-b58b-3edb',
            'extra': ''
        },
        'parentId': 'copy_basic-layout_columns_ba4e-3638-4f6c-a392-1efe',
        'copyId': 'basic_radio_8d0e-a868-4e2e-a45f-bbc8',
        'sort': 1658490864496
    },
    'copy_basic-layout_columns_ba4e-3638-4f6c-a392-1efe': {
        'value': '',
        'parentId': 'copy_group-interview_superior_e2f3-0311-4cce-9919-36c7',
        'copyId': 'basic_columns_1b81-88c2-4225-98ae-dab1',
        'sort': 1658490864496
    },
    'copy_group-interview_evaluation_47b7-0fef-4766-aa22-5ee1': {
        'value': {
            'userid': '',
            'interviewTime': '',
            'advice': '1',
            'suggest': ''
        },
        'parentId': 'copy_group-interview_superior_e2f3-0311-4cce-9919-36c7',
        'copyId': 'group-interview_superior_7c22-103a-488b-ac2c-7318-evaluation',
        'sort': 1658490864496
    },
    'copy_group-interview_superior_e2f3-0311-4cce-9919-36c7': {
        'value': {
            'userid': '',
            'interviewTime': '2022-07-26',
            'advice': '',
            'suggest': ''
        },
        'parentId': null,
        'copyId': 'group-interview_superior_7c22-103a-488b-ac2c-7318',
        'sort': 1658490864497
    }
};
const viewlist = [{'id':'group-interview_superior_7c22-103a-488b-ac2c-7318','children':[{'id':'basic_columns_1b81-88c2-4225-98ae-dab1','children':[{'id':'basic_radio_8d0e-a868-4e2e-a45f-bbc8','splits':50}]},{'id':'group-interview_superior_7c22-103a-488b-ac2c-7318-evaluation'}]}];

const config = {
    'basic_columns_1b81-88c2-4225-98ae-dab1': {'id':'basic_columns_1b81-88c2-4225-98ae-dab1','parentId':'group-interview_superior_7c22-103a-488b-ac2c-7318','code':'','role':'basic-layout','roleName':'','type':'columns','title':'分栏','titleLimit':1000,'hasInstructions':false,'instructions':'请输入题干说明','instructionsLimit':1000,'showSerial':false,'serialStrategy':1,'hidden':false,'required':false},
    'basic_radio_8d0e-a868-4e2e-a45f-bbc8':{'id':'basic_radio_8d0e-a868-4e2e-a45f-bbc8','parentId':'basic_columns_1b81-88c2-4225-98ae-dab1','code':'','role':'basic-choose','roleName':'','type':'radio','title':'请选择一个选项','titleLimit':1000,'hasInstructions':false,'instructions':'请输入题干说明','instructionsLimit':1000,'showSerial':false,'serialStrategy':1,'hidden':false,'required':false,'options':[{'code':'options_2014-42c0-4df0-b58b-3edb','label':'选项1','hasExplain':false,'explain':'请输入选项说明','explainLimit':1000,'hasExtra':false,'extra':'','hasExtraLimit':false,'extraRequired':false,'extraLimit':9999,'extraRule':-1,'ruleName':''},{'code':'options_b12c-f1c2-406d-bc58-cbb0','label':'选项2','hasExplain':false,'explain':'请输入选项说明','explainLimit':1000,'hasExtra':false,'extra':'','hasExtraLimit':false,'extraRequired':false,'extraLimit':9999,'extraRule':-1,'ruleName':''}]},
    'group-interview_superior_7c22-103a-488b-ac2c-7318':{'id':'group-interview_superior_7c22-103a-488b-ac2c-7318','parentId':null,'role':'group-interview','type':'superior','title':'直属上级','titleLimit':1000,'hasInstructions':false,'instructions':'请输入题干说明','instructionsLimit':1000,'showSerial':false,'serialStrategy':1,'hidden':false,'required':false,'multiple':true,'labelName':'直属上级','labelTime':'访谈时间'},
    'group-interview_superior_7c22-103a-488b-ac2c-7318-evaluation':{'id':'group-interview_superior_7c22-103a-488b-ac2c-7318-evaluation','type':'evaluation','role':'group-interview','parentId':'group-interview_superior_7c22-103a-488b-ac2c-7318','hidden':false}
};

// createCopiedInterviewGroup(params, viewlist, config); 