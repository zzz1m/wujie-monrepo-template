/* 处理4列表格的规范 */
export const transformTrDataTo4Cols = function(data) {
    const filterData = data.filter(item => item.checked);
    if( filterData.length%2 > 0 ){
        filterData.push({ label: '', value: '', checked: true });
    }
    return filterData.map(item => {
        item.value = item.value || '';
        return item;
    });
};

/* 把表格数据转化为二维数组，方便分行展示 */
export const groupDataByTr = function(data) {
    const mapData = transformTrDataTo4Cols( data );
    const arr = [];
    for(let i=0;i<mapData.length;i+=2){
        arr.push( mapData.slice(i, i+2) );
    }
    return arr;
};


/* 邮件模版样式 */
export const evaluationEmailStyle = `<style>body{font-family:Helvetica Neue,Helvetica,Arial,PingFang SC,Hiragino Sans GB,Microsoft YaHei,sans-serif;font-size:14px;line-height:24px;color:#161b26;background-color:#fff;-webkit-font-smoothing:antialiased;text-decoration:none}.interview-table{border-top:1px #ccc solid;border-left:1px #ccc solid;border-right:1px solid #ccc;border-collapse:collapse}.interview-table td{padding:10px 20px;border:none;border-bottom:1px #ccc solid;border-right:1px #ccc solid;border-left:1px #ccc solid;word-break:break-all}.tr-title{font-size:16px}.interview-table .interview-module-last td{border-bottom:0}.interview-table p{margin:9px 0}.interview-table .interview-title{font-size:20px;font-weight:700;text-align:center;padding:26px 20px;border-bottom:0;border-top:1px #ccc solid;border-bottom-color:#5dd5c8}.interview-table .interview-type{font-size:16px;font-weight:700;text-align:center;padding:15px 20px;background-color:#5dd5c8;color:#fff;border-top-color:#5dd5c8;border-bottom-color:#5dd5c8}.interview-table .interview-col-3{width:84%}.interview-key{color:#646f79;width:16%}.interview-value{font-weight:700}.interview-des-title{font-size:14px;font-weight:700;color:#00c2b3}.interview-des-content{font-size:14px;white-space:pre-wrap}.interview-label-item{display:inline-block;vertical-align:middle;padding-right:10px;font-weight:400}.interview-label-item input{vertical-align:middle;margin:-2px 5px 0 0}.interview-label-selected{color:#00c2b3}.interview-label-text{display:inline-block;vertical-align:middle}.interview-question .interview-des-content{padding-left:22px}.interview-question .interview-question-text{display:inline-block;padding-left:24px}.interview-question-sub{padding-left:22px}.interview-question strong{color:#00c2b3}.interview-question-sub strong{color:#00c2b3}.interview-score strong{color:#00c2b3}.interview-score-result strong{color:#00c2b3}.interview-question-sub .interview-des-content{padding-left:34px}.interview-score .interview-des-content{padding-left:21px}.interview-score-result p{margin:0;line-height:40px}.interview-score-result strong{font-size:16px}.text-base{font-size:14px}.wrap-viewer{width:95%;margin:0 auto}.ql-container{padding-bottom:50px}.ql-editor h1,.ql-editor h2,.ql-editor h3,.ql-editor h4,.ql-editor h5,.ql-editor h6,.ql-editor p{margin:0;padding:0;line-height:1.5}.item-table-wrap .table-viewer tr .title{padding: 12px 38px;font-weight: 700;}.item-table-wrap .table-viewer tr .content {padding: 20px 38px;padding-top: 0;}</style>`;
/* pdf样式 */
export const evaluationStyle = `<style>body{font-family:"Microsoft YaHei",微软雅黑,"MicrosoftJhengHei";font-size:14px;}*{-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-tap-highlight-color:transparent;}body,div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,form,fieldset,legend,input,textarea,p,blockquote,th,td,hr,button,article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{margin:0;padding:0;}body{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;}html,body{height:100%;-webkit-overflow-scrolling:touch;}*:before,*:after{box-sizing:border-box;-webkit-box-sizing:border-box;}li,ol,ul{list-style:none;}img{border:none;}table{border-collapse:collapse;}button,input,select,textarea{font-family:inherit;font-size:inherit;line-height:inherit;}input::-ms-clear,input::-ms-reveal{display:none;}button,input[type="button"],input[type="number"],input[type="search"],input[type="submit"],input[type="tel"],input[type="text"],textarea{-webkit-appearance:none;}a:active,a:focus,a:hover,button,input,textarea{outline:0;}.clearfix:after{content:"";display:block;overflow:hidden;visibility:hidden;clear:both;}.clear{clear:both;display:block;line-height:0;font-size:0;height:0;visibility:hidden;}body::-webkit-scrollbar-track-piece{background-color:#F1F1F1;border-radius:0;-webkit-border-radius:0;}body::-webkit-scrollbar{width:4px;height:4px;}body::-webkit-scrollbar-thumb{height:50px;background-color:#ddd;border-radius:10px;}body::-webkit-scrollbar-thumb:hover{height:50px;background-color:#ccc;}body::-webkit-scrollbar-corner{background-color:#F1F1F1;}.box{width:100%;height:100%;margin:0px auto;}.content-box{min-width:940px;margin-bottom:10px;padding:10px;white-space:pre-wrap;}.name-box{width:100%;}.line-overflow{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}.evaluation-form{margin:0 auto;width:940px;border:1px solid #D7D7D7;color:#161B26;}.evaluation-content{border:1px solid #D7D7D7;border-bottom:0;width:920px;margin:10px auto;}.evaluation-content .header-title{width:100%;height:78px;font-size:20px;font-weight:500;line-height:78px;text-align:center;}.evaluation-content .main-ul{width:100%;}.evaluation-content .main-li >.com-title{background-color:#BFE8EA;border-bottom:1px solid #BFE8EA;color:#000;height:54px;line-height:54px;text-align:center;font-size:16px;font-weight:500;margin-top:-1px;}.item-table-wrap{width:100%;}.item-table-wrap ul{width:100%;overflow:auto}.item-table-wrap ul li{width:50%;float:left;border-bottom:1px solid #D7D7D7;height:44px;font-size:14px;line-height:20px;}.item-table-wrap ul li .com-title{width:30%;float:left;height:100%;color:#646F79;line-height:44px;text-align:center;border-right:1px solid #D7D7D7;padding-left:30px;text-align:left;}.item-table-wrap ul li .com-content{padding-left:40px;width:70%;font-weight:500;line-height:44px;height:44px;text-align:left;}.item-table-wrap ul li:nth-child(2n+1) .com-content{border-right:1px solid #D7D7D7;}.item-text-wrap li{border-bottom:1px solid #D7D7D7;padding:20px 40px}.item-text-wrap .com-title{font-size:16px;font-weight:500;line-height:22px;position:relative;text-align:left;color:#000;}.item-text-wrap .com-title .num{position:absolute;left:-20px;top:0;}.item-text-wrap .com-content{white-space:pre-wrap;margin-top:10px;font-size:14px;line-height:24px;text-align:left;word-break:break-all;}.item-text-wrap .com-content .question-one{white-space:pre-wrap;word-break:break-all;}.item-radio-wrap{height:44px;border-bottom:1px solid #D7D7D7;font-size:14px;line-height:20px;}.item-radio-wrap .com-title{width:135px;height:100%;color:#646F79;border-right:1px solid #D7D7D7;line-height:44px;float:left;padding-left:20px;}.item-radio-wrap .com-content{padding-top:11px;width:85%;height:100%;color:#212121;float:left;padding-left:30px;}.item-radio-wrap .com-content label{margin-right:20px;}.item-radio-wrap .com-content input{margin-right:12px;}.item-radio-wrap .input-opts .ico{display:inline-block;width:14px;height:14px;border:1px solid rgba(216,216,216,1);margin-right:10px;position:relative;}.item-radio-wrap .input-opts .active i{display:inline-block !important;}.item-radio-wrap .radio .ico{border-radius:7px;position:relative;top:2px;}.item-radio-wrap .radio .ico.active{border:1px solid #5DD5C8;}.item-radio-wrap .radio .ico i{display:none;position:absolute;width:8px;height:8px;border-radius:50%;top:50%;left:50%;margin-left:-4px;margin-top:-4px;background:#5DD5C8;}.item-radio-wrap .input-opts span{display:inline-block;height:20px;font-size:14px;font-family:PingFangSC-Regular,PingFang SC;font-weight:400;color:rgba(33,33,33,1);line-height:20px;}.resign-wrap .item-text-wrap li{padding:20px 30px;}.resign-wrap .item-text-wrap .com-title{font-size:14px;line-height:20px;color:#000;}.resign-wrap .item-text-wrap .com-content{font-size:13px;line-height:24px;word-break:break-all;}.item-radio-resign{padding:20px 30px;font-size:14px;line-height:20px;border-bottom:1px solid #D7D7D7;}.item-radio-resign .com-title{font-weight:500;margin-bottom:17px;position:relative;text-align:left;color:#000;}.item-radio-resign .com-title .num{position:absolute;left:-20px;top:0%;}.item-radio-resign .com-content .check-input{white-space:pre-wrap;padding-left:24px;margin:6px 0;text-align:left;}.item-radio-resign .com-content li{text-align:left;}.item-radio-resign .com-content li:not(:last-child){margin-bottom:24px;}.item-radio-resign li label{display:inline-block;position:relative;}.item-radio-resign li label .ico{position:absolute;left:0;top:3px;}.item-radio-resign li input{margin-right:10px;}.item-radio-resign li .input-opts .ico{display:inline-block;width:14px;height:14px;border:1px solid #DFDFDF;margin-right:10px;position:relative;top:2px;}.item-radio-resign li .input-opts .ico.active{border-color:#5DD5C8;}.item-radio-resign li .input-opts .ico.active + span{color:#000;}.item-radio-resign li .input-opts .ico.active i{display:inline-block !important;}.item-radio-resign li .radio .ico{border-radius:7px;}.item-radio-resign li .checkbox .ico{border-radius:2px;}.item-radio-resign li .radio .ico i{display:none;width:8px;height:8px;position:absolute;border-radius:50%;top:50%;left:50%;margin-left:-4px;margin-top:-4px;background-color:#5DD5C8;}.item-radio-resign li .checkbox .ico i{display:none;position:absolute;width:14px;height:14px;position:absolute;border-radius:2px;top:-1px;left:-1px;background:url('https://joinus.zhipin.com/api/config/noah/img?key=/beijin/noah/upload/image/20200901/61e84bd81d9328569391fad55b743680-16d12f3ac12cc77fwHT-TKSCV5zMoVsR.png') no-repeat center;background-size:100%;}.item-radio-resign li .input-opts span{display:inline-block;height:20px;font-size:14px;font-family:PingFangSC-Regular,PingFang SC;font-weight:400;color:rgba(33,33,33,1);line-height:20px;}.item-matrix-wrap .com-title{padding:12px 30px;height:44px;font-size:14px;font-weight:500;line-height:20px;border-bottom:1px solid #D7D7D7;position:relative;text-align:left;color:#000;margin-top:12px;padding-top:0px;height:32px;}.item-matrix-wrap .com-title .num{position:absolute;left:10px;top:0%;}.item-matrix-wrap li{border-bottom:1px solid #D7D7D7;padding:13px 30px 13px 70px;}.item-matrix-wrap .item-title{font-size:14px;font-weight:500;line-height:20px;position:relative;text-align:left;color:#000;}.item-matrix-wrap .item-title .item-num{position:absolute;left:-40px;top:0;}.item-matrix-wrap .item-content{white-space:pre-wrap;margin-top:10px;font-size:13px;line-height:24px;text-align:left;}.item-title-wrap{height:54px;background-color:#BFE8EA;border-bottom:1px solid #BFE8EA;color:#000;font-size:14px;font-weight:500;line-height:54px;text-align:center;margin-top:-1px;}.item-score-wrap .com-title{padding:16px 30px;border-bottom:1px solid #D7D7D7;text-align:left;}.item-score-wrap .com-title >p{font-size:14px;line-height:20px;}.item-score-wrap .com-title >p:not(:last-child){margin-bottom:8px}.item-score-wrap .com-content{text-align:left;}.item-score-wrap .question{border-bottom:1px solid #D7D7D7;padding:16px 30px;}.item-score-wrap .question .ques-title{font-size:14px;font-weight:500;line-height:20px;position:relative;color:#000;}.item-score-wrap .ques-title .num{position:absolute;left:-20px;top:0;}.item-score-wrap .question .ques-content{margin-top:20px;}.item-score-wrap .ques-content >p{font-size:14px;line-height:20px;}.item-score-wrap .ques-content >p:not(:last-child){margin-bottom:20px;}.item-score-wrap .score{height:44px;border-bottom:1px solid #D7D7D7;padding-left:30px;}.item-score-wrap .score li{float:left;width:32px;height:32px;border-radius:50%;border:1px solid #D8D8D8;font-size:20px;font-family:DINAlternate-Bold,DINAlternate;font-weight:bold;color:#808080;text-align:center;line-height:32px;margin-right:13px;}.item-score-wrap .score .score-active{background:#ACAFB9;border:1px solid #ACAFB9;color:#fff;}.item-score-wrap .score p{font-size:13px;line-height:40px;}.item-score-wrap .score .active{color:#00C2B3;font-size:16px;}.item-content{word-break:break-all;}.table-viewer{width:100%;border-collapse:collapse;}.table-viewer td{height:44px;border:none;border-right:1px solid #D7D7D7;border-bottom:1px solid #D7D7D7;}.table-viewer td.last{border-right:none;}.table-viewer .label{padding:0 20px;color:#646f79;}.table-viewer .value{padding:0 30px;font-weight:500;}.item-table-wrap .table-viewer tr .title{padding: 12px 38px;font-weight: 700;}.item-table-wrap .table-viewer tr .content {padding: 20px 38px;padding-top: 0;}</style>`;

