const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const db = require('./db')
const emoticonRoutes = require('./routes/emoticonRoutes')
const userRoutes = require('./routes/userRoutes')

const app = express()
app.use(cors())
app.use(express.json())

const result = dotenv.config()
if (result.error) {
  throw result.error
}

const port = process.env.PORT || 8081

db.connect()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`)
    })
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err)
    process.exit(1)
  })

app.use('/emoticons', emoticonRoutes)
app.use('/', userRoutes)

module.exports = app
