import React, { Component } from 'react'
import Book from './Book'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

class PurchaseHistory extends Component {
  constructor (props) {
    super(props)
    this.state = {
      word: '',
      filterDisplay: props.user.purchsedBooks,
      shouldRedirect: false
    }
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.user && !nextProps.user) {
      this.setState({
        shouldRedirect: true
      })
    }
  }

  renderBooks = () => {
    let books = []
    let purchsed = []
    if (this.props.user) {
      purchsed = this.props.user.purchsedBooks
    }
    const { booksData } = this.props
    if (purchsed) {
      booksData.forEach(book => {
        purchsed.forEach(pBook => {
          if (book._id == pBook.id) {
            books.push({ ...book, count: pBook.count })
          }
        })
      })
      if (books.length == 0) {
        return (
          <div>
            <h1>You Have No Purchases</h1>
          </div>
        )
      }
      return books.map(elem => <Book key={elem._id} elem={elem} />)
    } else {
      return (
        <div>
          <h1>You Have No Purchases</h1>
        </div>
      )
    }
  }
  render () {
    return (
      <>
        <section
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}
          className='showBooks'
        >
          {!this.state.shouldRedirect ? (
            this.renderBooks()
          ) : (
            <Redirect to='/' />
          )}
        </section>
      </>
    )
  }
}

const mapStateToProps = ({ UserReducer, BooksReducer }) => {
  const { booksData, cartStore } = BooksReducer
  const { user } = UserReducer
  return {
    booksData,
    cartStore,
    user
  }
}

export default connect(mapStateToProps, {})(PurchaseHistory)