export const evaluationStyleV2 = `* {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
}

body, div, dl, dt, dd, ul, ol, li, h1, h2, h3, h4, h5, h6, form, fieldset, legend, input, textarea, p, blockquote, th, td, hr, button, article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section {
    margin: 0;
    padding: 0;
}
body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

*:before,
*:after {
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
}

li, ol, ul {
    list-style: none;
}

img {
    border: none;
}

table {
    border-collapse: collapse;
}

button, input, select, textarea {
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
}

input::-ms-clear, input::-ms-reveal {
    display: none;
}

button, input[type="button"], input[type="number"], input[type="search"], input[type="submit"], input[type="tel"], input[type="text"], textarea {
    -webkit-appearance: none;
}

html, body {
    height: 100%;
}
.clearfix:after {
    content: "";
    display: block;
    overflow: hidden;
    visibility: hidden;
    clear: both;
}

.clear {
    clear: both;
    display: block;
    line-height: 0;
    font-size: 0;
    height: 0;
    visibility: hidden;
}

body ::-webkit-scrollbar-track-piece {
    background-color: #F7F7F7;
    border-radius: 0;
    -webkit-border-radius: 0;
}

body ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
}

body ::-webkit-scrollbar-thumb {
    height: 50px;
    background-color: #ddd;
    border-radius: 10px;
}

body ::-webkit-scrollbar-thumb:hover {
    height: 50px;
    background-color: #ccc;
}
body ::-webkit-scrollbar-corner {
    background-color: #F7F7F7;
}

.bossui-new .text-primary {
    color: #00A6A7;
}
.template-preview .tmp-form-type-remark {
    font-size: 18px;
    text-align: center;
    font-weight: 500;
    color: #1D2129;
    line-height: 26px;
    background: #F7F8FA;
    padding: 0;

}
.template-preview .radio, .template-preview .checkbox {
    pointer-events: none;
}
.template-preview .ui-table td, .template-preview .ui-table th {
    font-size: 14px;
}
.radio {
  display: inline-block;
  margin-right: 20px;
  white-space: nowrap;
  position: relative;
  line-height: 1;
  vertical-align: middle;
  cursor: pointer;
}
.radio:last-of-type {
  margin-right: 0;
}
.radio-inner {
  display: inline-block;
  width: 14px;
  height: 14px;
  position: relative;
  vertical-align: middle;
  margin-right: 4px;
  margin-top: -3px;
  background-color: #fff;
  border: 1px solid #e3e7ed;
  border-radius: 50%;
  transition: all 0.2s ease-in-out;
}
.radio-inner:after {
    position: absolute;
    width: 8px;
    height: 8px;
    left: 2px;
    top: 2px;
    border-radius: 6px;
    display: table;
    border-top: 0;
    border-left: 0;
    content: ' ';
    background-color: #5DD5C8;
    opacity: 0;
    transition: all 0.2s ease-in-out;
    transform: scale(0);
}
.radio-edging {
  position: relative;
  top: 0;
  left: 0;
  display: block;
  width: 12px;
  height: 12px;
  background-color: #fff;
  border-radius: 100%;
}
.radio-edging:after {
  transform: rotate(45deg);
  position: absolute;
  left: 3px;
  top: 3px;
  display: table;
  width: 6px;
  height: 6px;
  border: 2px solid #fff;
  border-top: 0;
  border-left: 0;
  content: '';
  border-radius: 100%;
}
.radio-input {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
  opacity: 0;
  cursor: pointer;
}
.radio-focus {
  box-shadow: 0 0 0 2px rgba(93, 213, 200, 0.2);
  z-index: 1;
}
.radio-checked .radio-inner {
  border-color: #5DD5C8;
}
.radio-checked .radio-inner:after {
  opacity: 1;
  transform: scale(1);
  transition: all 0.2s ease-in-out;
}
.radio-group-vertical .radio-item {
  padding: 10px 0;
  width: fit-content;
  display: block;
}
.radio-group-rectangle .radio-item {
  display: inline-block;
  border: 1px #e3e7ed solid;
  background-color: #fff;
  line-height: 36px;
  min-width: 148px;
  text-align: center;
  cursor: pointer;
  color: #9fa3b0;
}
.radio-group-rectangle .radio-item .radio-inner {
  display: none;
}
.radio-group-rectangle .radio-disabled {
  background-color: #f7f7f7;
  border-color: #e3e7ed;
  box-shadow: none;
  cursor: default;
}
.radio-group-rectangle .radio-checked {
  border-color: #18c3b1;
  color: #18c3b1;
  background-color: #effbfa;
}
.checkbox {
  display: inline-block;
  margin-right: 20px;
  white-space: nowrap;
  position: relative;
  line-height: 1;
  vertical-align: middle;
  cursor: pointer;
}
.checkbox:last-of-type {
  margin-right: 0;
}
.checkbox-inner {
  display: inline-block;
  width: 14px;
  height: 14px;
  position: relative;
  vertical-align: middle;
  margin-right: 4px;
  margin-top: -3px;
  background-color: #fff;
  border: 1px solid #e3e7ed;
  border-radius: 2px;
}
.checkbox-edging {
  position: relative;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: all 0.2s ease-in-out;
  transform: scale(0);
}
.checkbox-edging:after {
  content: '';
  position: absolute;
  left: 3px;
  display: none;
  transform: rotate(45deg);
  top: 0;
  width: 6px;
  height: 10px;
  border: 2px solid #fff;
  border-top: 0;
  border-left: 0;
}
.checkbox-input {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
  opacity: 0;
  cursor: pointer;
}
.checkbox-focus {
  box-shadow: 0 0 0 2px rgba(93, 213, 200, 0.2);
  z-index: 1;
}
.checkbox-checked .checkbox-inner {
  border-color: #5DD5C8;
}
.checkbox-checked .checkbox-edging {
  background: #5DD5C8;
  opacity: 1;
  transition: all 0.2s ease-in-out;
  transform: scale(1);
}
.checkbox-checked .checkbox-edging:after {
  display: table;
}
.checkbox-indeterminate .checkbox-inner {
  border-color: #5DD5C8;
}
.checkbox-indeterminate .checkbox-edging {
  background: #5DD5C8;
  opacity: 1;
  transition: all 0.2s ease-in-out;
  transform: scale(1);
}
.checkbox-indeterminate .checkbox-edging:after {
  display: table;
  width: 10px;
  height: 2px;
  top: 5px;
  left: 1px;
  transform: rotate(0deg);
  background-color: #fff;
}

table {
    border-collapse: collapse;
}
.ui-table {
    margin-top: 0;
    background-color: #fff;
}
.ui-table th {
    background-color: #F2f3f5;
    font-weight: 500;
    color: #1D2129;
    font-size: 14px;
}
.ui-table td {
    font-size: 13px;
    padding: 5px;
    height: 40px;
    font-weight: normal;
    text-align: left;
    border-bottom: 1px #EEF0F5 solid;
}
.ui-table-border {
    border: 1px #EEF0F5 solid;
}
.ui-table-border > table {
    margin-left: -1px;
    margin-bottom: -1px;
}
.ui-table table {
    width: 100%;
    table-layout: fixed;
}
.ui-table th:first-of-type {
    padding-left: 10px;
}
.ui-table th:first-of-type, .ui-table td:first-of-type {
    padding-left: 15px;
}
.ui-table-pro td, .ui-table-pro th.is-leaf, .ui-table th, .ui-table td {
    border-color: #E0E6E8;
}

.ui-table th, .ui-table td {
    font-size: 13px;
    padding: 5px;
    height: 40px;
    font-weight: normal;
    text-align: left;
    border-bottom: 1px #EEF0F5 solid;
}
.ui-table th, .ui-table td {
    line-height: 20px;
}
.ui-table th {
    height: 50px;
    color: #646F79;
    background-color: #FBFBFC;

}
.ui-table-border th, .ui-table-border td {
    border-left: 1px #EEF0F5 solid;
}
.ui-table th:first-of-type, .ui-table td:first-of-type {
    padding-left: 15px;
}
.ui-table td:first-of-type {
    padding-left: 10px;
}
.template-preview .ui-table td, .template-preview .ui-table th {
    padding: 3px 12px;
}
.template-preview .ui-table td, .ui-table th {
    height: 40px;
}

.ui-table td {
    line-height: 23px;
    padding: 12px 0;
}

.tmp-form .tmp-form-item {
    margin-bottom: 40px;
    position: relative;
}
.tmp-form .tmp-group-interview-evaluation .radio-group {
    display: inline-block;
}
.tmp-form .tmp-group-interview-evaluation .radio-group .radio {
    vertical-align: baseline;
}
.template-preview .tmp-form .tmp-group-interview-evaluation {
    margin-top: 0;
}
.tmp-form .tmp-form-type-remark {
    padding-top: 12px;
}
.tmp-form .tmp-group-interview .interview-item {
    display: inline-block;
}

.template-preview  .tmp-form .tmp-group-interview .interview-item {
    background-color: #effafa;
}


.tmp-form .p-l-32 {
    padding-left: 32px;
}

.tmp-form .tmp-group-interview .interview-item-title {
    display: inline-block;
    margin-right: 6px;
    color: #1D2129;
}
.template-preview .tmp-form .tmp-group-interview .interview-item-title {
    font-weight: 500;
}
.tmp-form .tmp-group-interview .interview-item-content {
    display: inline-block;
}
.tmp-form .tmp-form-item-wrapper {
    margin-bottom: 13px;
}
.tmp-form .tmp-form-item-title {
    font-size: 16px;
    color: #1D2129;
    line-height: 22px;
    font-weight: 400;
    margin-bottom: 6px;
}
.tmp-form-item-sort {
    margin-right: 4px;
    display: inline-block;
    min-width: 26px;
    padding-left: 8px;
    position: relative;
    min-height: 22px;
    vertical-align: top;
}
.tmp-form .tmp-form-item-content {
    margin-left: 32px;
    padding-right: 12px;
}

.tmp-form .radio-option-item {
    padding: 4px 0;
}

.tmp-form .radio-option-item .option-item-content {
    min-height: 28px;
    line-height: 28px;
}
.tmp-form .radio-option-item .option-item-content .checkbox {
    white-space: normal;
}
.tmp-form .tmp-radio .radio-item, .tmp-form .tmp-checkbox .radio-item, .tmp-form .tmp-radio .checkbox-item, .tmp-form .tmp-checkbox .checkbox-item {
    margin-right: -8px;
}
.tmp-form .radio-option-item .radio {
    line-height: 28px;
    white-space: normal;
}

.attachment-list {
    max-width: 200px;
    position: relative;
}
.tmp-form .form-attachment .attachment-list .attachment-list-content {
    display: flex;
    justify-content: space-between;
    padding-left: 12px;
    width: 360px;
    background: #F7F8F9;
    margin-top: 10px;
    line-height: 36px;
    height: 36px;
    background: #F7F8FA;
    border-radius: 2px;
}

.tmp-form .form-attachment .attachment-list .attachment-name {
    position: relative;
    display: flex;
    align-items: center;
}

.tmp-form .form-attachment .attachment-list .attachment-name .svg-icon {
    display: none;
}

.tmp-form .form-attachment .attachment-list .attachment-name .attachment-title {
    font-size: 14px;
    color: #24272E;
    display: inline-block;
    max-width: 260px;
    margin-left: 8px;
}
.nari-tooltip .tooltip {
    display: inline-block;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    width: 100%;
}
.tmp-form .form-attachment .attachment-list .attachment-name .attachment-title .tooltip {
    vertical-align: bottom;
}
.attachment-operation {
    display: none;
}
.tmp-form .tmp-columns .tmp-form-item {
    display: inline-block;
    vertical-align: top;
}
.tmp-form .temp-relation-interview-single .tmp-form-item-wrapper {
    margin-bottom: 10px;
}
.tmp-form .temp-relation-interview-single .tmp-form-item-title {
    font-size: 14px;
    color: #86909C;
}
.tmp-form .tmp-form-item-sort {
    margin-right: 4px;
    display: inline-block;
    min-width: 26px;
    padding-left: 8px;
    position: relative;
    min-height: 22px;
    vertical-align: top;
}
.tmp-form .tmp-group-interview-evaluation {
    margin-top: 32px;
}
.tmp-form .p-l-32 {
    padding-left: 32px;
}
.tmp-form .tmp-group-interview .interview-item-title {
    display: inline-block;
    margin-right: 6px;
    color: #1D2129;
}

.tmp-form .tmp-group-interview .interview-item {
    display: inline-block;
}
.tmp-form .score-list {
    margin: 11px 0 0 0;
    display: inline-block;
    user-select: none;
}

.tmp-form .score-list > li {
    width: 40px;
    height: 40px;
    background: #FFFFFF;
    border: 1px solid #E5E6EB;
    line-height: 40px;
    text-align: center;
    border-radius: 20px;
    display: inline-block;
    margin-right: 18px;
    cursor: pointer;
}
.tmp-form .score-list>li.acitve {
    color: #00bebd;
    border-color: #00bebd;
}
.multiple-row-table-title {    
    font-size: 14px;
    color: #86909C;
    font-weight: 400;
    margin: 10px 0;
}
.tmp-form .tmp-relation-multiple .multiple-row-table-content {
    font-size: 14px;
    margin-bottom: 30px;
}
.tmp-form .tmp-relation-multiple .tmp-form-item-content {
    padding: 0 26px;
    margin-left: 0;
}
.attachment-type {
        width: 16px;
        height: 16px;
    }
.interview-evaluation-content {
    margin: 0 auto;
}

.preview-title {
    font-family: PingFangSC-Semibold, PingFang SC;
    height: 72px;
    line-height: 72px;
    background: #FFFFFF;
    border: 1px solid #e5e6eb;
    border-radius: 4px 4px 0px 0px;
    border-bottom: 0;
    font-size: 20px;
    font-weight: 600;
    color: #13141A;
    text-align: center;
    width: 944px;
    margin: 0 auto;
}
.interview-evaluation-content {margin: 0 auto;}

.template-preview {
    font-size: 14px;
    color: #151B26;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    background-color: #ffffff;
    word-break: break-all;
    word-wrap: break-word;
    font-family: "PingFang SC", "Lantinghei SC", "Microsoft YaHei", Helvetica Neue, Open Sans, Arial, "Hiragino Sans GB", "HanHei SC", "STHeiti", sans-serif;
    border: 1px solid #e5e6eb;
    border-top: none;
    border-radius: 0px 0px 4px 4px;
    overflow: hidden;
    width: 944px;
    margin: 0 auto;
}
.template-preview .tmp-form .ui-table-empty-block {
    min-height: 80px;
}
.template-preview .ui-table-border > table {
    border-radius: 4px;
    overflow: hidden;
}
.tmp-form .ui-table {
    border-radius: 4px;
}
.template-preview  .tmp-form .tmp-group-interview .tmp-group-interview-content {
    border-radius: 0;
    border: none;
    padding: 0;
}
.template-preview .tmp-columns .tmp-form{
    display: flex;
    flex-wrap: wrap;
}
.template-preview .tmp-columns .tmp-form-item {
    position: relative;
    border-top: none;
}
.template-preview  .div, li, input, label {
    cursor: default !important;
}

.template-preview .tmp-columns .tmp-form-item:before {
    position: absolute;
    top: 0;
    left: 0;
    width: 950px;
    content: '';
    display: block;
    background: #e5e6eb;
    height: 1px;
    z-index: 1;
}
.template-preview .tmp-columns .tmp-form-item::after {
    position: absolute;
    top: 0;
    right: -1px;
    width: 1px;
    content: '';
    display: block;
    background: #e5e6eb;
    height: 100%;
}
.template-preview .tmp-form .tmp-form-item {
    margin-bottom: 0;
}
.template-preview .tmp-form .tmp-form-item.tmp-form-type-columns {

}


.template-preview .tmp-fill .tmp-form-item-content {
    white-space: pre-line;
}

.template-preview .tmp-form-item {
    position: relative;
    padding: 24px 0;
}
.template-preview .tmp-form-item.tmp-form-type-group-interview {
    padding: 0;
}
.template-preview .tmp-form-type-group-interview .interview-item-title, .template-preview .tmp-form-type-group-interview .interview-item-content{
    padding: 10px 0;
}
.template-preview .tmp-group-interview-content {

}
.b-t {
    position: relative;
}
.template-preview .tmp-form-item:before, .b-t:before {
    position: absolute;
    top: 0;
    left: 0;
    width: 950px;
    content: '';
    display: block;
    background: #e5e6eb;
    height: 1px;
    z-index:1;
}

.template-preview .temp-relation-interview-single, .template-preview .tmp-relation-multiple {
    
}
.template-preview .tmp-form-item.tmp-form-type-columns {
    padding-top: 0;
    padding-bottom: 0;
}
.template-preview .tmp-form-item.tmp-form-type-columns:before {
    display: none;
}
.template-preview .interview-item {
    width: 50%;
    position: relative;;
}
.template-preview .b-r:after {
    position: absolute;
    top: 0;
    right: -1px;
    width: 1px;
    content: '';
    display: block;
    background: #e5e6eb;
    height: 100%;
    z-index:1;
}
.template-preview .tmp-form .tmp-group-interview .interview-item + .interview-item {
    margin-left: 0;
}

.template-preview .tmp-form-type-remark {
    font-size: 18px;
    text-align: center;
    font-weight: 500;
    color: #1D2129;
    line-height: 26px;
    background: #F7F8FA;
    padding: 0;
}
.template-preview .tmp-form-type-remark .tmp-form-item-sort {
    display: none;
}
.template-preview  .tmp-form .tmp-form-type-remark {
    padding-top: 12px;
    padding-bottom: 12px;
}
.template-preview .tmp-form-type-remark .tmp-form-item-title {
    margin-bottom: 0;
}
.template-preview .tmp-form-type-remark .tmp-form-item-wrapper {
    margin-bottom: 0;
}

.interview-pdf .ui-table th {
     width: auto;
}
.template-preview .tmp-form .tmp-group-interview .tmp-group-interview-target-title {
    display: flex;
    background-color: #F6F7FB;
    border-top: 1px solid #e5e6eb;
}
.template-preview .tmp-group-interview-target-wrapper {
    display: inline;
}
.template-preview .tmp-form .tmp-group-interview .tmp-group-interview-target-title > div {
    display: inline-flex;
    padding: 10px 0px 10px 10px;
}
.template-preview .tmp-form .tmp-group-interview  .target-info-no-data {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    color: #8B8E99;
}
.template-preview .tmp-form .tmp-group-interview .tmp-group-interview-target-content {
    display: flex;
    border-top: 1px solid #E5E6EB;
}
.template-preview .tmp-form .tmp-group-interview .tmp-group-interview-target-content .target-result-item .target-result-content + div {
    border-left: 1px solid #E5E6EB;
}

.template-preview .tmp-form .tmp-group-interview .tmp-group-interview-target-content div.target-result {
    padding: 0;
}
.template-preview .tmp-form .tmp-group-interview .tmp-group-interview-target-content .target-main-title, .template-preview .tmp-form .tmp-group-interview .tmp-group-interview-target-content .target-result {
    padding: 10px 20px;
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
}
.template-preview .tmp-form .tmp-group-interview .tmp-group-interview-target-content .target-title {
    font-size: 14px;
    color: #00A6A7;
    line-height: 20px;
    margin-bottom: 4px;
}
.template-preview .tmp-form .tmp-group-interview .tmp-group-interview-target-content .target-content {
    color: #1D2129;
    line-height: 20px;
}
.template-preview .tmp-form .tmp-group-interview .tmp-group-interview-target-content .target-result-item {
    display: flex;
    padding: 0;
    flex: 1;
}
.template-preview .tmp-form .tmp-group-interview .tmp-group-interview-target-content .target-result-item .target-result-content {
    padding: 10px 20px;
    justify-content: center;
    display: flex;
    flex-direction: column;
    white-space: pre-line;
}
.template-preview .tmp-form .tmp-group-interview .tmp-group-interview-target-content .target-main-title + div, .tmp-form .tmp-group-interview .tmp-group-interview-target-content .target-result + div {
    border-left: 1px solid #E5E6EB;
}
.template-preview .tmp-form .tmp-group-interview .tmp-group-interview-target-content .target-result > div + div {
    border-top: 1px solid #E5E6EB;

}
`;


