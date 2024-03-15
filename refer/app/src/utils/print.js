import Vue from 'vue';
import getLodop from '@/utils/LodopFuncs.js';

export default function ({url, brand, devicesCode, categoryName, assetNo}) {
    const LODOP = getLodop();

    if (!LODOP) {
        Vue.prototype.$toast({
            content: '请使用windows系统，并确保打印插件安装正确',
            type: 'warning'
        });
        return;
    }

    Vue.prototype.$toast({
        content: '打印中，请稍后',
        type: 'success'
    });

    let leftBarcode = '50';
    let leftTable = '5';
    // if (window.screen.width < 2000) { // 1920分辨率内的
    //     leftBarcode = 55;
    //     leftTable = -22;
    // }
    // 针对E480调试的版本
    /*LODOP.PRINT_INITA(-12, -9, 265, 189, '');
    LODOP.ADD_PRINT_BARCODE(15, 133, 120, 120, 'QRCode', `${url}`);
    LODOP.ADD_PRINT_TABLE(117, 45, 265, 100, `<style> table,td,th {width:265px;text-align:center;border:none;}</style><table border="0">\r\n<tr>\r\n  <td>${brand}</td>\r\n</tr>\r\n<tr>\r\n  <td>${devicesCode || categoryName}</td>\r\n</tr>\r\n<tr>\r\n  <td>${assetNo}</td>\r\n</tr>\r\n</table>`);*/
    // 针对E490调试的版本
    /*LODOP.PRINT_INITA(-12, -9, 265, 189, '');
    LODOP.ADD_PRINT_BARCODE(15, 96, 120, 120, 'QRCode', `${url}`);
    LODOP.ADD_PRINT_TABLE(112, 2, 265, 100, `<style> table,td,th {width:265px;text-align:center;border:none;}</style><table border=\"0\">\r\n<tr>\r\n  <td>${brand}</td>\r\n</tr>\r\n<tr>\r\n  <td>${devicesCode || categoryName}</td>\r\n</tr>\r\n<tr>\r\n  <td>${assetNo}</td>\r\n</tr>\r\n</table>`);*/
    // QRCodeVersion 7
    // LODOP.SET_PRINT_PAGESIZE(1, '40mm', '30mm', 'CreateCustomPage');
    LODOP.PRINT_INITA(0, 0, '40mm', '30mm', '');
    LODOP.ADD_PRINT_BARCODE('3', leftBarcode, '96px', '96px', 'QRCode', `${url}`);
    LODOP.SET_PRINT_STYLEA(0, 'QRCodeVersion', 5); //  1、2、3、5、7、10、14 版本号
    // LODOP.SET_PRINT_STYLEA(0, "NotOnlyHighPrecision", true);  // 低精度
    LODOP.SET_PRINT_STYLEA(0, 'QRCodeErrorLevel', 'L'); // L为低容错率7%，默认是M级容错率15%，最高级H级容错率是30%
    //LODOP.ADD_PRINT_HTML(110, 20, 300, 100, `<style>div{text-align:center; width:100%;border:0;margin:0 auto 5px;padding:0;}</style><div>${brand}</div><div>${devicesCode || categoryName}</div><div>${assetNo}</div>`);
    LODOP.ADD_PRINT_TABLE('76', leftTable, '160', '60px', `<style>table,td,div{text-align:center; width:160px;border:0;margin:0;padding:0 0 1px 0;font-size: 10px;color: #0D0D0D;}.large{font-size: 12px;font-weight: 500;}</style><table><td>${devicesCode || brand}</td></tr><tr class="large"><td>${assetNo}</td></tr></table>`);
    //LODOP.ADD_PRINT_TABLE(112, 2, '70mm', 100, `<style> table,td,th {width:265px;text-align:center;border:none;}</style><table border=\"0\">\r\n<tr>\r\n  <td>${brand}</td>\r\n</tr>\r\n<tr>\r\n  <td>${devicesCode || categoryName}</td>\r\n</tr>\r\n<tr>\r\n  <td>${assetNo}</td>\r\n</tr>\r\n</table>`);
    // LODOP.PREVIEW();  // 打印预览方法 可在调试的时候打开此方法 注释掉打印方法
    LODOP.PRINT();
};
