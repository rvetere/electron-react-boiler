const path = require('path')
const fs = require('fs')
const helpers = require('./helpers')

// This function gets prepended to each bundle that contains translations
// It has to be ES5 as it gets prepended after babel transformation
const translationFunction = function __(key, interpolations) {
  var translationsByLanguage = typeof window === 'undefined' ? translations[global.__languageId__] : window.translations[window.__languageId__]
  var translation = key
  if (translationsByLanguage && translationsByLanguage[key]) {
    translation = translationsByLanguage[key]
  }

  if (interpolations && interpolations.length) {
    interpolations.forEach(function(interpolation, i) {
      translation = translation.replace(`[${i}]`, interpolation).replace(`{${i}}`, interpolation)
    })
  }

  return translation
}

const addMergeFnToWinFunction = function addMergeFnToWin() {
  if (!window._merge) {
    window._merge = function(a, b) {
      for (var attr in b) {
        a[attr] = b[attr]
      }
    }
  }
}

const replaceInFile = async (asset, messages) => {
  let template = fs.readFileSync(asset.existsAt, 'utf8')

  const keysToTranslate = helpers.findKeysToTranslate(template)

  console.log('keys', keysToTranslate)
  // if (keysToTranslate.length) {
  //   const normalizedTranslations = helpers.getMessagesForKeys(keysToTranslate, messages)
  //   const normalizedTranslationsAsString = JSON.stringify(normalizedTranslations)

  //   try {
  //     // The string we prepend to each server side bundle
  //     const stringToPrependServer = `var translations = ${normalizedTranslationsAsString}; ${translationFunction.toString()}`

  //     // Merge the translations for the current bundle with any existing translations from window.translations client side
  //     let translationMergeString = ''
  //     Object.keys(languages).forEach(lang => {
  //       const stringifiedTranslations = JSON.stringify(normalizedTranslations[lang])
  //       translationMergeString += `window._merge(window.translations.${lang}, ${stringifiedTranslations});`
  //     })

  //     // The string we prepend to each client side bundle
  //     const stringToPrependClient = `(${addMergeFnToWinFunction.toString()})(); if (window.translations) { ${translationMergeString} } else { window.translations = ${normalizedTranslationsAsString}; } ${translationFunction.toString()}`

  //     // Prepend the translations/translation function to the bundle
  //     template = src.includes('server') ? stringToPrependServer.concat(template) : stringToPrependClient.concat(template)

  //     fs.writeFileSync(src, template)
  //   } catch (e) {
  //     console.error(e)
  //   }
  // }
}

module.exports = class I18nProdPlugin {
  apply(compiler) {
    compiler.hooks.done.tap('done', (statsData, ba) => {
      if (statsData.hasErrors()) {
        return
      }

      Object.keys(statsData.compilation.assets).forEach(assetName => {
        if (assetName.endsWith('.js')) {
          const asset = statsData.compilation.assets[assetName]
          replaceInFile(asset)
        }
      })
    })
  }
}
