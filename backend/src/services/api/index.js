const request = require('request')

const API_URL = 'https://maps.googleapis.com/maps/api/geocode/json'
const API_KEY = 'AIzaSyDD9b-nucIDoIWfXLX25dTvI8e4Ezw8zos'
const address = 'Protasio Alves 758, Porto Alegre/RS'

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

(async () => {
  const apiUrl = getApiUrl(address)
  const data = await doRequest(apiUrl)

  if (!data || data.error_message) {
    const message = (data && data.error_message) ? data.error_message : 'Api Error'
    console.log(message)
    return
  }

  console.log(data.results[0].geometry.location)
})()
