const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
  fullname: {
    type: String,
    require: false
  },
  email: {
    type: String,
    require: true
  },
  nickName: {
    type: String,
    require: false
  },
  password: {
    type: String,
    require: false
  },
  phone: {
    type: String,
    require: false
  },
  registerDate: {
    type: String,
    require: false
  },
  isAdmin: {
    type: Boolean,
    require: false
  },
  purchsedBooks: {
    type: Array,
    require: false
  }
})

module.exports = mongoose.model('users', userSchema)
