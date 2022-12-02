<template>
  <div class="richText">
    <div class="filesArea">
      <filesManageVue :files="files"></filesManageVue>
    </div>
    <div class="mainEdiPlace">
      <div class="richText-left" @mouseover="mdStore().scrollPlace = 'edi'" @keydown="fillNum">
        <textarea ref="l" @change="changeText"></textarea>
      </div>
      <div class="richText-middle orangeheart" @mouseover="mdStore().scrollPlace = 'pre'" @scroll="usePreScroll"
        v-html="aftcontent"></div>
      <div class="richText-right">
        <syntaxDes></syntaxDes>
      </div>
    </div>
  </div>
</template>

<script>
import CodeMirror from "codemirror";
import syntaxDes from "./syntaxDes.vue";
import filesManageVue from "./filesManage.vue";
import { marked } from "marked";
import { ref, onMounted } from "vue";
import "highlight.js/styles/magula.css";
import "codemirror/addon/fold/foldcode.js"; // 代码折叠
import "codemirror/addon/fold/foldgutter.js"; // 代码折叠
import "codemirror/addon/fold/brace-fold.js"; // 代码折叠
import "codemirror/addon/fold/comment-fold.js"; // 代码折叠
import "codemirror/addon/hint/javascript-hint.js"; // 自动提示
import "codemirror/addon/hint/show-hint.js"; // 自动提示
import "codemirror/addon/lint/lint.js"; // 错误校验
import "codemirror/addon/lint/javascript-lint.js"; // js错误校验
import "codemirror/addon/selection/active-line.js"; // 当前行高亮
import "codemirror/addon/edit/closetag.js";
import "codemirror/addon/edit/closebrackets.js";
import "codemirror/lib/codemirror.js";
// 语言包
import "codemirror/mode/javascript/javascript.js";
import "codemirror/mode/groovy/groovy.js";
// css
import "codemirror/addon/fold/foldgutter.css"; // 代码折叠
import "codemirror/addon/hint/show-hint.css"; // 自动提示
import "codemirror/addon/lint/lint.css"; // 代码错误提示
import "codemirror/lib/codemirror.css"; // 编辑器样式
import "codemirror/theme/base16-light.css"; // 主题
import md from "@/core/markdown.js";
import "@/assets/css/orangeheart.css";
import "@/assets/css/cobalt.css";
import "@/assets/css/drake.css";
import "@/assets/css/github.css";
import "@/assets/css/newsprint.css";
import flowchart from "flowchart.js";
import "github-markdown-css";
import "markdown-it-latex/dist/index.css";
import * as echarts from "echarts/dist/echarts.simple.min";
import mermaid from "mermaid";
import mdStore from "@/store/codemirror";
import useEdiScroll from "@/utils/useEdiScroll";
import usePreScroll from "@/utils/usePreScroll";
import fillNum from "@/utils/fillNum";

import * as Y from 'yjs'
import { CodemirrorBinding } from 'y-codemirror'
import { WebrtcProvider } from 'y-webrtc'

