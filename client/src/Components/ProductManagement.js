import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  showInfo,
  closeInfo,
  setBookId,
  setBooks
} from '../Components/redux/actions/booksActions'
import EditModal from './editModal'
import AddNewBook from './AddNewBook'
import { deleteBook, getData } from '../api/booksApi'

const ProductManagement = ({
  showUpdateBook,
  showAddBook,
  addBook,
  updateBook
}) => {
  const dispatch = useDispatch()
  const { booksData } = useSelector(state => state.BooksReducer)
  const displayBooks = booksData.map(item => (
    <div key={item._id} className='bookFromDB'>
      <h4>Author: {item.author}</h4> <h4> Title: {item.title}</h4>
      <div className='buttons-cms-event'>
        <button
          onClick={() => {
            showUpdateBook(true)
            dispatch(setBookId(item._id))
          }}
        >
          Update
        </button>
        <button
          onClick={() =>
            deleteBook(item._id, item.cover).then(() => {
              getData().then(books => {
                dispatch(setBooks(books))
              })
            })
          }
        >
          Delete
        </button>
      </div>
    </div>
  ))
  return (
    <>
      <EditModal showUpdateBook={showUpdateBook} value={updateBook} />
      {!updateBook && (
        <div className='productManagement'>
          <h3>There are {booksData.length} book(s) in the database</h3>
          {displayBooks}
        </div>
      )}
      <AddNewBook value={addBook} showAddBook={showAddBook} />
    </>
  )
}
export default ProductManagement
