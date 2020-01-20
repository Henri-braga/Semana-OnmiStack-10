import mongoose from 'mongoose'
import PointSchema from '../utils/pointSchema'

const UserSchema = new mongoose.Schema({
  name: String,
  github_username: String,
  bio: String,
  avatar_url: String,
  techs: [String],
  location: {
    type: PointSchema,
    index: '2dsphere'
  }
})

export default mongoose.model('Devs', UserSchema)
