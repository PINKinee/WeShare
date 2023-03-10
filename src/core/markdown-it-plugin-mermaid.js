import mermaid from 'mermaid'

const mermaidChart = (code, token) => {
  try {
    mermaid.parse(code)
    return `<div line=${parseInt(token.map[0])} class="mermaid">${code}</div>`
  } catch ({ str, hash }) {
    return `<pre line=${parseInt(token.map[0])}>${str}</pre>`
  }
}

const MermaidPlugin = (md, opts) => {
  md.mermaid = mermaid
  opts = opts || {
    theme: 'default'
  }
  mermaid.initialize(opts)

  const temp = md.renderer.rules.fence.bind(md.renderer.rules)
  md.renderer.rules.fence = (tokens, idx, options, env, slf) => {
    const token = tokens[idx]
    const code = token.content.trim()
    if (token.info === 'mermaid') {
      return mermaidChart(code, token)
    }
    const firstLine = code.split(/\n/)[0].trim()
    if (firstLine === 'gantt' || firstLine === 'sequenceDiagram' || firstLine.match(/^graph (?:TB|BT|RL|LR|TD);?$/)) {
      return mermaidChart(code, token)
    }
    return temp(tokens, idx, options, env, slf)
  }
}

export default MermaidPlugin
