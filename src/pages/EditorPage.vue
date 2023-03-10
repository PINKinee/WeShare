<template>
  <div class="editor">
    <editorHeader></editorHeader>
    <editorTools @changeTheme="tranTheme"></editorTools>
    <mainContents :theme="theme"></mainContents>
  </div>
  <teleport to="body">
    <pop></pop>
  </teleport>
</template>

<script>
import editorHeader from "../components/Markdown/Header.vue";
import editorTools from "../components/Markdown/editorTools.vue";
import mainContents from "../components/Markdown/mainContents.vue";
import pop from '@/components/pop.vue';
import { ref } from 'vue'
export default {
  name: "editorPage",
  components: { editorHeader, editorTools, mainContents, pop },
  setup() {
    let theme = ref('orangeheart.css');
    const tranTheme = (t) => {
      theme.value = t;
    };
    return { tranTheme, theme };
  },
};
</script>

<style lang="less" scoped>
.editor {
  overflow: hidden;
  width: 100%;
  height: 100vh;
}
</style>