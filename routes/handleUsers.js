const router = require('express').Router()
let UserSchema = require('../schemes/userSchema')
const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const verify = require('../middleware/auth')

router.put('/addPurchsedBooks:id', verify, (req, res) => {
  const { id } = req.params

  const data = req.body
  let newData
  const validationErrors = []
  if (validationErrors.length) {
    return res.status(400).json({ errors: validationErrors })
  }

  UserSchema.findOne({ _id: id }).then(user => {
    if (!user)
      return res.status(400).json('There was a problem with the request.')

    newData = user.purchsedBooks
    data.forEach(purchase => {
      newData.push(purchase)
    })
    let dataFinal = { purchsedBooks: newData }
    UserSchema.updateOne({ _id: id }, dataFinal, err => {
      if (err) return res.status(404).json('Not Found')
      res.status(200).json('Thank You For Purchasing!')
    })
  })
})
router.post('/register', (req, res) => {
  const { fullname, email, nickName, password, phone, registerDate } = req.body
  const validationErrors = []

  UserSchema.findOne({ email }).then(user => {
    if (user) {
      return res.status(400).json('User already exists')
    }

    if (!validator.isEmail(email)) {
      validationErrors.push({
        emailError: 'Please enter a valid email address.'
      })
    }

    if (validator.isEmpty(fullname)) {
      validationErrors.push({
        nameError: 'Please enter a userName'
      })
    } else if (!validator.isLength(fullname, { min: 5 })) {
      validationErrors.push({
        nameError: 'Full Name must be at least 5 characters long'
      })
    }

    if (!validator.isLength(password, { min: 8 })) {
      validationErrors.push({
        passwordError: 'Password must be at least 8 characters long'
      })
    }

    if (validationErrors.length) {
      return res.status(400).json({ errors: validationErrors })
      //  res.redirect('/login')
    }

    const newUser = new UserSchema({
      fullname,
      email,
      nickName,
      password,
      phone,
      registerDate,
      purchsedBooks: []
    })

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err
        newUser.password = hash
        newUser
          .save()
          .then(activeUser => {
            jwt.sign(
              { _id: activeUser._id },
              process.env.JWT_TOKEN,
              {
                expiresIn: 3600
              },
              (err, token) => {
                if (err) throw err
                res.json({
                  token,
                  id: activeUser._id,
                  user: {
                    userID: activeUser._id,
                    fullname: activeUser.fullname,
                    nickName: activeUser.nickName,
                    phone: activeUser.phone,
                    email: activeUser.email,
                    registerDate: activeUser.registerDate,
                    purchsedBooks: activeUser.purchsedBooks
                  }
                })
              }
            )
          })
          .catch(err => {
            if (err) {
              return res.status(400).json({
                msg:
                  'The registration could not be completed, please try again later.'
              })
            }
          })
      })
    })
  })
})
router.post('/login', async (req, res) => {
  const { email, password } = req.body
  const validationErrors = []
  // if (error) return res.status(400).json(error.details[0].message)

  if (!validator.isEmail(email)) {
    validationErrors.push({
      emailError: 'Please enter a valid email address.'
    })
  }

  if (!validator.isLength(password, { min: 8 })) {
    validationErrors.push({
      passwordError: 'Password must be at least 8 characters long'
    })
  }

  if (validationErrors.length) {
    return res.status(400).json({ errors: validationErrors })
  }

  const user = await UserSchema.findOne({ email })

  if (!user) return res.status(400).json('User Does Not Exist')

  const comparePass = await bcrypt.compare(password, user.password)
  if (!comparePass) return res.status(400).json('Wrong email or password')
  const token = jwt.sign({ _id: user._id }, process.env.JWT_TOKEN, {
    expiresIn: 3600
  })
  res.json({
    token,
    id: user._id,
    user: {
      userID: user._id,
      fullname: user.fullname,
      nickName: user.nickName,
      email: user.email,
      phone: user.phone,
      registerDate: user.registerDate,
      isAdmin: user.isAdmin,
      purchsedBooks: user.purchsedBooks
    }
  })
})
router.get('/:id', verify, (req, res) => {
  const { id } = req.params
  UserSchema.findById(id, (err, data) => {
    if (err) res.status(404)
    else res.json(data)
  }).select('-password')
})
router.put('/:id', verify, async (req, res) => {
  const { id } = req.params
  let data = req.body
  const { password } = req.body
  const validationErrors = []
  // if (error) return res.status(400).json(error.details[0].message)

  if (!validator.isEmail(data.email)) {
    validationErrors.push({
      emailError: 'Please enter a valid email address.'
    })
  }

  if (validator.isEmpty(data.fullname)) {
    validationErrors.push({
      nameError: 'Please enter a userName'
    })
  } else if (!validator.isLength(data.fullname, { min: 5 })) {
    validationErrors.push({
      nameError: 'Full Name must be at least 5 characters long'
    })
  }

  if (!validator.isLength(data.password, { min: 8 })) {
    validationErrors.push({
      passwordError: 'Password must be at least 8 characters long'
    })
  }

  if (validationErrors.length) {
    return res.status(400).json({ errors: validationErrors })
  }

  const user = await UserSchema.findOne({ _id: id })
  if (!user)
    return res.status(400).json('There was a problem with the request.')

  if (data['password']) {
    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(data.password, salt)
    data['password'] = hashedPass
  }

  Object.entries(data).forEach(([key, value]) => {
    if (!value) delete data[key]
  })
  UserSchema.updateOne({ _id: id }, data, err => {
    if (err) return res.status(404).json('Not Found')
    res.status(200).json('Your data has been updated')
  })
})
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params
  try {
    await UserSchema.deleteOne({ _id: id })
    res.status(200).json('Account deleted')
  } catch (err) {
    res.status(404).json('Something went wrong')
  }
})

module.exports = router
