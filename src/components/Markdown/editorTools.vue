<template>
  <div class="tool">
    <span class="iconfont icon-zitijiacu" title="加粗"></span>
    <span class="iconfont icon-italic" title="斜体"></span>
    <span class="iconfont icon-biaotizhengwenqiehuan" title="标题"></span>
    <span class="iconfont icon-shanchuxian" title="删除线"></span>
    <span class="iconfont icon-wuxuliebiao" title="无序列表"></span>
    <span class="iconfont icon-youxuliebiao" title="有序列表"></span>
    <span class="iconfont icon-daiban" title="待办列表"></span>
    <span class="iconfont icon-quote" title="引用"></span>
    <span class="iconfont icon-daimakuai" title="代码块"></span>
    <span class="iconfont icon-icon" title="图片"
      ><input type="file" accept="image/*"
    /></span>
    <span class="iconfont icon-shipin" title="视频"
      ><input type="file" accept="video/*"
    /></span>
    <span class="iconfont icon-biaoge" title="表格"></span>
    <span class="iconfont icon-lianjie" title="超链接"></span>
    <span class="iconfont icon-daoru" title="导入"></span>
    <span class="iconfont icon-daochu" title="导出"></span>
    <span class="iconfont icon-chexiao" title="撤销"></span>
    <span class="iconfont icon-zhongzuo" title="重做"></span>
    <span class="iconfont icon-mobansheji" title="模板"></span>
    <span class="iconfont icon-mulu1" title="目录"></span>
    <span class="iconfont icon-qiehuan" title="使用富文本编辑器"></span>
    <span class="iconfont icon-shuoming" @click="openR" title="语法说明"></span>
  </div>
</template>

<script>
export default {
  name: "editorTools",
  setup() {
    function openR() {
      const r = document.querySelector(".richText");
      const l = document.querySelector(".richText-left");
      const m = document.querySelector(".richText-middle");
      r.style.width = "100%";
      l.style.width = "40%";
      m.style.width = "40%";
    }
    return {openR};
  },
};
</script>

<style lang="less" scoped>
.tool {
  display: flex;
  width: 100%;
  min-width: 1000px;
  line-height: 100%;
  height: 80px;
  text-align: center;
  background-color: #fff;
  align-items: center;
  border-bottom: 1px solid #eee;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.06);
  span {
    position: relative;
    width: 80px;
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
  }
}
</style>