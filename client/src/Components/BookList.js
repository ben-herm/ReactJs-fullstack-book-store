import React, { Component } from 'react'
import Book from './Book'
import { connect } from 'react-redux'

class BookList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      word: '',
      filterDisplay: props.booksData
    }
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.booksData !== nextProps.booksData) {
      this.setState({ filterDisplay: nextProps.booksData })
    }
  }

  handleChange = e => {
    if (e != '') {
      let newList = []
      this.setState(
        {
          word: e
        },
        () => {
          newList = this.props.booksData.filter(book => {
            return book.title.includes(this.state.word.toLowerCase())
          })
          this.setState({
            filterDisplay: newList
          })
        }
      )
    } else {
      this.setState({
        filterDisplay: this.props.booksData
      })
    }
  }

  renderSearchbar = () => {
    return (
      <div style={{ textAlign: 'center' }}>
        <h1>Search</h1>
        Book Title:{' '}
        <input
          style={{ marginTop: 5 }}
          onChange={e => this.handleChange(e.target.value)}
        />
      </div>
    )
  }
  renderBooks = () => {
    if (this.state.filterDisplay.length > 0) {
      return this.state.filterDisplay.map(elem => (
        <Book key={elem._id} elem={elem} />
      ))
    }
    return (
      <div>
        <h1>There are no books in the data base</h1>
      </div>
    )
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
          {this.state.filterDisplay.length > 0 ? this.renderSearchbar() : null}
          {this.renderBooks()}
        </section>
      </>
    )
  }
}

const mapStateToProps = ({ UserReducer, BooksReducer }) => {
  const { purchsedBooks, user, isAuthorized } = UserReducer
  const { booksData } = BooksReducer

  return {
    booksData,
    purchsedBooks,
    user,
    isAuthorized
  }
}

export default connect(mapStateToProps, {})(BookList)
