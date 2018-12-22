const postcss = require('postcss')
module.exports = (mixin, padding, full) => {
  const classNames = ['.col', '.colAuto']
  for (let i = 0, len = 12; i < len; i++) {
    classNames.push(`.col${i + 1}`)
  }

  classNames.push('.colXs')
  classNames.push('.colXsAuto')
  for (let i = 0, len = 12; i < len; i++) {
    classNames.push(`.colXs${i + 1}`)
  }

  classNames.push('.colSm')
  classNames.push('.colSmAuto')
  for (let i = 0, len = 12; i < len; i++) {
    classNames.push(`.colSm${i + 1}`)
  }

  classNames.push('.colMd')
  classNames.push('.colMdAuto')
  for (let i = 0, len = 12; i < len; i++) {
    classNames.push(`.colMd${i + 1}`)
  }

  classNames.push('.colLg')
  classNames.push('.colLgAuto')
  for (let i = 0, len = 12; i < len; i++) {
    classNames.push(`.colLg${i + 1}`)
  }

  classNames.push('.colXl')
  classNames.push('.colXlAuto')
  for (let i = 0, len = 12; i < len; i++) {
    classNames.push(`.colXl${i + 1}`)
  }

  const rule = postcss.rule({ selector: classNames.join(', ') })
  rule.append({
    prop: 'position',
    value: 'relative'
  })
  rule.append({
    prop: 'width',
    value: '100%'
  })
  rule.append({
    prop: 'min-height',
    value: '1px'
  })
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
