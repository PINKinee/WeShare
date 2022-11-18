// 当预览区滚动时，编辑区一起滚动
import ediStore from '@/store/codemirror'
import { toRaw } from 'vue';
export default () => {
    if (ediStore().scrollPlace == 'pre') {
        const editor = toRaw(ediStore().editor);
        // 全部dom
        const allDom = document.querySelectorAll(`.richText-middle > [line]`);
        // 预览dom
        const preview = document.querySelector('.richText-middle');
        // 编辑区滚动信息
        const editorScrollInfo = editor.getScrollInfo();
        // 预览卷去的高度
        const preScrollHeight = preview.scrollTop;
        // 当编辑区有出现滚动条时才需要滚动
        if (editorScrollInfo.clientHeight < editorScrollInfo.height) {
            if (allDom.length > 0) {
                let i = 0;
                // 找到预览区当前最顶端的元素
                let el;
                for (; i < allDom.length; i++) {
                    el = allDom[i];
                    if (preScrollHeight <= el.offsetTop + el.offsetHeight) {
                        break;
                    } else {
                        continue;
                    }
                }
                el = allDom[i];
                // 预览被卷去的高度
                const preHS = preScrollHeight - el.offsetTop;
                // 预览当前元素的高度
                const preH = el.offsetHeight;
                // 获取当前元素的行高
                const numNow = parseInt(el.getAttribute('line'));
                const numNext = parseInt(allDom[i + 1].getAttribute('line'));
                // 编辑当前元素的高度
                const ediH = editor.heightAtLine(numNext, 'local') - editor.heightAtLine(numNow, 'local');
                editor.scrollTo(0, (preHS * ediH / preH) + editor.heightAtLine(numNow, 'local'));
            } else {
                const preHeight = preview.scrollHeight;
                const ediHeight = editorScrollInfo.height;
                editor.scrollTo(0, ediHeight * preScrollHeight / preHeight);
            }
        }
    }
}