// 生成html和md文件并下载
import mdStore from '@/store/codemirror'
import { toRaw } from 'vue';
export default (fileName, type, t, isTip) => {
  isTip.value = true;
  let content;
  if (t == 'html') {
    const themeName = document.querySelector('.richText-middle').className.split(' ')[1];
    content = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/styles/androidstudio.min.css">
    <link rel="stylesheet" href="http://175.178.7.180:8088/assets/css/markdown-it-latex.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/echarts/5.4.0/echarts.simple.min.js"></script>
    <link rel="stylesheet" href="http://175.178.7.180:8088/assets/css/${themeName}.css"></link>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/raphael/2.3.0/raphael.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/flowchart/1.17.1/flowchart.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/mermaid/9.2.2/mermaid.min.js"></script>
    <title>share</title>
</head>

<body>
    <div class="${themeName}">${mdStore().noEchart}</div>
</body>
<script>
    mermaid.init(undefined, document.querySelectorAll(".mermaid"));
    document.querySelectorAll(".md-echarts").forEach((element) => {
    try {
      let options = JSON.parse(element.textContent);
      let chart = echarts.init(element);
      chart.setOption(options);
    } catch (e) {
      element.outerHTML = '<pre>echarts complains: '+e+'</pre>';
    }
  })
  // 制作流程图
          document.querySelectorAll(".md-flowchart").forEach((element) => {
            try {
              let code = element.textContent;
              let chart = flowchart.parse(code);
              element.textContent = "";
              chart.drawSVG(element);
            } catch (e) {
              element.outerHTML = '<pre>flowchart complains:'+e+'</pre>';
            }
          });
  </script>`;
  }
  else {
    content = toRaw(mdStore().editor).getValue();
  }
  // 定义触发事件的DOM
  const aLink = document.createElement('a');
  // 创建文件
  const file = new File([content], { type });
  // 定义下载文件名称
  aLink.download = fileName;
  // 根据File对象创建文件 dataURL
  aLink.href = URL.createObjectURL(file);
  // 触发事件下载
  aLink.click();
  isTip.value = false;
}