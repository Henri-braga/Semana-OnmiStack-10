import mongoose from 'mongoose'
import PointSchema from '../utils/pointSchema'

const SoutherSchema = new mongoose.Schema({
  name: String,
  email: String,
  avatar: [String],
  address: String,
  techs: [String],
  office: String,
  status: String,
  location: {
    type: PointSchema,
    index: '2dsphere'
  }
})

export default mongoose.model('Souther', SoutherSchema)
