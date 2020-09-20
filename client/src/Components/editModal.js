import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  showInfo,
  closeInfo,
  setBookId,
  setBooks,
  resetBook
} from '../Components/redux/actions/booksActions'
import { editBookInDB, getData } from '../api/booksApi'
import { Link } from 'react-router-dom'

const EditModal = ({ showUpdateBook, value }) => {
  const { booksData, bookID } = useSelector(state => state.BooksReducer)
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

  useEffect(() => {
    let newData = booksData.filter(item => item._id === bookID)
    const newDataFinal = { ...newData }
    const New = { ...newDataFinal[0] }
    setBookData(New)
  }, [bookID, booksData])

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

    editBookInDB(bookData).then(res => {
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

  const showData = booksData
    .filter(item => item._id === bookID)
    .map(item => (
      <div className='show-modal' key={item._id}>
        <div className='editBook'>
          <form onSubmit={handleSubmit} className='cms-form'>
            <Link to='/list'>Watch all books</Link>
            <div className='close' onClick={() => showUpdateBook(false)}>
              <i className='far fa-times-circle'></i>
            </div>
            <label>Author</label>
            <input
              type='text'
              placeholder={item.author}
              value={data.author}
              name='author'
              onChange={handleCmsValue}
            />
            <label>Title</label>
            <input
              type='text'
              placeholder={item.title}
              value={data.title}
              name='title'
              onChange={handleCmsValue}
            />
            <label>Cover</label>
            <input type='file' name='cover' onChange={handleCmsValue} />
            <p>{item.cover}</p>
            <label>Pages</label>
            <input
              type='text'
              placeholder={item.pages}
              value={data.pages}
              name='pages'
              onChange={handleCmsValue}
            />
            <label>Description</label>
            <textarea
              name='desc'
              placeholder={item.desc}
              value={data.desc}
              onChange={handleCmsValue}
            ></textarea>
            <label>Print</label>
            <input
              type='text'
              placeholder={item.print}
              value={data.print}
              name='print'
              onChange={handleCmsValue}
            />
            <label>Price</label>
            <input
              type='text'
              placeholder={item.price}
              value={data.price}
              name='price'
              onChange={handleCmsValue}
            />
            <label>Publishing date</label>
            <input
              type='text'
              placeholder={item.date}
              value={data.date}
              name='date'
              onChange={handleCmsValue}
            />
            <button className='cms-button'>Edit Data</button>
          </form>
        </div>
      </div>
    ))
  return <>{value && showData}</>
}
export default EditModal
