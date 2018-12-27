// const languages = require('../../../@constants/language')
// const fetchTranslations = require('./fetchTranslations')

module.exports = {
  getMessagesForKeys: (keys, messages) => {
    const translations = {}
    Object.keys(messages).forEach(lang => {
      translations[lang] = {}
      const translationsForLang = messages[lang]
      Object.keys(translationsForLang).forEach(key => {
        if (keys.includes(key)) {
          translations[lang][key] = translationsForLang[key]
        }
      })
    })

    return translations
  },

  findKeysToTranslate: template => {
    // Find __(xxx) and __(xxx, xxx) occurrences in bundle
    const matches = template.match(/__\((?:[\r\n\t\s]|"|')*((?:\w|\d|\s|\,|\.|\?|\:|\[|\]|\/|{|})*)(?:"|')(\)*)/g)

    let keysToTranslate = []
    if (matches) {
      keysToTranslate = matches
        .map(match => {
          let result = match
            .replace(/__\(/i, '')
            .replace(/\)/i, '')
            .trim()

          // strip any leading " or ' away
          result = result.substring(1)

          // TODO: check cases like these again! they must be like \' or \"
          if (result.includes('"')) {
            result = result.split('"').shift()
          }

          if (result.includes("'")) {
            result = result.split("'").shift()
          }

          return result
        })
        .filter(key => key !== '')
    }

    return keysToTranslate
  },

  fetchTranslationsForAllLangs: async (keys, asArray) => {
    if (keys.length === 0) {
      return null
    }

    const translations = await Promise.all(
      Object.keys(languages).map(async key => {
        const lang = languages[key]
        return { [lang.iso]: await fetchTranslations(keys, lang.ietf) }
      })
    )

    // Format the fetched translations
    if (asArray) {
      // Used in prod mode where we have optimized translations per route
      const normalizedTranslations = {}
      translations.forEach(translation => {
        const lang = Object.keys(translation)[0]
        normalizedTranslations[lang] = translation[lang]
      })

      return normalizedTranslations
    }

    const normalizedTranslations = {}
    translations.forEach(translation => {
      const lang = Object.keys(translation)[0]
      normalizedTranslations[lang] = {}
      if (translation[lang]) {
        translation[lang].forEach(translationEntry => {
          normalizedTranslations[lang][translationEntry.key] = translationEntry.value
        })
      } else {
        console.warn('no translation', lang, translation)
      }
    })

    return normalizedTranslations
  }
}