export default {
  name: "richText",
  components: { syntaxDes, filesManageVue },
  props: ["theme"],
  setup() {
    const files = [
      {
        id: 1,
        name: "f1",
        children: [
          {
            id: 11,
            name: "f11",
            children: [
              {
                id: 111,
                name: "f111",
              },
              {
                id: 112,
                name: "f112",
              },
            ],
          },
          {
            id: 12,
            name: "f12",
          },
        ],
      },
      {
        id: 2,
        name: "f2",
        children: [
          {
            id: 21,
            name: "f21",
            children: [
              {
                id: 211,
                name: "f211",
              },
            ],
          },
        ],
      },
      {
        id: 3,
        name: "f3",
        children: [
          {
            id: 31,
            name: "f31",
          },
          {
            id: 32,
            name: "f32",
          },
        ],
      },
    ];
    // markdown基本设置
    marked.setOptions({
      renderer: new marked.Renderer(),
      highlight: function (code, lang) {
        const hljs = require("highlight.js");
        const language = hljs.getLanguage(lang) ? lang : "plaintext";
        return hljs.highlight(code, { language }).value;
      },
      langPrefix: "hljs language-", // highlight.js css expects a top-level 'hljs' class.
      pedantic: false,
      gfm: true,
      breaks: true,
      tables: true,
      smartypants: false,
      xhtml: false,
    });
    // 预览区的内容
    const aftcontent = ref("");
    // textarea文本框
    const l = ref(null);
    // codemirror配置
    onMounted(() => {
      // 引入y-webrtc
      const ydoc = new Y.Doc();
      const provider = new WebrtcProvider('weShareMd', ydoc,
        {
          signaling: ['ws:localhost:4444'],
          filterBcConns: true
        }
      );
      const yText = ydoc.getText('codemirror');
      const yUndoManager = new Y.UndoManager(yText);

      const editor = CodeMirror.fromTextArea(l.value, {
        mode: "markdown",
        theme: "base16-light",
        lineWrapping: true,
        foldGutter: true,
        gutters: [
          "CodeMirror-linenumbers",
          "CodeMirror-foldgutter",
          "CodeMirror-lint-markers",
        ],
        dragDrop: true,
        matchBrackets: true,
        spellcheck: true,
        allowDropFileTypes: ["text/html", "text/x-markdown", "text/plain"],
      });
      // 绑定codeMirror
      const binding = new CodemirrorBinding(yText, editor, provider.awareness, {
        // 使用这个自带的撤销重做方法
        yUndoManager
      });
      // 修改用户名为指定名称
      binding.awareness.setLocalStateField('user',
        // 暂时先这么写，等有了接口再改为用户名变量
        { color: '#008833', name: 'PINKinee' }
      )

      // 当编辑器改变时
      editor.on("change", () => {
        console.log(editor.getValue());
        new Promise((resolve) => {
          aftcontent.value = md.render(editor.getValue());
          resolve();
        }).then(() => {
          // render mermaid
          mermaid.init(undefined, document.querySelectorAll(".mermaid"));
          mdStore().noEchart = aftcontent.value;
          document.querySelectorAll(".md-echarts").forEach((element) => {
            try {
              let options = JSON.parse(element.textContent);
              let chart = echarts.init(element);
              chart.setOption(options);
            } catch (e) {
              element.outerHTML = `<pre>echarts complains: ${e}</pre>`;
            }
          });
          // 制作流程图
          document.querySelectorAll(".md-flowchart").forEach((element) => {
            try {
              let code = element.textContent;
              let chart = flowchart.parse(code);
              element.textContent = "";
              chart.drawSVG(element);
            } catch (e) {
              element.outerHTML = `<pre>flowchart complains: ${e}</pre>`;
            }
          });
        });
      });
      // 编辑监听滚动
      editor.on("scroll", useEdiScroll);
      mdStore().editor = editor;
    });
    return { aftcontent, l, fillNum, usePreScroll, mdStore, files };
  },
};
</script>

<style lang="less">
.richText {
  position: relative;
  width: 100%;
  height: calc(100vh - 160px);

  .filesArea {
    position: absolute;
    left: -20%;
    top: 0;
    width: 20%;
    height: 100%;
    background-color: #fff;
    transition: all 0.5s;
  }

  .mainEdiPlace {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0%;
    display: flex;
    transition: all 0.5s;

    .richText-left {
      height: 100%;
      width: 40%;
      font-size: 20px;
      background: #eee;
      transition: all 0.5s;
      border-right: 2px solid #eee;
      outline: none;

      textarea {
        height: 100%;
      }

      .CodeMirror {
        padding-top: 20px;
        border: 1px solid #eee;
        height: 100%;
      }

      .CodeMirror-sizer {
        height: 100%;
      }
    }

    .richText-middle {
      height: 100%;
      width: 40%;
      font-size: 20px;
      border-right: 2px solid #eee;
      padding: 20px;
      transition: all 0.5s;
      overflow-y: scroll;

      img {
        max-width: 100%;
      }
    }

    .richText-right {
      width: 20%;
      height: 100%;
      padding: 20px;
      transition: all 0.5s;
      overflow-y: scroll;
    }
  }

  ::-webkit-scrollbar,
  ::-webkit-scrollbar-track {
    width: 6px;
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 6px;
    background-color: #bbb;
  }

  ::-webkit-scrollbar,
  ::-webkit-scrollbar-track {
    background-color: transparent;
  }
}
</style>