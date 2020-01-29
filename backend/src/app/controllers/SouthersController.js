import Southers from '../models/Souter'

import geoLocation from '../../services/api'
import parseStringAsArray from '../utils/parseStringAsArray'
import randonColor from '../utils/colorGenerator'
import FirstLetter from '../utils/firstNameGenerator'

class UserController {
  async index (req, res) {
    const users = await Southers.find({})

    return res.status(200).json(users)
  }

  async show (req, res) {
    const { id } = req.params

    const souther = await Southers.findById({ _id: Object(`${id}`) })

    return res.status(200).json(souther)
  }

  async store (req, res) {
    const { name, email, address, techs, office, status, work } = req.body

    const techArray = parseStringAsArray(techs)

    await geoLocation(address)

    const { lat, lng } = await geoLocation(address)

    const latitude = lat
    const longitude = lng

    const avatar = [randonColor, FirstLetter(name)]

    const location = {
      type: 'Point',
      coordinates: [longitude, latitude]
    }

    const souther = await Southers.create({
      name,
      email,
      techs: techArray,
      address,
      office,
      status,
      work,
      avatar,
      location
    })

    return res.status(200).json(souther)
  }

  async update (req, res) {
    const { id } = req.params

    const souther = await Southers.findByIdAndUpdate(id, req.body, {
      new: true
    })

    return res.status(200).json(souther)
  }

  async delete (req, res) {
    const { id } = req.params

    await Southers.findByIdAndRemove(id)

    return res.status(204).json({ message: 'Souther removed.' })
  }
}

export default new UserController()
