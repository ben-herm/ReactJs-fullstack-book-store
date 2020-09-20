const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

const port = 5500
//Import routes

mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)
mongoose.set('useNewUrlParser', true)
mongoose.set('useUnifiedTopology', true)
mongoose.connect(process.env.ATLAS_CONNECT, { useNewUrlParser: true }, () =>
  console.log('DB connected')
)
const handleUsers = require('./routes/handleUsers')
const handleBooks = require('./routes/handleBooks')
const addNewBook = require('./routes/addNewBook')

app.use(bodyParser.json())
app.use('/images', express.static('images'))
app.use(express.static(path.join(__dirname, 'client/build')))
// app.use(express.static(path.join(__dirname, "public")));

app.use('/', handleBooks)
app.use('/user', handleUsers)
app.use('/', addNewBook)
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'client/build/index.html'), function (err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.listen(port, () => console.log(`Server started on port ${port}`))
