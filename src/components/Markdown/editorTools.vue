<template>
  <div class="tool">
    <span @click="addBlod" class="iconfont icon-zitijiacu" title="加粗"></span>
    <span @click="addItalic" class="iconfont icon-italic" title="斜体"></span>
    <span class="iconfont icon-biaotizhengwenqiehuan" title="标题"
      ><ul>
        <li v-for="(h, index) of hs" :key="index" @click="addH(index)">
          {{ h }}
        </li>
      </ul></span
    >
    <span
      @click="addDelete"
      class="iconfont icon-shanchuxian"
      title="删除线"
    ></span>
    <span
      @click="addOl"
      class="iconfont icon-wuxuliebiao"
      title="无序列表"
    ></span>
    <span
      @click="addUl"
      class="iconfont icon-youxuliebiao"
      title="有序列表"
    ></span>
    <span
      @click="addDaiban"
      class="iconfont icon-daiban"
      title="待办列表"
    ></span>
    <span @click="addQuto" class="iconfont icon-quote" title="引用"></span>
    <span
      @click="addCode"
      class="iconfont icon-daimakuai"
      title="代码块"
    ></span>
    <span @click="addImg" class="iconfont icon-icon" title="图片"
      ><input type="file" accept="image/*"
    /></span>
    <span @click="addVideo" class="iconfont icon-shipin" title="视频"
      ><input type="file" accept="video/*"
    /></span>
    <span @click="addTable" class="iconfont icon-biaoge" title="表格"></span>
    <span @click="addA" class="iconfont icon-lianjie" title="超链接"></span>
    <span @click="addImport" class="iconfont icon-daoru" title="导入"></span>
    <span @click="addExport" class="iconfont icon-daochu" title="导出"></span>
    <span @click="addUndo" class="iconfont icon-chexiao" title="撤销"></span>
    <span @click="addRedo" class="iconfont icon-zhongzuo" title="重做"></span>
    <span @click="choiceModle" class="iconfont icon-mobansheji" title="主题">
      <ul>
        <li
          @click="$emit('changeTheme', t.path)"
          v-for="(t, index) of theme"
          :key="index"
        >
          {{ t.name }}
        </li>
      </ul>
    </span>
    <span @click="addMeum" class="iconfont icon-mulu1" title="目录"></span>
    <span class="iconfont icon-qiehuan" title="使用富文本编辑器"></span>
    <span class="iconfont icon-shuoming" @click="openR" title="语法说明"></span>
  </div>
</template>

