<template>
  <div class="tool">
    <span
      @click="addBIDC('**')"
      class="iconfont icon-zitijiacu"
      title="加粗"
    ></span>
    <span
      @click="addBIDC('*')"
      class="iconfont icon-italic"
      title="斜体"
    ></span>
    <span class="iconfont icon-biaotizhengwenqiehuan" title="标题"
      ><ul>
        <li v-for="(h, index) of hs" :key="index" @click="tools.addH(index)">
          {{ h }}
        </li>
      </ul></span
    >
    <span
      @click="tools.addBIDC('~~')"
      class="iconfont icon-shanchuxian"
      title="删除线"
    ></span>
    <span
      @click="tools.addOl"
      class="iconfont icon-wuxuliebiao"
      title="无序列表"
    ></span>
    <span
      @click="tools.addUl"
      class="iconfont icon-youxuliebiao"
      title="有序列表"
    ></span>
    <span
      @click="tools.addDaiban"
      class="iconfont icon-daiban"
      title="待办列表"
    ></span>
    <span @click="tools.addQuote" class="iconfont icon-quote" title="引用"></span>
    <span class="iconfont icon-daimakuai" title="代码块">
      <ul>
        <li @click="tools.addBIDC('`')">行内块</li>
        <li @click="tools.addCode">代码块</li>
      </ul>
    </span>
    <span class="iconfont icon-icon" title="图片"
      ><input @input="tools.addImage($event)" type="file" accept="image/*"
    /></span>
    <span @click="tools.addTable" class="iconfont icon-biaoge" title="表格"></span>
    <span @click="tools.addA" class="iconfont icon-lianjie" title="超链接"></span>
    <span
      @click="addImport"
      @change="importFlie($event)"
      class="iconfont icon-daoru"
      title="导入"
      ><input type="file" accept="text/*"
    /></span>
    <span class="iconfont icon-daochu" title="导出"
      ><ul>
        <li @click="downloadPdf">pdf</li>
        <li @click="downloadFile('md')">md</li>
        <li @click="downloadFile('html')">html</li>
      </ul>
    </span>
    <span @click="tools.addUndo" class="iconfont icon-chexiao" title="撤销"></span>
    <span @click="tools.addRedo" class="iconfont icon-zhongzuo" title="重做"></span>
    <span @click="tools.choiceModle" class="iconfont icon-mobansheji" title="主题">
      <ul>
        <li
          @click="changeTheme(t.name)"
          v-for="(t, index) of theme"
          :key="index"
        >
          {{ t.name }}
        </li>
      </ul>
    </span>
    <span @click="tools.addMeum" class="iconfont icon-mulu1" title="目录"></span>
    <span class="iconfont icon-qiehuan" title="使用富文本编辑器"></span>
    <span class="iconfont icon-shuoming" @click="openR" title="语法说明"></span>
  </div>
  <div :class="isTip ? 'tip' : 'tip notip'">
    正在导出请稍等……<span
      class="iconfont icon-chahao"
      @click="isTip = false"
    ></span>
  </div>
</template>

<script>
import mdStore from "@/store/codemirror";
import domToPfd from "@/utils/domToPfd";
import createFile from "@/utils/createFile";
import * as tools from '@/utils/tool';
import { ref } from "vue";
export default {
  name: "editorTools",
  setup() {
    const isTip = ref(false);
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
    const fileType = ["md", "pdf", "html"];
    // 下载pdf
    const downloadPdf = () => {
      domToPfd(isTip);
    }
    // 下载html/md文件
    const downloadFile = (suffix) => {
      createFile(`share.${suffix}`, `text/x-${suffix=='html'?'html':'markdown'}`, suffix, isTip);
    }
    return {
      hs,
      theme,
      fileType,
      mdStore,
      tools,
      domToPfd,
      createFile,
      downloadPdf,
      downloadFile,
      isTip,
    };
  },
};
</script>

<style lang="less" scoped>
.tool {
  position: relative;
  display: flex;
  width: 100%;
  min-width: 1000px;
  height: 80px;
  text-align: center;
  background-color: #fff;
  align-items: center;
  border-bottom: 1px solid #eee;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.06);
  z-index: 7;
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
      display: inline-block;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      opacity: 0;
      cursor: pointer;
    }
    &:nth-child(3),
    &:nth-child(9),
    &:nth-child(14),
    &:nth-child(17) {
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
    &:nth-child(17) ul {
      width: 140px;
      left: -29px;
    }
  }
}
.tip {
  position: absolute;
  width: 100%;
  height: 40px;
  line-height: 40px;
  padding-left: 30px;
  background-color: rgba(255, 241, 220, 0.8);
  color: #ffa116;
  z-index: 4;
  transform: 0.5s;
  span {
    float: right;
  }
}
.notip {
  top: -40px;
}
</style>