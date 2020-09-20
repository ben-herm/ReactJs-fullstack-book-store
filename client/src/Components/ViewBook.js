import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  setSum,
  setBooksForCart
} from '../Components/redux/actions/booksActions'
import { Link } from 'react-router-dom'
import '../styles/_chosenBook.scss'

class ViewBook extends Component {
  componentDidMount () {
    window.scrollTo(0, 0)
  }

  addToBasket = id => {
    let data = [...this.props.booksData]
    const book = this.props.booksData.find(item => item._id === id)
    const index = data.indexOf(book)
    const item = data[index]
    item.isActive = true
    item.count = 1
    const price = item.price
    item.total = price
    this.props.setBooksForCart({
      booksData: data,
      cartStore: [...this.props.cartStore, item]
    })
    this.summary()
  }

  summary = () => {
    let itemTotal = 0
    this.props.cartStore.map(item => {
      const float = parseFloat(item.total)
      itemTotal += float
      return itemTotal
    })
    const sum = itemTotal.toFixed(2)
    this.props.setSum(sum)
  }

  renderAddToBasket = item => {
    if (this.props.user && !this.props.user.isAdmin) {
      return !item.isActive ? (
        <button
          onClick={() => this.addToBasket(item._id)}
          className='secondary-btn btn-basket'
        >
          <i className='fas fa-book-medical'> Add to Basket</i>
        </button>
      ) : (
        <Link to='/yourCart'>
          <button className='secondary-btn btn-basket'>
            <i className='fas fa-check-circle'> Added. Go to Basket</i>
          </button>
        </Link>
      )
    }
    return null
  }

  renderContent = () => {
    return this.props.booksData
      .filter(item => item._id === this.props.match.params.id)
      .map(item => (
        <div key={item._id} className='bookDetails'>
          <div className='header'>
            <h4>{item.author}</h4>
            <h5>{item.title}</h5>
          </div>
          <div className='bookCover'>
            <img src={`/${item.cover}`} alt='cover' />
          </div>
          <div class='descrip'>
            <h2>Description: </h2>
            <p>{item.desc}</p>
          </div>
          <div className='spanItems'>
            <span className='price'>Price: {item.price} &euro;</span>
            <span>Pages: {item.pages}</span>
            <span>Publishing house: {item.print}</span>
            <span>Publishing date: {item.date}</span>
          </div>
          <div className='buttons'>
            {this.renderAddToBasket(item)}
            <Link to='/list'>
              <button className='secondary-btn'>
                <i className='fas fa-undo-alt'> Back to Books</i>
              </button>
            </Link>
          </div>
        </div>
      ))
  }
  render () {
    return <>{this.renderContent()}</>
  }
}

const mapStateToProps = ({ UserReducer, BooksReducer }) => {
  const { cartStore, sum, booksData } = BooksReducer
  const { user } = UserReducer
  return {
    cartStore,
    sum,
    booksData,
    user
  }
}

export default connect(mapStateToProps, { setSum, setBooksForCart })(ViewBook)
