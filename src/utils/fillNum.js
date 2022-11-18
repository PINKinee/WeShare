import { toRaw } from "vue";
import mdStore from '@/store/codemirror';
// 当为有序无序列表时，填充序号
export default (e) => {
    // 判断是不是enter键
    if (e.keyCode == 13) {
      const md = toRaw(mdStore().editor);
      // 获取行号
      const cursor = md.getCursor();
      const lineNum = cursor.line;
      // 获取上一行内容
      const line = md.getLine(lineNum - 1);
      let reg = /[1-9]. .*/;
      // 判断是否为有序列表
      if (reg.test(line)) {
        let i = lineNum;
        if (line.replace(/[1-9]. /, "") == "") {
          md.setSelection(
            { line: i - 1, ch: 0 },
            { line: i - 1, ch: line.length }
          );
          md.replaceSelection(``);
          return;
        }
        while (i > -1 && reg.test(md.getLine(--i))) {
          continue;
        }
        let start = i + 1;
        i = lineNum;
        while (reg.test(md.getLine(++i))) {
          continue;
        }
        let end = i - 1;
        let n = 1;
        for (let i = start; i <= end; i++) {
          md.setSelection({ line: i, ch: 0 }, { line: i, ch: 3 });
          md.replaceSelection(`${n++}. `);
        }
        md.setSelection({ line: lineNum, ch: md.getLine(lineNum).length });
      }
      reg = /[-+*] .*/;
      // 判断是否为无序列表
      if (reg.test(line)) {
        let n = lineNum;
        if (line.replace(/- /, "") == "") {
          md.setSelection(
            { line: n - 1, ch: 0 },
            { line: n - 1, ch: line.length }
          );
          md.replaceSelection(``);
        } else {
          md.setSelection({ line: n, ch: 0 });
          md.replaceSelection(`- `);
        }
      }
    }
  };