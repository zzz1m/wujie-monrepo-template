const boxShadow = {
    shadowBlur: 11,
    shadowOffsetY: 4,
    shadowColor: 'rgba(0, 0,0,0.12)'
};

export const AnimationUtils = {
    // 动画计算缓动的函数
    easeInQuad(curtime,begin,end,duration){
        let x = curtime/duration; // x值
        let y = x*x; //y值
        return begin+(end-begin)*y; //套入最初的公式
    },
    easeOutQuad(curtime,begin,end,duration){
        let x = curtime/duration;         //x值
        let y = -x*x + 2*x;  //y值
        return begin+(end-begin)*y;        //套入最初的公式
    },
    easeInOutQuad(curtime,begin,end,duration){
        if(curtime<duration/2){ //前半段时间
            return this.easeInQuad(curtime,begin,(begin+end)/2,duration/2);//改变量和时间都除以2
        }else{
            let curtime1 = curtime-duration/2; //注意时间要减去前半段时间
            let begin1 = (begin+end)/2;//初始量要加上前半段已经完成的
            return this.easeOutQuad(curtime1,begin1,end,duration/2);//改变量和时间都除以2
        }
    }
};


export class CanvasUtils {
    width = 0
    height = 0
    evts = []
    el = null
    ctx = null
    scale = 1
    destroyList = []

    constructor(el, scale = 1) {
        if(!el) return;
        this.el = el;
        this.scale = scale;
        this.init(el);
    }
    

    init(el) {
        if(!el) return;
        this.ctx = el.getContext('2d');
        this.setSize(el.clientWidth, el.clientHeight);
    }
    setSize(w, h) {
        const dpr = window.devicePixelRatio * this.scale;
        this.width = w;
        this.height = h;
        this.el.width = w * dpr;
        this.el.height = h * dpr;
        this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        this.ctx.textBaseline = 'hanging';
        this.ctx.font = `400 12px PingFangSC-Regular, PingFang SC`;
    }
    destroy() {
        this.evts.forEach(t => {
            t.target.removeEventListener(t.type, t.fn, true);
        });

        this.destroyList.forEach(t => t ());
    }
    drawRoundRect(x, y, width, height, radius, arc = ['tl', 'tr', 'br', 'bl']){ 
        const tl = arc.includes('tl');
        const tr = arc.includes('tr');
        const br = arc.includes('br');
        const bl = arc.includes('bl');
        this.ctx.beginPath();   
        !tl && this.ctx.moveTo(x, y);
        tl && this.ctx.arc(x + radius, y + radius, radius, Math.PI, Math.PI * 3 / 2);   
        this.ctx.lineTo(tr? width - radius + x: x + width, y);   
        tr && this.ctx.arc(width - radius + x, radius + y, radius, Math.PI * 3 / 2, Math.PI * 2);   
        this.ctx.lineTo(width + x, br? height + y - radius: height + y);   
        br && this.ctx.arc(width - radius + x, height - radius + y, radius, 0, Math.PI * 1 / 2);   
        this.ctx.lineTo(bl? radius + x: x, height +y);   
        bl && this.ctx.arc(radius + x, height - radius + y, radius, Math.PI * 1 / 2, Math.PI);   
        this.ctx.closePath();   
    } 
    drawPoint(point, color, r, shadow = false, type = 'fill', lineWidth = 1) {
        this.ctx.save();
        this.ctx[`${type}Style`] = color;
        this.ctx.lineWidth = lineWidth;
        shadow && Object.assign(this.ctx, boxShadow);
        this.ctx.beginPath();
        this.ctx.arc(point[0], point[1], r, 0, Math.PI * 2);
        this.ctx.closePath();
        this.ctx[type]();
        this.ctx.restore();
    }
    drawLine(pathList, strokeStyle, lineWidth, lineDash) {
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.strokeStyle = strokeStyle;
        this.ctx.lineWidth = lineWidth || 1;
        lineDash && this.ctx.setLineDash(lineDash);
        for(let i = 0; i < pathList.length; i++) {
            this.ctx[i? 'lineTo': 'moveTo'](...pathList[i]);
        }
        this.ctx.stroke();
        this.ctx.closePath();
        this.ctx.restore();
    }
    drawArea(pathList, fillStyle) {
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.fillStyle = fillStyle;
        for(let i = 0; i < pathList.length; i++) {
            this.ctx[i? 'lineTo': 'moveTo'](...pathList[i]);
        }
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.restore();
    }
}
