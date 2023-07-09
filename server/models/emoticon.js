const mongoose = require('mongoose')

const emoticonSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  emoticon: String,
  message: String
})

const Emoticon = mongoose.model('Emoticon', emoticonSchema)

module.exports = Emoticon
