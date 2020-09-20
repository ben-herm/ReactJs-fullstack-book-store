import { getUser } from './userApi'

export const getData = () =>
  new Promise((resolve, reject) => {
    fetch('/books')
      .then(response => response.json())
      .then(data => {
        resolve(data)
      })
      .catch(err => {
        reject(err)
      })
  })
export const addPurchsedBooks = (userID, cartList) =>
  new Promise((resolve, reject) => {
    let newList = []
    cartList.forEach(item => {
      let data = { id: item._id, count: item.count }
      newList.push(data)
    })
    const userAuth = JSON.parse(localStorage.getItem('auth-token'))
    fetch(`/user/addPurchsedBooks${userID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': userAuth.token
      },
      body: JSON.stringify(newList)
    })
      .then(res => {
        if (res.ok) {
          getData()
        }
        return res.json()
      })
      .then(() => {
        resolve()
      })
      .catch(err => {
        reject(err)
      })
  })

export const addBookToDB = bookData =>
  new Promise((resolve, reject) => {
    const { price, desc, author, print, date, title, cover, pages } = bookData
    const data = {
      author,
      title,
      price,
      desc,
      date,
      pages,
      print,
      total: '0',
      count: '0',
      isActive: false,
      cover
    }
    let formData = new FormData()
    for (let name in data) {
      formData.append(name, data[name])
    }
    const userAuth = JSON.parse(localStorage.getItem('auth-token'))
    fetch('/addNewBook', {
      method: 'POST',
      headers: {
        'auth-token': userAuth.token
      },
      body: formData
    })
      .then(res => {
        if (res.ok) {
          getData()
        }
        return res.json()
      })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })

export const deleteBook = (id, cover) =>
  new Promise((resolve, reject) => {
    const confirmation = window.confirm('Delete this book?')
    if (!confirmation) return
    const userAuth = JSON.parse(localStorage.getItem('auth-token'))
    fetch('/deleteBook', {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        'auth-token': userAuth.token
      },
      body: JSON.stringify({ id, cover })
    })
      .then(res => {
        if (res.ok) {
          getData()
        }
        return res.json()
      })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })

export const editBookInDB = bookData =>
  new Promise((resolve, reject) => {
    const userAuth = JSON.parse(localStorage.getItem('auth-token'))
    let formData = new FormData()
    for (let name in bookData) {
      formData.append(name, bookData[name])
    }
    fetch('/editBook', {
      method: 'PUT',
      headers: {
        'auth-token': userAuth.token
      },
      body: formData
    })
      .then(res => {
        return res.json()
      })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
