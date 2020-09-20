import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import MobileNavbar from './MobileNavbar'
import SignInModal from './Forms/SignInModal'

const Navigation = () => {
  const { modalActive } = useSelector(state => state.UserReducer)
  const [showModal, setShowModal] = useState(modalActive)
  useEffect(() => {
    setShowModal(modalActive)
  }, [modalActive])

  const [showMenu, setMenu] = React.useState(false)
  React.useEffect(() => {
    const handleMenu = () => {
      if (window.innerWidth > 768) {
        setMenu(false)
      }
    }

    window.addEventListener('resize', handleMenu)
    return () => {
      window.removeEventListener('resize', handleMenu)
    }
  })
  return (
    <>
      {modalActive && <SignInModal />}
      <nav>
        <MobileNavbar showMenu={showMenu} />
        <div onClick={() => setMenu(!showMenu)} className='mobile-menu-bar'>
          <i className='fas fa-align-right'></i>
        </div>
      </nav>
    </>
  )
}
export default Navigation
