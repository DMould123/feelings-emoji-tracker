const express = require('express')
const Emoticon = require('../models/emoticon')

const router = express.Router()

router.post('/', (req, res) => {
  const { emoticon, message } = req.body
  const newEmoticon = new Emoticon({ emoticon, message })

  newEmoticon
    .save()
    .then((savedEmoticon) => {
      console.log('Emoticon saved:', savedEmoticon)
      res.sendStatus(200)
    })
    .catch((err) => {
      console.error('Failed to insert emoticon:', err)
      res.sendStatus(500)
    })
})

router.get('/', (req, res) => {
  Emoticon.find({})
    .then((results) => {
      console.log('Emoticon data retrieved:', results)
      res.send(results)
    })
    .catch((err) => {
      console.error('Failed to retrieve emoticon data:', err)
      res.sendStatus(500)
    })
})

router.put('/:id', (req, res) => {
  const { id } = req.params
  const { emoticon, message } = req.body

  Emoticon.findByIdAndUpdate(id, { emoticon, message }, { new: true })
    .then((updatedEmoticon) => {
      console.log('Emoticon data updated:', updatedEmoticon)
      res.sendStatus(200)
    })
    .catch((err) => {
      console.error('Failed to update emoticon data:', err)
      res.sendStatus(500)
    })
})

router.delete('/:id', (req, res) => {
  const { id } = req.params

  Emoticon.findByIdAndDelete(id)
    .then(() => {
      console.log('Emoticon data deleted')
      res.sendStatus(200)
    })
    .catch((err) => {
      console.error('Failed to delete emoticon data:', err)
      res.sendStatus(500)
    })
})

module.exports = router
