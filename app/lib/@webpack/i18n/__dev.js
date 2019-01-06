const messages = require('./messages.json')

export default (key, interpolations) => {
  const lang = localStorage.getItem('lang') || 'de'

  let translation = key
  if (messages[lang] && messages[lang][key]) {
    translation = messages[lang][key]
  }

  if (interpolations && interpolations.length) {
    interpolations.forEach(function(interpolation, i) {
      translation = translation.replace(`[${i}]`, interpolation).replace(`{${i}}`, interpolation)
    })
  }

  return translation
}