<script>
import mdStore from "@/store/codemirror";
export default {
  name: "editorTools",
  setup() {
    const hs = [
      "一级标题",
      "二级标题",
      "三级标题",
      "四级标题",
      "五级标题",
      "六级标题",
    ];
    const theme = [
      { name: "orangeheart", path: "orangeheart.css" },
      { name: "drake", path: "drake.less" },
      { name: "github", path: "github.css" },
      { name: "newsprint", path: "newsprint.less" },
      { name: "cobalt", path: "cobalt.less" },
    ];
    // 加粗
    const addBlod = () => {
      if (mdStore().md) {
        mdStore().md.replaceSelection(`**${mdStore().md.getSelection()}**`);
      }
    };
    // 斜体
    const addItalic = () => {
      if (mdStore().md) {
        mdStore().md.replaceSelection(`*${mdStore().md.getSelection()}*`);
      }
    };
    // 标题
    const addH = (i) => {
      if (mdStore().md) {
        const md = mdStore().md;
        // 获取当前光标在的行号
        const lineNum = md.lineCount();
        // 获取当前光标在的行内容
        let line = md.getLine(lineNum - 1);
        // 选范围 方便替换
        md.setSelection(
          { line: lineNum - 1, ch: 0 },
          { line: lineNum - 1, ch: line.lenght }
        );
        // 为了去掉# 本来是一级标题是 变二级标题
        let index = 0;
        for (; index < line.length; index++) {
          if (line[index] == "#") {
            continue;
          } else {
            break;
          }
        }
        // 取真正的内容
        if (line[index] == " " && index > 0) {
          line = line.slice(index + 1, line.length);
        }
        // 生成#字符串
        const repeat = (num, str) => {
          let res = str;
          for (let j = 0; j < num; j++) {
            res += str;
          }
          return res;
        };
        const s = repeat(i, "#");
        // 替换内容
        mdStore().md.replaceSelection(`${s} ${line}`);
        line = md.getLine(lineNum - 1);
        // 选择整行内容
        md.setSelection(
          { line: lineNum - 1, ch: 0 },
          { line: lineNum - 1, ch: line.lenght }
        );
      }
    };
    // 删除
    const addDelete = () => {
      if (mdStore().md) {
        mdStore().md.replaceSelection(`~~${mdStore().md.getSelection()}~~`);
      }
    };
    // 无序列表
    const addOl = () => {
      if (mdStore().md) {
        const md = mdStore().md;
        // 获取当前光标在的行号
        const lineNum = md.lineCount();
        // 选范围 方便替换
        md.setSelection({ line: lineNum - 1, ch: 0 });
        mdStore().md.replaceSelection(`- `);
        // 获取当前光标在的行内容
        let line = md.getLine(lineNum - 1);
        md.setSelection(
          { line: lineNum - 1, ch: 0 },
          { line: lineNum - 1, ch: line.lenght }
        );
      }
    };
    // 有序列表
    const addUl = () => {
      if (mdStore().md) {
        const md = mdStore().md;
        // 获取当前光标在的行号
        const lineNum = md.getCursor().line;
        // 获取标号
        const n = parseInt(md.getLine(lineNum - 1)[0]);
        // 选范围 方便替换
        md.setSelection({ line: lineNum, ch: 0 });
        md.replaceSelection(`${n + 1}. `);
      }
    };
    // 待办列表
    const addDaiban = () => {
      const md = mdStore().md;
      if (md) {
        //   const enter = (el, evtType, keyCode) => {
        //     var doc = el.ownerDocument,
        //       win = doc.defaultView || doc.parentWindow,
        //       evtObj;
        //     if (doc.createEvent) {
        //       if (win.KeyEvent) {
        //         evtObj = doc.createEvent("KeyEvents");
        //         evtObj.initKeyEvent(
        //           evtType,
        //           true,
        //           true,
        //           win,
        //           false,
        //           false,
        //           false,
        //           false,
        //           keyCode,
        //           0
        //         );
        //       } else {
        //         evtObj = doc.createEvent("UIEvents");
        //         Object.defineProperty(evtObj, "keyCode", {
        //           get: function () {
        //             return this.keyCodeVal;
        //           },
        //         });
        //         Object.defineProperty(evtObj, "which", {
        //           get: function () {
        //             return this.keyCodeVal;
        //           },
        //         });
        //         evtObj.initUIEvent(evtType, true, true, win, 1);
        //         evtObj.keyCodeVal = keyCode;
        //         if (evtObj.keyCode !== keyCode) {
        //           console.log(
        //             "keyCode " +
        //               evtObj.keyCode +
        //               " 和 (" +
        //               evtObj.which +
        //               ") 不匹配"
        //           );
        //         }
        //       }
        //       el.dispatchEvent(evtObj);
        //     } else if (doc.createEventObject) {
        //       evtObj = doc.createEventObject();
        //       evtObj.keyCode = keyCode;
        //       el.fireEvent("on" + evtType, evtObj);
        //     }
        //   };
        //   enter(md, "keyup", "13");
        // md.execCommand("newlineAndIndent");
        const lineNum = md.getCursor().line;
        md.replaceRange("\r- [] List Item\r", { line: lineNum + 1, ch: 0 });
        // md.replaceRange("- [X] List Item",{line: lineNum+2,ch: 0});
        // md.replaceSelection(`\n- [] List Item`);
        // const lineCount = md.lineCount();
        // // 获取当前光标在的行号
        // const lineNum = md.getCursor().line;
        // // const n = md.getLine(lineCount - 1).lenght;
        // console.log(lineNum);
        // console.log(lineCount - 1);
        // md.setSelection(
        //   { line: lineNum + 1, ch: 0 },
        //   { line: lineCount - 1, ch: 1000 }
        // );
        // const content = md.getSelection();
        // console.log(content);
        // md.replaceSelection("");
        // md.setSelection(
        //   { line: lineNum + 1, ch: 0 },
        //   { line: lineNum + 1, ch: md.getLine(lineNum).lenght }
        // );
        // md.replaceSelection("\n- [] List Item\n");
        // md.setSelection({ line: lineNum + 2, ch: 0 });
        // if (content) {
        //   md.replaceSelection("- [X] List Item\n");
        //   md.setSelection({ line: lineNum + 3, ch: 0 });
        //   md.replaceSelection(content);
        // } else {
        //   console.log(1111);
        //   md.replaceSelection("- [X] List Item");
        // }
        md.setSelection({
          line: lineNum,
          ch: 0,
        });
      }
    };
    // 撤销
    const addUndo = () => {
      if (mdStore().md) {
        mdStore().md.undo();
      }
    };
    // 重做
    const addRedo = () => {
      if (mdStore().md) {
        mdStore().md.redo();
      }
    };
    // 打开语法说明
    function openR() {
      const r = document.querySelector(".richText");
      const l = document.querySelector(".richText-left");
      const m = document.querySelector(".richText-middle");
      r.style.width = "100%";
      l.style.width = "40%";
      m.style.width = "40%";
    }
    return {
      hs,
      theme,
      openR,
      addBlod,
      addRedo,
      addUndo,
      addItalic,
      addH,
      addDelete,
      addOl,
      addUl,
      addDaiban,
    };
  },
};
</script>

<style lang="less" scoped>
.tool {
  display: flex;
  width: 100%;
  min-width: 1000px;
  height: 80px;
  text-align: center;
  background-color: #fff;
  align-items: center;
  border-bottom: 1px solid #eee;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.06);
  span {
    display: block;
    position: relative;
    width: 80px;
    height: 80px;
    line-height: 80px;
    font-size: 30px;
    color: #555;
    cursor: pointer;
    input {
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
      cursor: pointer;
    }
    &:nth-child(3),
    &:nth-child(18) {
      ul {
        display: none;
        position: absolute;
        width: 120px;
        border: 2px solid #eee;
        background-color: #fff;
        border-radius: 10px;
        top: 80px;
        left: -22px;
        z-index: 100;
        li {
          width: 100%;
          height: 40px;
          line-height: 40px;
          text-align: center;
          font-size: 16px;
          list-style: none;
          &:hover {
            background-color: #eee;
          }
        }
      }
      &:hover ul {
        display: block;
      }
    }
    &:nth-child(18) ul {
      width: 140px;
      left: -29px;
    }
  }
}
</style>