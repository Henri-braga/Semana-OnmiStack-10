const request = require('request')
require('dotenv/config')

const { API_URL, API_KEY } = process.env

const parseJson = (string) => {
  try {
    return JSON.parse(string)
  } catch (e) {
    return null
  }
}

const doRequest = (url) => {
  const promisseCallback = (resolve, reject) => {
    request(url, (error, response, body) => {
      if (error) reject(error)
      const data = parseJson(body)
      resolve(data)
    })
  }
  return new Promise(promisseCallback)
}

const getApiUrl = (address) => {
  return `${API_URL}?key=${API_KEY}&address=${encodeURI(address)}`
}

async function getGeolocation (address) {
  const apiUrl = getApiUrl(address)
  const data = await doRequest(apiUrl)

  if (!data || data.error_message) {
    const message = (data && data.error_message) ? data.error_message : 'Api Error'

    return message
  }

  return data.results[0].geometry.location
}

module.exports = getGeolocation
