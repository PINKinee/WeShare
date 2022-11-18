export default (md) => {
  const temp = md.renderer.rules.fence.bind(md.renderer.rules)
  md.renderer.rules.fence = (tokens, idx, options, env, slf) => {
    const token = tokens[idx]
    if (token.info === 'echarts') {
      const code = token.content.trim()
      try {
        const json = JSON.parse(code)
        const width = json.width || 500
        const height = json.height || 400
        const content = `<div line=${parseInt(token.map[0])} style="width:${width}px;height:${height}px" class="md-echarts">${JSON.stringify(json)}</div>`;
        return content;
      } catch (e) { // JSON.parse exception
        return `<pre line=${parseInt(token.map[0])}>${e}</pre>`
      }
    }
    return temp(tokens, idx, options, env, slf)
  }
}
