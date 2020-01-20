import 'dotenv/config'
import mongoose from 'mongoose'

const { HOST, DATABASE } = process.env

const url = `mongodb://${HOST}/${DATABASE}`
const opts = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
}

class Database {
  init () {
    mongoose.connect(url, opts, (err) => {
      if (!err) {
        console.log('MongoDB Connection Succeeded.')
      } else {
        console.log('Error in DB connection: ' + err)
      }
    })
  }
}

export default new Database()
