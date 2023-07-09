const mongoose = require('mongoose')

const connect = async () => {
  try {
    const uri = process.env.MONGODB_URI // Get the MongoDB URI from environment variables

    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    console.log('Connected to MongoDB')
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err)
    process.exit(1)
  }
}

module.exports = { connect }
