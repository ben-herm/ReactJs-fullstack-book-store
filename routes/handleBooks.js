const router = require('express').Router()
const BooksSchema = require('../schemes/booksSchema')
const verify = require('../middleware/auth')
const fs = require('fs')
router.get('/books', async (req, res) => {
  const book = await BooksSchema.find()
  res.json(book)
})
router.delete('/deleteBook', verify, (req, res) => {
  const { id, cover } = req.body
  BooksSchema.deleteOne({ _id: id }, err => {
    if (err) {
      res.status(400).json(err)
    } else {
      res.status(200).json('This book was deleted')
      fs.unlink(cover, err => {
        if (err) console.log(err)
      })
    }
  })
})
module.exports = router
