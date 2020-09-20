const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
  const token = req.header('auth-token')
  if (!token) return res.status(401)

  try {
    const checkToken = jwt.verify(token, process.env.JWT_TOKEN)
    res.user = checkToken
  } catch (err) {
    return res.status(401).json('invalid or expired token')
  }
  next()
}
