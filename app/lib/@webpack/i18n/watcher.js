const fs = require('fs')
const path = require('path')
const chokidar = require('chokidar')
const debounce = require('lodash.debounce')
const helpers = require('./helpers')

const MESSAGES_PATH = path.resolve(process.cwd(), 'app', 'lib', '@webpack', 'i18n', 'messages.json')
const PATHS_TO_WATCH = [path.resolve(process.cwd(), 'app')]

module.exports = class I18nWatcher {
  constructor() {
    // watch all files in project dir, ignores .dotfiles
    this.watcher = chokidar.watch(PATHS_TO_WATCH, { ignored: /(^|[\/\\])\../, persistent: true })

    this.messages = {}
    this.debouncedWriteMessages = debounce(() => {
      console.log('I18N-WATCHER: write messages.json!', MESSAGES_PATH)
      const json = JSON.stringify(this.messages, null, 0)
      fs.writeFileSync(MESSAGES_PATH, json)
    }, 490)

    this.keysBatch = {}
    this.debouncedFetchKeys = debounce(async (resolve, event) => {
      const keys = Object.keys(this.keysBatch)
      console.log('I18N-WATCHER: collected ' + keys.length + ' keys to fetch now!')
      const translations = await helpers.fetchTranslationsForAllLangs(keys)
      this.writeMessagesFile(translations)
      if (event === 'add') {
        resolve(this.messages)
      }
    }, 800)
  }

  start() {
    return new Promise((resolve, reject) => {
      this.watcher
        .on(
          'add',
          function(pathName) {
            this.scanFile(pathName, 'add', resolve)
          }.bind(this)
        )
        .on(
          'change',
          function(pathName) {
            this.scanFile(pathName, 'change')
          }.bind(this)
        )
        .on('unlink', function(pathName) {
          console.log('I18N-WATCHER: File', pathName, 'has been removed')
        })
        .on('error', function(error) {
          console.error('I18N-WATCHER: Error happened', error)
        })
    })
  }

  stop() {
    this.watcher.close()
    console.log('I18N-WATCHER: stop watching!')
  }

  async scanFile(pathName, event, resolve) {
    const testJs = /\.js$/
    const testTs = /\.ts$/
    const testTsx = /\.tsx$/

    if ((testJs.test(pathName) || testTs.test(pathName) || testTsx.test(pathName)) && !pathName.includes('__tests__') && !pathName.includes('d.ts')) {
      const template = fs.readFileSync(pathName, 'utf8')
      const keys = helpers.findKeysToTranslate(template)
      if (keys.length > 0) {
        keys.forEach(k => (this.keysBatch[k] = k))
        this.debouncedFetchKeys(resolve, event)
      }
    }
  }

  async writeMessagesFile(languageTranslations) {
    // update local store "this.messages"
    Object.keys(languageTranslations).forEach(lang => {
      if (!this.messages[lang]) {
        this.messages[lang] = {}
      }

      const translations = languageTranslations[lang]
      Object.keys(translations).forEach(key => {
        this.messages[lang][key] = translations[key]
      })
    })

    // write this.messages down to "/intl/messages.json", batch-wise
    this.debouncedWriteMessages()
  }
}
