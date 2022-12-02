import ediStore from '@/store/codemirror'
// const operateList = [
//     {
//       type: 'bold', // 加粗
//       prefix: '**',
//       suffix: '**',
//       keys: ''
//     }, {
//       type: 'del', // 删除线
//       prefix: '~~',
//       suffix: '~~',
//       keys: ''
//     }, {
//       type: 'underline', // 下划线
//       prefix: '++',
//       suffix: '++',
//       keys: ''
//     }, {
//       type: 'italic', // 斜体
//       prefix: '*',
//       suffix: '*',
//       keys: ''
//     }, {
//       type: 'quote', // 引用
//       prefix: '\n> ',
//       suffix: '',
//       keys: ''
//     }, {
//       type: 'bookmark', // 标记
//       prefix: '==',
//       suffix: '==',
//       keys: ''
//     }, {
//       type: 'superscript', // 上角标
//       prefix: '^',
//       suffix: '^',
//       keys: ''
//     }, {
//       type: 'subscript', // 下角标
//       prefix: '~',
//       suffix: '~',
//       keys: ''
//     }, {
//       type: 'h1', // 标题1
//       prefix: '# ',
//       suffix: '',
//       keys: ''
//     }, {
//       type: 'h2', // 标题2
//       prefix: '## ',
//       suffix: '',
//       keys: ''
//     }, {
//       type: 'h3', // 标题3
//       prefix: '### ',
//       suffix: '',
//       keys: ''
//     }, {
//       type: 'h4', // 标题4
//       prefix: '#### ',
//       suffix: '',
//       keys: ''
//     }, {
//       type: 'h5', // 标题5
//       prefix: '##### ',
//       suffix: '',
//       keys: ''
//     }, {
//       type: 'h6', // 标题6
//       prefix: '###### ',
//       suffix: '',
//       keys: ''
//     }, {
//       type: 'alignLeft', // 居左
//       prefix: '\n::: le-left \n',
//       suffix: '\n:::',
//       keys: ''
//     }, {
//       type: 'alignCenter', // 居中
//       prefix: '\n::: le-center \n',
//       suffix: '\n:::',
//       keys: ''
//     }, {
//       type: 'alignRight', // 居右
//       prefix: '\n::: le-right \n',
//       suffix: '\n:::',
//       keys: ''
//     }, {
//       type: 'ol', // 有序列表
//       prefix: '1. ',
//       suffix: '',
//       keys: ''
//     }, {
//       type: 'ul', // 无序列表
//       prefix: '- ',
//       suffix: '',
//       keys: ''
//     }, {
//       type: 'hr', //  分割线
//       prefix: '--- ',
//       suffix: '',
//       keys: ''
//     }, {
//       type: 'link', //  链接
//       prefix: '[title](',
//       suffix: ')',
//       keys: ''
//     }, {
//       type: 'inlineCode', // 行内代码
//       prefix: '`',
//       suffix: '`',
//       keys: ''
//     }, {
//       type: 'code', //  代码块
//       prefix: '```\n',
//       suffix: '\n```',
//       keys: ''
//     }, {
//       type: 'image',
//       prefix: '![test](',
//       suffix: ')',
//       keys: ''
//     }
//   ]
  
  const table = {
    justify: '-------- |',
    left: ':------- |',
    center: ':------: |',
    right: '-------: |'
  }
  
//   const IMAGE_PATTERN = /^!\[(.*)\]\((.*)\)$/;
  
  // 存入图片
  export const insertImg = ( data, type = "markdown", val = -1) => {
    if (type === "imgTag") {
      let sizeStr = "";
      if (val === -1) {
        sizeStr = 'width="100" height="100"';
      } else {
        sizeStr = `style="zoom:${val}%"`;
      }
      insertText({
        type: 'imgTag',
        prefix: '<img src="',
        suffix: `${data.url}" alt="${data.title}" ${sizeStr} />`
      }, '')
    } else {
      insertText({
        type: 'image',
        prefix: '![',
        suffix: '](' + data.url + ')'
      }, data.title)
    }
  }
  
  // 放入表格
  export const insertTable = (tableInfo) => {
    let tempStr = '\n'
    for (let i = 0; i <= tableInfo.rows + 1; i++) {
      for (let j = 1; j <= tableInfo.cols; j++) {
        if (i === 0) {
          tempStr += 'Header ' + j + ' |'
        } else if (i === 1) {
          tempStr += table[`${tableInfo.type}`]
        } else {
          tempStr += ('row ' + (i - 1) + ' col ' + j + ' |')
        }
      }
      tempStr += '\n'
    }
    insertText({
      type: 'table',
      prefix: tempStr,
      suffix: ''
    }, '')
  }

  
  function insertText(operate, placeholder) {
    const startPos = ediStore().md.getCursor('from')
    const endPos = ediStore().md.getCursor('to')
    const tmpStr = ediStore().md.getSelection()
    const prefix = operate.prefix
    const suffix = operate.suffix
    if (operate.type === 'imgTag') {
      let str = `${prefix}${suffix}\n`
      ediStore().md.replaceSelection(str)
      // ediStore().md.setSelection({line: startPos.line, ch: startPos.ch - prefix.length}, {
      //   line: endPos.line,
      //   ch: endPos.ch - (endPos.line === startPos.line ? str.length : 0)
      // })
    } else if (tmpStr === '' || operate.type === 'image' || operate.type === 'table') {
      // 直接插入
      ediStore().md.replaceSelection(prefix + placeholder + suffix)
      ediStore().md.setSelection({line: startPos.line, ch: startPos.ch + prefix.length}, {
        line: endPos.line,
        ch: endPos.ch + placeholder.length + (endPos.line === startPos.line ? prefix.length : 0)
      })
    } else {
      // 如果选中了文字
      const str = ediStore().md.getRange({line: startPos.line, ch: startPos.ch - prefix.length}, {
        line: endPos.line,
        ch: endPos.ch + suffix.length
      })
      if (str === prefix + tmpStr + suffix) {
        // 移除语法
        ediStore().md.setSelection({line: startPos.line, ch: startPos.ch - prefix.length}, {
          line: endPos.line,
          ch: endPos.ch + prefix.length
        })
        ediStore().md.replaceSelection(tmpStr)
        ediStore().md.setSelection({line: startPos.line, ch: startPos.ch - prefix.length}, {
          line: endPos.line,
          ch: endPos.ch - (endPos.line === startPos.line ? prefix.length : 0)
        })
      } else {
        // 添加语法
        ediStore().md.replaceSelection(prefix + tmpStr + suffix)
        ediStore().md.setSelection({line: startPos.line, ch: startPos.ch + prefix.length}, {
          line: endPos.line,
          ch: endPos.ch + (endPos.line === startPos.line ? prefix.length : 0)
        })
      }
    }
    ediStore().md.focus()
  }