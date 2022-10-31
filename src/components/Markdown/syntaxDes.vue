<template>
  <div class="syntaxDes-header">
    <h2>语法说明</h2>
    <span class="iconfont icon-chahao" @click="close"></span>
  </div>
  <ul class="syntaxDes-mid">
    <li
      v-for="(t, index) of types"
      :key="index"
      @click="atnIndex = index"
      :style="{ color: atnIndex == index ? '#3284cf' : '#555' }"
    >
      {{ t }}
    </li>
  </ul>
  <div class="syntaxDes-bottom">
    <div class="sbt">
      <h2>标题</h2>
      <span>复制</span>
    </div>
    <ul>
      <li
        v-for="(c, index) of contents"
        :key="index"
        v-html="c"
        :style="{ display: atnIndex == index ? 'block' : 'none' }"
      ></li>
    </ul>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  name: "syntaxDes",
  setup() {
    const contents = [
      `<h1># 一级标题</h1>
        <br />
        <h2>## 二级标题</h2>
        <br />
        <h3>### 三级标题</h3>
        <br />
        <h4>#### 四级标题</h4>
        <br />
        <h5>##### 五级标题</h5>
        <br />
        <h6>###### 六级标题</h6>
        <br />`,
      `<i>*强调文本* _强调文本_</i><br /><br />
        <strong>**加粗文本** __加粗文本__</strong><br /><br />
        ==<span style="background-color: #f8f840">标记文本</span>==<br /><br />
        ~~<span style="text-decoration: line-through">删除文本</span
        >~~<br /><br />
        > 引用文本<br /><br />
        H~2~O is是液体。<br /><br />
        2^10^ 运算结果是 1024。<br />`,
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
      "快捷键",
    ];
    function close() {
      const r = document.querySelector(".richText");
      const l = document.querySelector(".richText-left");
      const m = document.querySelector(".richText-middle");
      r.style.width = "120%";
      l.style.width = "50%";
      m.style.width = "50%";
    }
    return { types, contents, atnIndex, close };
  },
};
</script>

<style lang="less" scoped>
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
    &:first-child {
      display: block;
    }
  }
}
</style>