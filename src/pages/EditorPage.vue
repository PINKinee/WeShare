<template>
  <div class="editor">
    <editorHeader></editorHeader>
    <editorTools></editorTools>
    <mainContents></mainContents>
  </div>
</template>

<script>
import editorHeader from "../components/Markdown/Header.vue";
import editorTools from "../components/Markdown/editorTools.vue";
import mainContents from "../components/Markdown/mainContents.vue";
export default {
  name: "editorPage",
  components: { editorHeader, editorTools, mainContents },
};
</script>

<style lang="less" scoped>
.editor {
  overflow: hidden;
  width: 100%;
  height: 100vh;
}
</style>