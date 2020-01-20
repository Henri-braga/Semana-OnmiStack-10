import Devs from '../models/Devs'
import getUser from '../../services/api/index'
import parseStringAsArray from '../utils/parseStringAsArray'

class UserController {
  async index (req, res) {
    const users = await Devs.find({})

    return res.status(200).json(users)
  }

  async store (req, res) {
    const { github_username, techs, latitude, longitude } = req.body

    const api = await getUser(github_username)

    const { name = login, avatar_url, bio } = api.data

    const techArray = parseStringAsArray(techs)

    const location = {
      type: 'Point',
      coordinates: [longitude, latitude]
    }

    const user = await Devs.create({
      github_username,
      name,
      avatar_url,
      bio,
      techs: techArray,
      location
    })

    return res.status(200).json(user)
  }
}

export default new UserController()
