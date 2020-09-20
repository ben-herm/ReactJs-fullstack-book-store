import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  showInfo,
  closeInfo,
  setBookId,
  setBooks,
  resetBook
} from '../Components/redux/actions/booksActions'
import { addBookToDB, getData } from '../api/booksApi'
import { Link } from 'react-router-dom'
const AddNewBook = ({ value, showAddBook }) => {
  const dispatch = useDispatch()
  const [data, setBookData] = useState({
    title: '',
    author: '',
    desc: '',
    pages: '',
    print: '',
    price: '',
    date: '',
    cover: ''
  })

  const handleCmsValue = e => {
    const name = e.target.name
    const value = e.target.value
    const file = e.target.files
    let newData
    if (file) {
      newData = { ...data, cover: file[0] }
    } else {
      newData = { ...data, [name]: value }
    }
    setBookData(newData)
  }

  const handleSubmit = e => {
    e.preventDefault()
    const { author, title, desc, pages, print, price, cover, date } = data

    const bookData = {
      author,
      title,
      desc,
      pages,
      print,
      price,
      cover,
      date,
      total: '0',
      count: '0',
      isActive: false
    }

    addBookToDB(bookData).then(res => {
      dispatch(resetBook())
      getData().then(books => {
        dispatch(setBooks(books))
      })
      dispatch(showInfo(res))
      setTimeout(() => {
        dispatch(closeInfo())
      }, 2000)
    })
  }

  return (
    <>
      <button
        onClick={() => showAddBook(true)}
        className='secondary-btn btn-add-book'
      >
        Add new book to a database
      </button>
      {value && (
        <div className='show-modal'>
          <div>
            <form onSubmit={handleSubmit} className='cms-form'>
              <Link to='/list'>Watch all books</Link>
              <div className='close' onClick={() => showAddBook(false)}>
                <i className='far fa-times-circle'></i>
              </div>
              <label>Author</label>
              <input
                type='text'
                value={data.author}
                name='author'
                onChange={handleCmsValue}
              />
              <label>Title</label>
              <input
                type='text'
                value={data.title}
                name='title'
                onChange={handleCmsValue}
              />
              <label>Cover</label>
              <input type='file' name='cover' onChange={handleCmsValue} />
              <label>Pages</label>
              <input
                type='number'
                value={data.pages}
                name='pages'
                onChange={handleCmsValue}
              />
              <label>Description</label>
              <textarea
                name='desc'
                value={data.desc}
                onChange={handleCmsValue}
              ></textarea>
              <label>Print</label>
              <input
                type='text'
                value={data.print}
                name='print'
                onChange={handleCmsValue}
              />
              <label>Price</label>
              <input
                type='number'
                value={data.price}
                name='price'
                onChange={handleCmsValue}
              />
              <label>Publishing date</label>
              <input
                type='number'
                value={data.date}
                name='date'
                onChange={handleCmsValue}
              />
              <button className='cms-button'>Send Data</button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
export default AddNewBook
