

import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { get, post } from '@/services/http';
// html2canvas文档：http://html2canvas.hertzen.com/
// jsPDF文档： http://www.rotisedapsales.com/snr/cloud2/website/jsPDF-master/docs/jsPDF.html
// 博客： https://my.oschina.net/u/4300698/blog/3382445
/**
 * 
 * @param {String} htmlQuery css选择器
 * @param {String} name 文件名称
 */
export async function downLoadPdf(htmlQuery, name = +new Date(), top = 0) {
    name = name + '.pdf';
    let dom = document.querySelector(htmlQuery);
    let pdf = await getPdf(dom, false, top);
    pdf.save(name);
};

/**
 * 
 * @param {String} htmlQuery css选择器
 * @param {String} name 文件名称
 */
export async function upLoadFdf({
    htmlQuery, 
    name = +new Date(), 
    url = '/api/common/file/upload.json',
    top = 0
}) {
    name = name + '.pdf';
    let dom = document.querySelector(htmlQuery);
    let pdf = await getPdf(dom, false, top);
    let pdfBlob = pdf.output('blob');
    const formData = new FormData();
    formData.append('file', pdfBlob, name);
    formData.append('fileName', name);
    
    return await post(url, formData,
        { headers: { 'Content-Type': 'multipart/form-data'}}
    );
};

/**
 * @param html { String } DOM树
 * @param isSingle { Boolean }  是否为单页 默认 否(false)
 * @return 文件 {pdf格式}
 */
export async function getPdf(html, isSingle, top) {
    if (!html) {
        console.warn('要下载的PDF DOM不存在');
        return;
    }
    let contentWidth = html.clientWidth; // 获得该容器的宽
    let contentHeight = html.clientHeight; // 获得该容器的高

    let opts = {
        scale: 4, // 设置像素比
        useCORS: true,
        scrollX: 0,
        scrollY: 0 // 如果不配置，当页面滚动绘制的canvas会发生位置偏移
    };

    return html2canvas(html, opts).then(canvas => {
        let pageData = canvas.toDataURL('image/jpeg'); // 清晰度 0 - 1 canvas.toDataURL('image/jpeg', 1.0)
        let pdf;

        if (isSingle) {
            // 单页
            // jspdf.js 插件对单页面的最大宽高限制 为 14400
            let limit = 14400;

            if (contentHeight > limit) {
                let contentScale = limit / contentHeight;
                contentHeight = limit;
                contentWidth = contentScale * contentWidth;
            }

            let orientation = 'p';
            // 在 jspdf 源码里，如果是 orientation = 'p' 且 width > height 时， 会把 width 和 height 值交换，
            // 类似于 把 orientation 的值修改为 'l' , 反之亦同。
            if (contentWidth > contentHeight) {
                orientation = 'l';
            }
            // orientation Possible values are "portrait" or "landscape" (or shortcuts "p" or "l")
            pdf = new jsPDF(orientation, 'pt', [contentWidth, contentHeight]); // 下载尺寸 a4 纸 比例

            // pdf.addImage(pageData, 'JPEG', 左，上，宽度，高度)设置
            pdf.addImage(pageData, 'JPEG', 0, top, contentWidth, contentHeight);

        } else {
            //一页 pdf 显示 html 页面生成的 canvas高度
            let pageHeight = (contentWidth / 552.28) * 841.89;
            //未生成 pdf 的 html页面高度
            let leftHeight = contentHeight;
            //页面偏移
            let position = 0 + top;
            //a4纸的尺寸[595.28,841.89]，html 页面生成的 canvas 在pdf中图片的宽高
            let imgWidth = 555.28;
            let imgHeight = (imgWidth / contentWidth) * contentHeight;

            pdf = new jsPDF('', 'pt', 'a4');// 下载尺寸 a4 纸 比例
            //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
            //当内容未超过pdf一页显示的范围，无需分页
            if (leftHeight < pageHeight) {
                pdf.addImage(pageData, 'JPEG', 20, top, imgWidth, imgHeight);
            } else {
                while (leftHeight > 0) {
                    pdf.addImage(pageData, 'JPEG', 20, position, imgWidth, imgHeight);
                    leftHeight -= pageHeight;
                    position -= 841.89;
                    //避免添加空白页
                    if (leftHeight > 0) {
                        pdf.addPage();
                    }
                }
            }
        }
        return pdf;
    });
};


// 通过服务器获取pdf文件  https://api.weizhipin.com/project/2083/interface/api/273717

// 通过xhr下载pdf文件
export function downloadPDFXHR(contentOrUrl) {
    var data = JSON.stringify({
        content: contentOrUrl,
        sid: 1001
    });

    var xhr = new XMLHttpRequest();

    xhr.addEventListener('readystatechange', function (e) {
        if (this.readyState === 4) {
            downloadPDF(this.response);
        }
    });

    xhr.open('POST', 'https://pdf.weizhipin.com/nflow/zpnode/html2pdf');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.responseType = 'blob';

    xhr.send(data);
}

function downloadPDF(res) {
    let bl = new Blob([res], { type: 'application/pdf' });
    let fileName = 'file.pdf';
    var link = document.createElement('a');
    link.href = window.URL.createObjectURL(bl);
    link.download = fileName;
    link.click();
    window.URL.revokeObjectURL(link.href);
}
