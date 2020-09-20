export const getToken = () => {
  const userAuth = JSON.parse(localStorage.getItem('auth-token'))
  return userAuth
}

export const getUser = () =>
  new Promise((resolve, reject) => {
    const userAuth = getToken()
    if (!userAuth || !userAuth.id) return
    const myHeaders = new Headers({
      'Content-Type': 'application/json',
      'auth-token': userAuth.token
    })
    fetch(`/user/${userAuth.id}`, {
      headers: myHeaders
    })
      .then(res => {
        if (res.ok) return res.json()
      })
      .then(response => {
        let resWithToken = { ...response, token: userAuth.token }
        resolve(resWithToken)
      })
      .catch(error => {
        reject(error)
      })
  })

export const handleLogIn = (email, password) =>
  new Promise((resolve, reject) => {
    fetch('/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
      .then(res => res.json())
      .then(res => {
        const userToken = { token: res.token, id: res.id }
        localStorage.setItem('auth-token', JSON.stringify(userToken))
        resolve(res)
      })
      .catch(e => {
        reject(e)
      })
  })

export const handleRegistration = (userData, step) =>
  // e.preventDefault()
  new Promise((resolve, reject) => {
    const {
      fullname,
      email,
      nickName,
      password,
      phone,
      registerDate
    } = userData
    fetch('/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fullname,
        email,
        nickName,
        password,
        phone,
        registerDate
      })
    })
      .then(res => {
        return res.json()
      })
      .then(res => {
        const userToken = { token: res.token, id: res.id }
        localStorage.setItem('auth-token', JSON.stringify(userToken))
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })

export const deleteUserAccount = id =>
  new Promise((resolve, reject) => {
    const userAuth = JSON.parse(localStorage.getItem('auth-token'))

    const cfm = window.confirm(
      'Are you sure that you want to delete the account?'
    )
    if (!cfm) return
    const fetchSettings = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': userAuth.token
      },
      body: JSON.stringify()
    }
    try {
      fetch(`/user/delete/${id}`, fetchSettings)
        .then(res => {
          return res.json()
        })
        .then(response => {
          localStorage.clear()
          resolve(response)
        })
        .catch(err => {
          reject(err)
        })
      //   let response = fetch(`/user/delete/${id}`, fetchSettings)
    } catch (err) {
      reject(err)
    }
  })

export const updateUserAccount = userData =>
  new Promise((resolve, reject) => {
    const userAuth = getToken()

    const { fullname, email, phone, nickName, password, userID } = userData
    const updateData = {
      fullname,
      email,
      phone,
      nickName,
      password
    }
    const fetchSettings = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': userAuth.token
      },
      body: JSON.stringify(updateData)
    }
    try {
      fetch(`/user/${userID}`, fetchSettings)
        .then(res => {
          return res.json()
        })
        .then(response => {
          resolve(response)
        })
    } catch (err) {
      reject(err)
    }
  })
