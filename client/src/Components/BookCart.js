import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import AddedBook from './AddedBook'
import {
  showInfo,
  closeInfo,
  setBooksForCart
} from '../Components/redux/actions/booksActions'
import Summary from './Summary'
import '../styles/_globalVar.scss'
import BankList from './BankList'

class BookCart extends Component {
  state = {
    bankList: false
  }

  handleState = () => {
    if (this.props.user && this.props.token) {
      this.setState({
        bankList: !this.state.bankList
      })
    } else {
      this.props.showInfo('Must Be Logged In')
      setTimeout(() => {
        this.props.closeInfo()
      }, 2000)
    }
  }

  renderContent = () => {
    return this.props.cartStore.length > 0 ? (
      <>
        <h2>All Your Added Books</h2>
        {this.props.cartStore.map(item => (
          <AddedBook key={item._id} item={item} />
        ))}
        <Summary sum={this.props.sum} />

        {
          <button className='secondary-btn bank-btn' onClick={this.handleState}>
            I'll Buy It!
          </button>
        }
        {this.state.bankList && (
          <BankList
            user
            cartList={this.props.cartStore}
            click={this.handleState}
          />
        )}
      </>
    ) : (
      <>
        <h2>Your cart is empty </h2>
        <Link
          style={{
            display: 'block',
            textAlign: 'center',
            fontSize: '20px'
          }}
          to='/list'
        >
          Return to books
        </Link>
      </>
    )
  }

  render () {
    return <section className='cartContent'>{this.renderContent()}</section>
  }
}

const mapStateToProps = ({ BooksReducer, UserReducer }) => {
  const { cartStore, sum } = BooksReducer
  const { user, token } = UserReducer
  return {
    cartStore,
    sum,
    user,
    token
  }
}

export default connect(mapStateToProps, {
  showInfo,
  closeInfo,
  setBooksForCart
})(BookCart)
