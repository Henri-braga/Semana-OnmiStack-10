import axios from 'axios'
import { response } from 'express'

async function getUser (github_username) {
  try {
    const response = await axios.get(`https://api.github.com/users/${github_username}`)

    return response
  } catch (err) {
    console.error(err)
  }
}

export default getUser
