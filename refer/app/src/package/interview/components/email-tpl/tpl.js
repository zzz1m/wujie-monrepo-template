import { groupDataByTr } from './utils';

let config_data = null; // 配置信息
let FORMTYPE = null;

const filterChildren = function(list) {
    return list.filter(cell => {
        const data = config_data[ cell.code ];
        const { switchFields } = data;
        // 判断选项关联
        const judgeSwitchFields = (switchFields || []).some(cell => {
            const { type, value } = config_data[ cell.code ];
            return (type === '003' && value == cell.value)  // 单选
                || (type == '004' && value.includes(cell.value) );
        });
        return !data.switch || judgeSwitchFields;
    });
};

const transformSpace = function(str){
    return str.replace(/[\r\n]/g, '<br/>').replace(/ /g, '&ensp;');
};

// 生成区域标题
const createBlockTitle = function(title) {
    return `<tr class="tr-title">
        <td colspan="4" class="interview-type"><font color="#fff">${title}</font></td>
    </tr>`;
};
// 生成一级下级区域
const createSubContent = function(arr) {
    let htmlStr = '';
    for(let i=0; i<arr.length; i++){
        const item= arr[i];
        htmlStr += createChildView( item, i+1);
    }
    return htmlStr;
};

// 生成子元素视图
const createChildView = function( data, sort ){
    let htmlStr = '';
    const code = data.code;
    const item = config_data[code];
    if(!item) return '';
    const type = item.type + '';
    switch( type ){
        case '20001': // 4列表格
            htmlStr = createTrFor4Cols(item.options);
            break;
        case '20002': // 文本块
            htmlStr = createTextBlock( item.options );
            break;
        case '10002': // 访谈记录
            htmlStr = createTalkHistory( item );
            break;
        case '001': // 问答
            htmlStr = createDialog( item, sort );
            break;
        case '003': // 单选
            htmlStr = createSelect( item, sort );
            break;
        case '004': // 多选
            htmlStr = createSelect( item, sort, true);
            break;
        case '005': // 矩阵
            htmlStr = createRect( item, sort );
            break;
        case '006': // 评分
            htmlStr = createCore( item );
            break;
        case '007': // 段落
            htmlStr = createGraph( data );
            break;
    }
    return htmlStr;
};

// 生成4列表格
const createTrFor4Cols = function(arr, islast) {
    let htmlStr = '';
    const filterArr = groupDataByTr( arr );
    for(let i=0; i<filterArr.length; i++) {
        const cell = filterArr[i];
        htmlStr += `<tr>
            <td class="interview-key" width="16%">${cell[0].label}</td>
            <td class="interview-value" width="34%">${cell[0].value}</td>
            <td class="interview-key" width="16%">${cell[1].label}</td>
            <td class="interview-value" width="34%">${cell[1].value}</td>
        </tr>`;
    }
    return htmlStr;
};

// 生成文本块 -> 默认带标题
const createTextBlock = function(textArr) {
    let htmlStr = '';
    for(let i=0; i<textArr.length; i++) {
        const cell = textArr[i];
        htmlStr += `<tr>
            <td colspan="4">
                <p class="interview-des-title"><strong>${cell.label}</strong></p>
                <p class="interview-des-content">${transformSpace(cell.value)}</p>
            </td>
        </tr>`;
    }
    return htmlStr;
};

// 生成访谈记录
const createTalkHistory = function(item) {
    let htmlStr = '';
    const { staffInfo, interviewDate, questionList, evaluateInfo, level } = item;
    const joinAnswer = function(children) {
        return (children || []).map(cell => {
            return `<div class="interview-des-content">${ transformSpace(cell.value) }</div>`;
        }).join('');
    };
    const joinIssue = function(value, children) {
        return (children || []).map(cell => {
            const selectedCls = value == cell.value ? 'interview-label-selected' : '';
            const checkedIcon = value == cell.value ? '√' : '&ensp;';
            return `<span class="interview-label-item ${selectedCls}">(${checkedIcon})&ensp;${cell.label}&emsp;</span>`;
        }).join('');
    };
    // 生成访谈人和访谈时间
    if(staffInfo && interviewDate){
        htmlStr += `<tr>
            <td class="interview-key" width="16%">${staffInfo.label}</td>
            <td class="interview-value" width="34%">${staffInfo.value}</td>
            <td class="interview-key" width="16%">${interviewDate.label}</td>
            <td class="interview-value" width="34%">${interviewDate.value}</td>
        </tr>`;
    }
    // 生成问题列表
    if( questionList && questionList.length > 0 ){
        if( level == 1 ){
            htmlStr += `<tr>
                <td colspan="4">
                    ${ joinAnswer( questionList ) }
                </td>
            </tr>`;
        }else {
            for(let i=0; i<questionList.length; i++){
                const question = questionList[i];
                htmlStr += `<tr>
                    <td colspan="4">
                        <p class="interview-des-title"><strong>${question.label}</strong></p>
                        ${ joinAnswer( question.children ) }
                    </td>
                </tr>`;
            }
        }
    }
    // 渲染评估建议
    if( evaluateInfo ) {
        htmlStr += `<tr>
            <td class="interview-key" width="16%">评估建议</td>
            <td colspan="3" class="interview-value interview-col-3" width="84%">
                ${ joinIssue(evaluateInfo.value, evaluateInfo.options) }
            </td>
        </tr>`;
    }
    
    return htmlStr;
};

