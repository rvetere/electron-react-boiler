const postcss = require('postcss')
module.exports = (mixin, padding, full) => {
  const classNames = ['.col']
  for (let i = 0, len = 12; i < len; i++) {
    classNames.push(`.col${i + 1}`)
  }

  for (let i = 0, len = 12; i < len; i++) {
    classNames.push(`.colXs${i + 1}`)
  }

  for (let i = 0, len = 12; i < len; i++) {
    classNames.push(`.colSm${i + 1}`)
  }

  for (let i = 0, len = 12; i < len; i++) {
    classNames.push(`.colMd${i + 1}`)
  }

  for (let i = 0, len = 12; i < len; i++) {
    classNames.push(`.colLg${i + 1}`)
  }

  for (let i = 0, len = 12; i < len; i++) {
    classNames.push(`.colXl${i + 1}`)
  }

  const rule = postcss.rule({ selector: classNames.join(', ') })
  rule.append({
    prop: 'padding-right',
    value: padding
  })
  rule.append({
    prop: 'padding-left',
    value: padding
  })
  mixin.replaceWith(rule)
}
