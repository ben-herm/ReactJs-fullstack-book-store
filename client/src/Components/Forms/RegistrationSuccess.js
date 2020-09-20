import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
const RegistrationSuccess = () => {
  const { nickName, info } = useSelector(state => state.UserReducer)
  return (
    <>
      <h2 className='done'>
        {nickName}, {info}. Now, you'll be able to sign in.
      </h2>
    </>
  )
}
export default RegistrationSuccess
