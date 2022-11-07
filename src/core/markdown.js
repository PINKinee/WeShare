const sub = require('markdown-it-sub')
const sup = require('markdown-it-sup')
const katex = require('@iktakahiro/markdown-it-katex')
const deflist = require('markdown-it-deflist')
const taskLists = require('markdown-it-task-lists') // 任务清单
const toc = require('markdown-it-toc') // @[toc](Title)
const emoji = require('markdown-it-emoji')
const footnote = require('markdown-it-footnote')
const container = require('markdown-it-container')
const abbr = require('markdown-it-abbr')
const mark = require('markdown-it-mark')
const ins = require('markdown-it-ins')
const flowchart = require('./markdown-it-plugin-flowchart');
const MarkdownIt = require('markdown-it');
import echart from './markdown-it-plugin-echarts'
import latex from 'markdown-it-latex'
import mermaid from './markdown-it-plugin-mermaid'
import code from './markdown-it-highlight'
var md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
})
const injectLineNumbers = (tokens, idx, options, env, slf) => {
  var line;
  if (tokens[idx].map && tokens[idx].level === 0) {
    line = tokens[idx].map[0];
    tokens[idx].attrJoin('class', 'line');
    tokens[idx].attrSet('data-line', String(line));
  }
  return slf.renderToken(tokens, idx, options, env, slf);
}
for (let i in md.renderer.rules) {
  i = injectLineNumbers;
}
md.use(emoji)// 表情
  .use(deflist)// /*...*/ 解析后 /.../
  .use(taskLists)// 任务
  .use(container)// 块级容器
  .use(mark)
  .use(ins)
  .use(container, 'le-left') /* align left */
  .use(container, 'le-center')/* align center */
  .use(container, 'le-right')/* align right */
  .use(sub)
  .use(sup)
  .use(katex)
  .use(footnote)
  .use(abbr)// 缩写
  .use(toc)
  .use(code)
  .use(flowchart)
  .use(mark)
  .use(latex)
  .use(echart)
  .use(mermaid)
const makeSafe = function (label) {
  return label.replace(/[^\w\s]/gi, '').split(' ').join('_')
}
md.renderer.rules.code_block = function (tokens, idx, options, env, slf) {
  const token = tokens[idx]
  return '<pre class="hljs"' + ' line="' + parseInt(token.map[0]) + '"' + slf.renderAttrs(token) + '><code>' +
    md.utils.escapeHtml(tokens[idx].content) +
    '</code></pre>\n'
}
md.renderer.rules.heading_open = function (tokens, index) {
  const level = tokens[index].tag
  const label = tokens[index + 1]
  if (label.type === 'inline') {
    const anchor = makeSafe(label.content) + '_' + label.map[0]
    return '<' + level + ' line="' + parseInt(label.map[0]) + '"><a id="' + anchor + '"></a>'
  } else {
    return '</h1>'
  }
}

md.renderer.rules.paragraph_open = function (tokens, idx) {
  const label = tokens[idx];
  return '<p' + ' line="' + parseInt(label.map[0]) + '">';
}

md.renderer.rules.hr = function (tokens, idx) {
  const label = tokens[idx]
  return '<hr' + ' line="' + (parseInt(label.map[0])) + '"></hr>'
}

md.renderer.rules.blockquote_open = function (tokens, idx) {
  const label = tokens[idx]
  return '<blockquote' + ' line="' + (parseInt(label.map[0])) + '">'
}

md.renderer.rules.table_open = function (tokens, idx) {
  const label = tokens[idx]
  return '<table' + ' line="' + parseInt(label.map[0]) + '">'
}

md.renderer.rules.bullet_list_open = function (tokens, idx) {
  const label = tokens[idx]
  return '<ul' + ' line="' + parseInt(label.map[0]) + '">'
}

md.renderer.rules.ordered_list_open = function (tokens, idx) {
  const label = tokens[idx]
  return '<ol' + ' line="' + parseInt(label.map[0]) + '">'
}

var defaultRender = md.renderer.rules.link_open || function (tokens, idx, options, env, self) {
  return self.renderToken(tokens, idx, options)
}
md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
  // 获取属性target的索引号，如果小于0说明没有该属性
  var aIndex = tokens[idx].attrIndex('target')
  if (aIndex < 0) {
    tokens[idx].attrPush(['target', '_blank']) // add new attribute
  } else {
    tokens[idx].attrs[aIndex][1] = '_blank' // replace value of existing attr
  }
  return defaultRender(tokens, idx, options, env, self)
}

export default md;