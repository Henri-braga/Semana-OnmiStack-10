import app from './index'
import 'dotenv/config'

const { PORT } = process.env

app.listen(PORT, _err => {
  try {
    console.log(`Server running PORT: ${PORT}`)
  } catch (_err) {
    console.log('Internal server error')
  }
})
