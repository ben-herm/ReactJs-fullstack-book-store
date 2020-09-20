import React from 'react'
import { useSelector } from 'react-redux'
const InfoModal = () => {
  const { info } = useSelector(state => state.BooksReducer)
  const handleInfo = () => {
    if (typeof info == 'string') {
      return info
    } else {
      if (info.errors) {
        if (info.errors > 1) {
          return info.errors
        } else {
          return Object.values(info.errors[0])
        }
      } else {
        return 'User Does Not Exist'
      }
    }
  }

  return (
    <>
      <div className='showModalBox'>
        <span>{handleInfo()}</span>
      </div>
    </>
  )
}
export default InfoModal
