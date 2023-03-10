<template>
  <div class="syntaxDes-header">
    <h2>语法说明</h2>
    <span class="iconfont icon-chahao" @click="close"></span>
  </div>
  <ul class="syntaxDes-mid">
    <li v-for="(t, index) of types" :key="index" @click="atnIndex = index"
      :style="{ color: atnIndex == index ? '#3284cf' : '#555' }">
      {{ t }}
    </li>
  </ul>
  <div class="syntaxDes-bottom">
    <div class="sbt">
      <h2>{{ types[atnIndex] }}</h2>
      <span @click="copyContent">复制</span>
    </div>
    <ul ref="ct">
      <li v-for="(c, index) of contents" :key="index" :style="{ display: atnIndex == index ? 'block' : 'none' }">
        <div class="precode" v-html="c"></div>
        <div v-if="types[index] == '表情'" class="show" v-html="md.render(c.match(/##.*$/)[0])"></div>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, getCurrentInstance } from "vue";
import md from "@/core/markdown.js";
export default {
  name: "syntaxDes",
  setup() {
    const { proxy } = getCurrentInstance();
    const ct = ref(null);
    const contents = [
      `<h1># 一级标题</h1>
      <h2>## 二级标题</h2>
      <h3>### 三级标题</h3>
      <h4>#### 四级标题</h4>
      <h5>##### 五级标题</h5>
      <h6>###### 六级标题</h6>`,
      `<i>*强调文本* _强调文本_</i><br /><br />
        <strong>**加粗文本** __加粗文本__</strong><br /><br />
        ==<span style="background-color: #f8f840">标记文本</span>==<br /><br />
        ~~<span style="text-decoration: line-through">删除文本</span
        >~~<br /><br />
        > 引用文本<br /><br />
        H~2~O is是液体。<br /><br />
        2^10^ 运算结果是 1024。<br />`,
      `<div>- 项目</div>
  <pre>  * 项目</pre>
  <pre>    + 项目</pre>
<br>
    <div>1. 项目1</div>
      <div>2. 项目2</div>
        <div>3. 项目3</div>
<br>
          <div>- [ ] 计划任务</div>
            <div>- [x] 完成任务</div>`,
      `<p>图片: ![Alt](https://img-home.csdnimg.cn/images/20220524100510.png)</p><br>

    <p>带尺寸的图片: ![Alt](https://img-home.csdnimg.cn/images/20220524100510.png =60x60)</p><br>

    <p>宽度确定高度等比例的图片: ![Alt](https://img-home.csdnimg.cn/images/20220524100510.png =60x)</p><br>

    <p>高度确定宽度等比例的图片: ![Alt](https://img-home.csdnimg.cn/images/20220524100510.png =x60)</p><br>

    <p>居中的图片: ![Alt](https://img-home.csdnimg.cn/images/20220524100510.png#pic_center)</p><br>

    <p>居中并且带尺寸的图片: ![Alt](https://img-home.csdnimg.cn/images/20220524100510.png#pic_center =60x60)</p><br>

    <p>居右的图片: ![Alt](https://img-home.csdnimg.cn/images/20220524100510.png#pic_right)</p><br>
`,
      `链接: [link](https://www.csdn.net/)`,
      `@[TOC](这里写目录标题)`,
      "下面展示一些 `内联代码片`。<br>```<br>// A code blockvar<br> foo = 'bar';<br>```<br>```javascrip;<br>// An highlighted block<br>var foo = 'bar';<br>```",
      `项目     | Value<br>
-------- | -----<br>
电脑  | $1600<br>
手机  | $12<br>
导管  | $1<br>
<br>
| Column 1 | Column 2      |<br>
|:--------:| -------------:|<br>
| centered 文本居中 | right-aligned 文本居右 |`,
      `一个具有注脚的文本。[^1]<br>[^1]: 注脚的解释`,
      `Markdown<br>
:  Text-to-HTML conversion tool<br>
<br>
Authors<br>
:  John<br>
:  Luke`,
      `[参考文档](https://khan.github.io/KaTeX/)<br><br>Gamma公式展示 $&#92;Gamma(n) = (n-1)!&#92;quad&#92;forall
      n&#92;in&#92;mathbb N$ 是通过 Euler integral
<br><br>
$$<br>
&#92;Gamma(z) = &#92;int_0^&#92;infty t^{z-1}e^{-t}dt&#92;,.<br>
$$`,
      "[参考文档](https://mermaid-js.github.io/mermaid/#/gantt)<br><br><pre style='white-space: pre-wrap;'>```mermaid<br>gantt<br>dateFormat  YYYY-MM-DD<br>title Adding GANTT diagram functionality to mermaid<br>section 现有任务<br>已完成               :done,    des1, 2014-01-06,2014-01-08<br>进行中               :active,  des2, 2014-01-09, 3d<br>计划中               :         des3, after des2, 5d<br>```</pre>",
      "[参考文档](https://mermaid-js.github.io/mermaid/#/sequenceDiagram)<br><br>```mermaid<br>sequenceDiagram<br>张三 ->> 李四: 你好！李四, 最近怎么样?<br>李四-->>王五: 你最近怎么样，王五？<br>李四--x 张三: 我很好，谢谢!<br>李四-x 王五: 我很好，谢谢!<br>Note right of 王五: 李四想了很长时间, 文字太长了&lt;br/&gt;不适合放在一行.<br><br>李四-->>张三: 打量着王五...<br>张三->>王五: 很好... 王五, 你怎么样?<br>```",
      "[参考文档](https://mermaid-js.github.io/mermaid/#/flowchart?id=graph)<br><br>```mermaid<br>graph LR<br>A[长方形] -- 链接 --> B((圆))<br>A --> C(圆角长方形)<br>B --> D{菱形}<br>C --> D<br>```",
      "[参考文档](http://flowchart.js.org/)<br><br>```flowchart<br>st=>start: 开始<br>e=>end: 结束<br>op=>operation: 我的操作<br>cond=>condition: 确认？<br><br>st->op->cond<br>cond(yes)->e<br>cond(no)->op<br>```",
      "[参考文档](https://mermaid-js.github.io/mermaid/#/classDiagram)<br><br><pre>```mermaid<br>classDiagram<br>Class01 <|-- AveryLongClass : Cool<br>Class09 --> C2 : Where am i?<br>Class09 --* C3<br>Class09 --|> Class07<br>Class07 : equals()<br>Class07 : Object[] elementData<br>Class01 : size()<br>Class01 : int chimp<br>Class01 : int gorilla<br>class Class10 {<br>    >>service>><br>    int id<br>    size()<br>}<br></pre>```",
      '<pre>```echarts<br>{<br>  "width": 500,<br>  "height": 400,<br>  "series": [<br>  {<br>    "name": "访问来源",<br>    "type": "pie",<br>    "radius": "55%",<br>    "data": [<br>    {<br>      "value": 235,<br>      "name": "视频广告"<br>    },<br>    {<br>      "value": 274,<br>      "name": "联盟广告"<br>    },<br>    {<br>      "value": 310,<br>      "name": "邮件营销"<br>    },<br>    {<br>      "value": 335,<br>      "name": "直接访问"<br>    },<br>    {<br>      "value": 400,<br>      "name": "搜索引擎"<br>     }<br>    ]<br>   }<br>  ]<br> }<br></pre>```',
      "[参考文档](https://www.webfx.com/tools/emoji-cheat-sheet/)<br><br>## Emoji: :panda_face: :sparkles: :camel: :boom: :pig:<br><br>",
    ];
    const atnIndex = ref(0);
    const types = [
      "标题",
      "文本样式",
      "列表",
      "图片",
      "链接",
      "目录",
      "代码片",
      "表格",
      "注脚",
      "自定义列表",
      "LaTex数学公式",
      "插入甘特图",
      "插入UML图",
      "插入Mermaid流程图",
      "插入Flowchart流程图",
      "插入类图",
      "echarts",
      "表情",
    ];
    function close() {
      const r = document.querySelector(".richText");
      const l = document.querySelector(".richText-left");
      const m = document.querySelector(".richText-middle");
      r.style.width = "120%";
      l.style.width = "50%";
      m.style.width = "50%";
    }
    const copyContent = () => {
      navigator.clipboard.writeText(
        ct.value.querySelectorAll("li")[atnIndex.value].innerText
      );
      proxy.$msg.success('复制成功');
    };
    return { types, contents, atnIndex, close, copyContent, ct, md };
  },
};
</script>

<style lang="less" scoped>
li {
  list-style: none;
}

.syntaxDes-header {
  width: 100%;
  height: 40px;
  line-height: 40px;

  h2 {
    float: left;
  }

  span {
    float: right;
    width: 40px;
    height: 40px;
    text-align: center;
    font-size: 25px;
    color: #555;
    cursor: pointer;
  }
}

.syntaxDes-mid {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  margin-top: 14px;
  padding-bottom: 10px;
  border-bottom: 2px solid #eee;

  li {
    padding: 5px 10px;
    border-radius: 10px;
    background-color: #f1f5fa;
    margin-right: 5px;
    margin-bottom: 7px;
    cursor: pointer;

    &:hover {
      color: #3284cf;
    }
  }
}

.syntaxDes-bottom {
  width: 100%;

  .sbt {
    width: 100%;
    height: 40px;
    margin-top: 10px;

    h2 {
      float: left;
    }

    span {
      color: #3385cf;
      font-weight: 700;
      float: right;
      cursor: pointer;
    }
  }

  li {
    display: none;
    word-wrap: break-word;
    word-break: break-all;
    overflow: hidden;
    line-height: 30px;

    &:first-child {
      display: block;
    }
  }
}
</style>