import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Book extends Component {
  render () {
    const { author, title, cover, isActive, price, _id } = this.props.elem
    return (
      <div
        style={{ display: 'flex', flexDirection: 'column', minWidth: '550px' }}
        className='book-Cart'
      >
        <h2>{author}</h2>
        <h3>{title}</h3>
        <div className='img-book'>
          {isActive ? <span>Book added</span> : null}
          <Link to={`/viewBook/${_id}`}>
            <img src={cover} alt='Book cover' />
          </Link>
        </div>
        <div className='addBasket'>
          <h4>Price: {parseFloat(price)} &euro; </h4>
          <h4>Amount Purchsed: {this.props.elem.count}</h4>
          <Link to={`/viewBook/${_id}`}>
            <button className='main-btn'>Details</button>
          </Link>
        </div>
      </div>
    )
  }
}
export default Book
