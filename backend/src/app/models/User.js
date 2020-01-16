import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  name: String,
  github_username: String,
  bio: String,
  avatar_url: String,
  techs: [String]
})

export default mongoose.model('User', UserSchema)
