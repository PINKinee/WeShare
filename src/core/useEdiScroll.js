import ediStore from '@/store/codemirror'
export default () => {
    if (ediStore().scrollPlace == 'edi') {
        const editor = ediStore().md;
        // 全部dom
        const allDom = document.querySelectorAll(`.richText-middle > [line]`);
        // 预览dom
        const preview = document.querySelector('.richText-middle');
        // dom对应右边行的信息
        const lines = [];
        // 当预览区有出现滚动条时才需要滚动
        if (preview.clientHeight < preview.scrollHeight) {
            allDom.forEach(el => {
                lines.push(parseInt(el.getAttribute('line')));
            })
            // 编辑区滚动信息
            const editorScrollInfo = editor.getScrollInfo();
            const scrollHeight = editorScrollInfo.top;// 编辑区卷去的高度
            if (editorScrollInfo.clientHeight + Math.ceil(editorScrollInfo.top) ===
                editorScrollInfo.height) {
                // 到底了直接让右边预览也到底部
                let clientHeight = preview.clientHeight;
                let scrollHeight = preview.scrollHeight;
                preview.scrollTo(0, scrollHeight - clientHeight);
            } else {
                let cur = 0;
                // 找到当前的行数
                for (let i = 0; i < lines.length; i++) {
                    let h = editor.heightAtLine(i, "local");
                    if (h < scrollHeight) {
                        continue;
                    } else if (h == scrollHeight) {
                        cur = i;
                        break;
                    } else {
                        cur = i - 1;
                        break;
                    }
                }
                if (cur < 0) cur = 0;
                // 获取当前编辑块的高度
                const ediH = editor.heightAtLine(lines[cur + 1], 'local') - editor.heightAtLine(lines[cur], 'local');
                // 获取当前编辑块被卷去的高度
                const ediHN = scrollHeight - editor.heightAtLine(lines[cur], 'local');
                // 获取当前预览块的高度
                const preH = allDom[cur].getBoundingClientRect().height;
                preview.scrollTo(0, (ediHN * preH / ediH) + allDom[cur].offsetTop);
            }
        }
    }
}