// 问答
const createDialog = function(item, sort){
    return `<tr>
        <td colspan="4" class="interview-question">
            <p class="interview-des-title"><strong>${sort}&emsp;${item.label}</strong></p>
            <p class="interview-des-content">${ transformSpace(item.value) }</p>
        </td>
    </tr>`;
};

// 生成单（多）选  multiple： false 单选  true 多选
const createSelect = function(item, sort, multiple = false) {
    const { options, label, value } = item;
    const createOptions = function() {
        return options.map(cell => {
            const checkedIcon = multiple ? (
                value.includes(cell.value) ? '√' : '&ensp;'
            ) : (
                cell.value == value ? '√' : '&ensp;'
            );
                
            const checkedCls = multiple ? (
                value.includes(cell.value) ? 'interview-label-selected' : '&ensp;'
            ) : (
                cell.value == value ? 'interview-label-selected' : '&ensp;'
            );
            const checkeTypeIcon = multiple ? `[${checkedIcon}]` : `(${checkedIcon})`;
            const inputval = cell.inputvalue ? `<br><span class="interview-question-text">${transformSpace(cell.inputvalue)}</span>` : '';
            return `<p class="interview-des-content"><span class="interview-label-item ${checkedCls}">${checkeTypeIcon}&ensp;${cell.label}</span>${ inputval }</p>`;
        }).join('');
    };
    return `<tr>
        <td colspan="4" class="interview-question">
            <p class="interview-des-title"><strong>${sort}&emsp;${label}</strong></p>
            ${ createOptions() }
        </td>
    </tr>`;
};

// 生成矩阵
const createRect = function(item, sort) {
    const { label, options } = item;
    let htmlStr = `<tr>
        <td colspan="4" class="interview-question">
            <p class="interview-des-title"><strong>${sort}&emsp;${label}</strong></p>
        </td>
    </tr>`;
    if(options && options.length > 0){
        for(let i=0;i<options.length; i++){
            const cell = options[i];
            htmlStr += `<tr>
                <td colspan="4">
                    <div class="interview-question-sub">
                        <p class="interview-des-title"><strong>${sort}.${i+1}&emsp;${cell.label}</strong></p>
                        <p class="interview-des-content">${ transformSpace(cell.value) }</p>
                    </div>
                </td>
            </tr>`;
        }
    }
    return htmlStr;
};

// 生成段落
const createGraph = function(data) {
    const { code, children } = data;
    const title = config_data[code].label;
    let htmlStr = `<tr class="tr-title">
        <td colspan="4" class="interview-type"><font color="#fff">${ title }</font></td>
    </tr>`;
    if( children && children.length > 0 ){
        const arr = FORMTYPE == '0' ? filterChildren( children ) : children; 
        htmlStr += createSubContent( arr );
    }
    return htmlStr;
};

// 生成评分标准
const createCore = function(data) {
    const { gradeIntro, children } = data;
    const createStandard = gradeIntro.map((item, idx) => {
        return `<br/>${idx+1}、${item}`;
    }).join('');
    const joinOptions = function(options) {
        return options.map((item, idx) => {
            return `<p class="interview-des-content">${idx+1}. ${item.label}</p>`;
        }).join('');
    };
    const score = (children || []).map((item, idx) => {
        return `<tr>
            <td colspan="4" class="interview-score">
                <p class="interview-des-title"><strong>${idx+1}&emsp;${item.title}</strong></p>
                ${ joinOptions(item.options || []) }
            </td>
        </tr>
        <tr>
            <td colspan="4" class="interview-score-result">
				<p class="text-base">评分：<strong>${item.value || '0'}分</strong></p>
			</td>
        </tr>`;
    }).join('');
    return `<tr>
        <td colspan="4" class="text-base">评分标准：${ createStandard }</td>
    </tr>${score}`;
};

/* 生成入口文件html字符串 */
export const createTbodyHtmlStr = function(model, config, formType) {
    let htmlStr = '';
    config_data = config;
    FORMTYPE = formType;

    
    // console.log('model', JSON.stringify( model));
    // console.log('config', JSON.stringify(config));

    for( let i=0; i< model.length; i++ ){
        const item = model[i];
        const { name, type, label } = config[item.code];
        const title = type == 10001 ? name : label;
        // 追加区域标题
        htmlStr += createBlockTitle(title);
        if( item.children && item.children.length > 0 ) {
            // 如果是离职类，则对数据进行过滤
            const arr = FORMTYPE == '0' ? filterChildren( item.children ) : item.children;
            // 追加子元素
            htmlStr += createSubContent(arr);
        }
    }

    return htmlStr;
};