const fetch = require('node-fetch')
const http = require('http')
const https = require('https')

const httpAgent = new http.Agent({
  keepAlive: true,
  keepAliveMsecs: 10000,
  maxSockets: 32768,
  maxFreeSockets: 256
})

const httpsAgent = new https.Agent({
  keepAlive: true,
  keepAliveMsecs: 10000,
  maxSockets: 32768,
  maxFreeSockets: 256
})

// TODO: RV: how to use CONFIG here..??
const GQL_URL = 'http://localhost:4000/graphql'

// Fetch all translations
export default async (keys, culture) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'User-Agent': 'Stackbee.io Electron/1.0 - I18N Helper'
    }

    const translationQuery = {
      query: `query GET_TRANSLATIONS {
      translations(culture: "${culture}", keys: ${JSON.stringify(keys)}) {
        translations {
          cacheId
          value
          key
        }
      }
    }`
    }

    const data = await fetch(GQL_URL, {
      method: 'POST',
      agent: GQL_URL.startsWith('https') ? httpsAgent : httpAgent,
      headers,
      timeout: 30000,
      body: JSON.stringify(translationQuery)
    })
    const json = await data.json()
    return json.data.translations.translations
  } catch (e) {
    console.error(e)
  }

  return []
}
