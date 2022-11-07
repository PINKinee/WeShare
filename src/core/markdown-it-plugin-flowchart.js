module.exports= (md) => {
  const temp = md.renderer.rules.fence.bind(md.renderer.rules)
  md.renderer.rules.fence = (tokens, idx, options, env, slf) => {
    const token = tokens[idx]
    if (token.info === 'flow') {
      console.log(token);
      const code = token.content.trim();
      return `<div line=${parseInt(token.map[0])} class="md-flowchart">${code}</div>`
    }
    return temp(tokens, idx, options, env, slf)
  }
}
