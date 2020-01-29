import { API_URL, API_KEY }  from '../constants';
import axios from 'axios';

const gmapsService = axios.create({
  baseURL: API_URL
})

const doRequest = (address) => {
  return gmapsService.get(null, {
    params: {
      key: API_KEY,
      address
    }
  }).then(response => response.data)
}

const getApiUrl = (address) => {
  return `${API_URL}?key=${API_KEY}&address=${encodeURI(address)}`
}

async function getGeolocation (address) {
  const data = await doRequest(address)

  if (!data || data.error_message) {
    const message = (data && data.error_message) ? data.error_message : 'Api Error'

    return message
  }

  return data.results[0].geometry.location
}

export default getGeolocation
