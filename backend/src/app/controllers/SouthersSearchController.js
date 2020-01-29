import Southers from '../models/Souter'
import parseStringAsArray from '../utils/parseStringAsArray'
import defaultDistance from '../../constants/index'
import geoLocation from '../../services/api'

class SoutherSearchController {
  async index (req, res) {
    const { techs, distance, work, address } = req.query

    const techsArray = parseStringAsArray(techs)
    console.log('techs', techs, 'distance', distance, 'work', work, 'address', address)

    if (!address && !techs) {
      return res.status(404).json({ erro: 'technologies and address are required' })
    }

    const { lat, lng } = await geoLocation(address)

    const latitude = lat
    const longitude = lng
    let distanceValue = ''

    distance ? distanceValue = distance : distanceValue = defaultDistance

    const devs = await Southers.find({
      techs: {
        $in: techsArray
      },
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude]
          },
          $maxDistance: distanceValue
        }
      }
    })

    console.log(devs)
    return res.json(devs)
  }
}

export default new SoutherSearchController()
