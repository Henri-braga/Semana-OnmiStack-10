import Southers from '../models/Souter'
import parseStringAsArray from '../utils/parseStringAsArray'
import defaultDistance from '../../constants/index'

console.log(defaultDistance)
class SoutherSearchController {
  async index (req, res) {
    const { techs, distance } = req.query

    const techsArray = parseStringAsArray(techs)

    const latitude = -30.1060294
    const longitude = -51.2480132
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

    return res.json({ devs })
  }
}

export default new SoutherSearchController()
