// 生成pdf文件并下载
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
const downloadImg = (url) => {
    const link = document.createElement('a')
    link.setAttribute('download', 'a')
    link.href = url;
    link.click();
}
// dom转图片
const domToImg = (dom) => {
    return new Promise(resolve => {
        html2canvas(dom, {
            scale: 4,
            useCORS: true,
            async: false,
            background: "transparent",
            dip: window.devicePixelRatio * 10, //处理模糊问题
        }).then((canvas) => {
            const pdfW = 555.28;
            const domW = document.querySelector('.richText-middle').getBoundingClientRect().width - 40;
            let w = canvas.width / 4 / domW * pdfW;
            let h = canvas.height * w / canvas.width;
            let imgUrl = canvas.toDataURL("image/jpeg");
            resolve({ url: imgUrl, width: w, height: h });
        })
    })
}
/* // 将图片dom转化为base64,以防部分图片无法下载
const createBase64 = (src) => {
    return new Promise(resolve => {
        const img = new Image();
        img.src = src;
        img.setAttribute("crossOrigin", 'use-credentials');
        img.onload = function () {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0); //将图片绘制到canvas中
            const url = canvas.toDataURL('image/jpg');
            resolve(url);
        }
    })
}
// 判断里面当前节点是否有图片
const judgeImg = async (dom) => {
    console.log(dom);
    const imgs = dom.getElementsByTagName('img');
    console.log(imgs);
    if (dom.nodeName == 'IMG') {
        dom.src = await createBase64(dom.src);
    }
    if (imgs.length > 0) {
        for (const i of imgs) {
            i.src = await createBase64(i.src);
        }
    }
    return dom;
} */
// 图片转pdf
async function imgToPdf(pdf, dom, heightSum) {
    const pdfH = 841.89;
    for (let i = 0; i < dom.length; i++) {
        // const cloneDom = judgeImg(dom[i]);
        const res = await domToImg(dom[i]);
        if (dom.length == 2)
            downloadImg(res.url);
        // 当前页面可放下
        if (heightSum - res.height >= 0) {
            pdf.addImage(res.url, 'jpeg', 20, pdfH - heightSum, res.width, res.height);
            heightSum -= res.height;
        } else {// 放不下了
            const domChildren = dom[i].children;
            // domChildren没有或者只有1 确实无法放下 新增一页 heightSum初始化
            if (domChildren.length < 2 || res.height < pdfH - 20) {
                // 一页可放下
                // if (res.height <= pdfH) {
                pdf.addPage();
                pdf.addImage(res.url, 'jpeg', 20, 20, res.width, res.height);
                heightSum = pdfH - res.height;
            } else {// 里面有子孩子说明可能可以放下
                imgToPdf(pdf, domChildren, heightSum);
            }
        }
    }
}
export default async (isTip) => {
    isTip.value = true;
    const dom = document.querySelector('.richText-middle').children;
    const pdf = new jsPDF('', 'pt', 'a4');
    const pdfH = 841.89 - 20;
    Promise.all([imgToPdf(pdf, dom, pdfH)]).then(() => {
        pdf.output('save', 'filename.pdf');
        isTip.value = false;
    })
}