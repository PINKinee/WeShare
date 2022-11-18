// 工具区方法
import { toRaw } from "vue";
import { getFileUrl } from '@/api/articleService';
import mdStore from '@/store/codemirror';
// 加粗斜体删除内嵌代码块
export const addBIDC = (symbol) => {
    const editor = toRaw(mdStore().editor);
    if (editor) {
        editor.replaceSelection(`${symbol}${editor.getSelection()}${symbol}`);
    }
};
// 标题 i代表标题几
export const addH = (i) => {
    const editor = toRaw(mdStore().editor);
    if (editor) {
        // 当前选择的内容
        const selContent = editor.getSelection();
        // 生成#字符串
        const repeat = (num, str) => {
            let res = str;
            for (let j = 0; j < num; j++) {
                res += str;
            }
            return res;
        };
        const s = repeat(i, "#");
        // 选择内容为空 说明整行都要替换掉
        if (selContent == "") {
            // 获取当前光标在的行号
            const lineNum = editor.getCursor().line;
            // 获取当前光标在的行内容
            let line = editor.getLine(lineNum);
            // 为了去掉# 本来是一级标题是 变二级标题
            line = line.replace(/^#{1,6} /, "");
            // 替换内容
            editor.replaceRange(
                `${s} ${line}`,
                { line: lineNum, ch: 0 },
                { line: lineNum, ch: line.lenght }
            );
        } else {
            editor.replaceSelection(`\n${s} ${selContent}\n`);
        }
    }
};
// 无序列表
export const addOl = () => {
    const editor = toRaw(mdStore().editor);
    if (editor) {
        // 获取当前光标在的行号
        const lineNum = editor.getCursor().line;
        editor.replaceRange(`- `, {
            line: lineNum,
            ch: 0,
        });
        // 获取当前光标在的行内容
        let line = editor.getLine(lineNum);
        editor.setSelection({ line: lineNum, ch: line.lenght });
    }
};
// 有序列表
export const addUl = () => {
    const editor = toRaw(mdStore().editor);
    if (editor) {
        // 获取当前光标在的行号
        const lineNum = editor.getCursor().line;
        // 获取标号
        let n = 0;
        if (lineNum) {
            n = parseInt(editor.getLine(lineNum - 1)[0]);
            if (isNaN(n)) {
                n = 0;
            }
        }
        editor.replaceRange(`${n + 1}. `, { line: lineNum, ch: 0 });
    }
};
// 待办列表
export const addDaiban = () => {
    const editor = toRaw(mdStore().editor);
    if (editor) {
        // 当前选择的内容
        let selContent = editor.getSelection();
        if (selContent == "") {
            selContent = "List Item";
        }
        editor.replaceSelection(`\r- [] ${selContent}\r`);
    }
};
// 引用
export const addQuote = () => {
    const editor = toRaw(mdStore().editor);
    if (editor) {
        // 当前选择的内容
        let selContent = editor.getSelection();
        editor.replaceSelection(`\r> ${selContent}\r`);
    }
};
// 代码块
export const addCode = () => {
    const editor = toRaw(mdStore().editor);
    if (editor) {
        // 当前选择的内容
        let selContent = editor.getSelection();
        editor.replaceSelection("\r```java" + selContent + "\r\r```\r");
    }
};
// 表格
export const addTable = () => {
    const editor = toRaw(mdStore().editor);
    if (editor) {
        // 当前选择的内容
        let selContent = editor.getSelection();
        if (selContent == "") {
            selContent = "  ";
        }
        editor.replaceSelection(`\n|${selContent}|  |\n|--|--|\n|  |  |\n`);
    }
};
// 链接
export const addA = () => {
    const editor = toRaw(mdStore().editor);
    if (editor) {
        // 当前选择的内容
        let selContent = editor.getSelection();
        editor.replaceSelection(`[${selContent}](url)`);
    }
};
// 图片
export const addImage = async (e) => {
    const editor = toRaw(mdStore().editor);
    if (editor) {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        const res = await getFileUrl(formData);
        console.log(res);
        const url = JSON.parse(res.data).url.replace(' ','%20');
        const lineNum = editor.getCursor().line;
        let content = `![${file.name}](http://${url})\n`;
        if (lineNum > 0) {
            content = '\n' + content;
        }
        editor.replaceRange(content, { line: lineNum, ch: editor.getLine(lineNum).lenght });
    }
}
// 导入文件
export const importFlie = (e) => {
    const editor = toRaw(mdStore().editor);
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file, "utf-8");
    const n = editor.lineCount();
    reader.onload = (e) => {
        if (editor.getLine(n - 1).lenght > 0) {
            editor.execCommand("newlineAndIndent");
        }
        editor.replaceRange(e.target.result, { line: n - 1, ch: editor.getLine(n - 1).lenght });
    };
};
// 改变主题
export const changeTheme = (themeName) => {
    document.querySelector(
        ".richText-middle"
    ).className = `richText-middle ${themeName}`;
};
// 菜单
export const addMeum = () => {
    const editor = toRaw(mdStore().editor);
    if (editor) {
        // 获取当前光标在的行号
        const lineNum = editor.getCursor().line;
        let content = '@[TOC](这里写自定义目录标题)\n';
        if (lineNum > 0) {
            content = '\n' + content;
        }
        editor.replaceRange(content, { line: lineNum, ch: editor.getLine(lineNum).lenght });
    }
}
// 撤销
export const addUndo = () => {
    if (toRaw(mdStore().editor)) {
        toRaw(mdStore().editor).undo();
    }
};
// 重做
export const addRedo = () => {
    if (toRaw(mdStore().editor)) {
        toRaw(mdStore().editor).redo();
    }
};
// 打开语法说明
export const openR = () => {
    const r = document.querySelector(".richText");
    const l = document.querySelector(".richText-left");
    const m = document.querySelector(".richText-middle");
    r.style.width = "100%";
    l.style.width = "40%";
    m.style.width = "40%";
}