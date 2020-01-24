import 'dotenv/config'
import axios from 'axios'

async function getUser (github_username) {
  try {
    const response = await axios.get(`https://api.github.com/users/${github_username}`)

    console.log(response.data)
    return response
  } catch (err) {
    console.error(err)
  }
}

export default getUser
