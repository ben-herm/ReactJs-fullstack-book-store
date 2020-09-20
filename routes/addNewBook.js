const router = require('express').Router()

const BooksSchema = require('../schemes/booksSchema')
const verify = require('../middleware/auth')
const validator = require('validator')
const multer = require('multer')
const fs = require('fs')
const { Console } = require('console')
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './images/')
  },
  filename: (req, file, cb) => {
    const date = Date.now()
      .toString()
      .slice(0, 10)
    cb(null, `${date}-${file.originalname}`)
  }
})
const imageFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true)
  } else cb(null, false)
}
const upload = multer({
  fileFilter: imageFilter,
  storage,
  limits: {
    fileSize: 1024 * 1024 * 2
  }
})

router.post(
  '/addNewBook',
  [verify, upload.single('cover')],
  async (req, res) => {
    const validationErrors = []
    const {
      author,
      title,
      isActive,
      count,
      total,
      pages,
      date,
      desc,
      print,
      price
    } = req.body

    if (validator.isEmpty(author)) {
      validationErrors.push({
        authorError: 'Please enter an author name'
      })
    } else if (!validator.isLength(author, { min: 2 })) {
      validationErrors.push({
        authorError: 'author must be at least 2 characters'
      })
    }

    if (validator.isEmpty(title)) {
      validationErrors.push({
        titleError: 'Please enter a title'
      })
    } else if (!validator.isLength(title, { min: 3 })) {
      validationErrors.push({
        titleError: 'title must be at least 3 characters'
      })
    }

    if (!req.file) {
      validationErrors.push({
        fileError: 'Please upload a cover'
      })
    }

    if (validator.isEmpty(pages)) {
      validationErrors.push({
        pagesError: 'Please enter the number of pages'
      })
    } else if (!validator.isLength(pages, { min: 2 })) {
      validationErrors.push({
        pagesError: 'pages must be at least 2 characters'
      })
    }

    if (validator.isEmpty(desc)) {
      validationErrors.push({
        descError: 'Please enter a book description'
      })
    } else if (!validator.isLength(desc, { min: 4, max: 1000 })) {
      validationErrors.push({
        descError: 'description must be at least 4 characters long'
      })
    }

    if (validator.isEmpty(print)) {
      validationErrors.push({
        printError: 'Please enter a print'
      })
    } else if (!validator.isLength(print, { min: 4, max: 100 })) {
      validationErrors.push({
        printError: 'print must be at least 4 characters long'
      })
    }

    if (validator.isEmpty(price)) {
      validationErrors.push({
        priceError: 'price enter a valid price'
      })
    }

    if (validator.isEmpty(date)) {
      validationErrors.push({
        dateError: 'Please enter a date'
      })
    } else if (!validator.isLength(date, { min: 4, max: 4 })) {
      validationErrors.push({
        dateError: 'please enter a valid date'
      })
    }

    if (validationErrors.length) {
      return res.status(400).json({ errors: validationErrors })
    }

    const item = await BooksSchema.findOne({ title })

    if (item)
      return res.status(400).json('A book with this title already exists')

    const book = new BooksSchema({
      author,
      title,
      isActive,
      count,
      total,
      pages,
      date,
      desc,
      print,
      price,
      cover: req.file.path,
      addedDate: new Date().toLocaleString()
    })
      .save()
      .then(info => {
        res.status(201).json('Your book has been added to the database')
      })
      .catch(err => {
        res.status(400).json(err)
      })
  }
)
router.put('/editBook', [verify, upload.single('cover')], (req, res) => {
  const { id } = req.body
  updatedData = req.body
  const {
    author,
    title,
    isActive,
    count,
    total,
    pages,
    date,
    desc,
    print,
    price
  } = req.body
  const validationErrors = []
  let cover

  if (validator.isEmpty(author)) {
    validationErrors.push({
      authorError: 'Please enter an author name'
    })
  } else if (!validator.isLength(author, { min: 2 })) {
    validationErrors.push({
      authorError: 'author must be at least 2 characters'
    })
  }

  if (validator.isEmpty(title)) {
    validationErrors.push({
      titleError: 'Please enter a title'
    })
  } else if (!validator.isLength(title, { min: 3 })) {
    validationErrors.push({
      titleError: 'title must be at least 3 characters'
    })
  }

  if (!req.file) {
    validationErrors.push({
      fileError: 'Please upload a cover'
    })
  }

  if (validator.isEmpty(pages)) {
    validationErrors.push({
      pagesError: 'Please enter the number of pages'
    })
  } else if (!validator.isLength(pages, { min: 2 })) {
    validationErrors.push({
      pagesError: 'pages must be at least 2 characters'
    })
  }

  if (validator.isEmpty(desc)) {
    validationErrors.push({
      descError: 'Please enter a book description'
    })
  } else if (!validator.isLength(desc, { min: 4, max: 1000 })) {
    validationErrors.push({
      descError: 'description must be at least 4 characters long'
    })
  }

  if (validator.isEmpty(print)) {
    validationErrors.push({
      printError: 'Please enter a print'
    })
  } else if (!validator.isLength(print, { min: 4, max: 100 })) {
    validationErrors.push({
      printError: 'print must be at least 4 characters long'
    })
  }

  if (validator.isEmpty(price)) {
    validationErrors.push({
      priceError: 'price enter a valid price'
    })
  }

  if (validator.isEmpty(date)) {
    validationErrors.push({
      dateError: 'Please enter a date'
    })
  } else if (!validator.isLength(date, { min: 4, max: 4 })) {
    validationErrors.push({
      dateError: 'please enter a valid date'
    })
  }

  if (validationErrors.length) {
    return res.status(400).json({ errors: validationErrors })
  }
  if (req.file) cover = { cover: req.file.path }
  Object.entries(updatedData).forEach(([key, value]) => {
    if (!value || value === 'null' || key === 'id') delete updatedData[key]
    if (cover) updatedData = { ...updatedData, ...cover }
    return updatedData
  })
  BooksSchema.findByIdAndUpdate(id, updatedData, (err, data) => {
    if (err) return res.status(404).json('Book not found')
    else {
      res.status(200).json('Document has been updated')
      fs.unlink(data.cover, err => {
        if (err) console.log(err)
      })
    }
  })
})
module.exports = router
