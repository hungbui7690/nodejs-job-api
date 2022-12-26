const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { UnauthenticatedError } = require('../errors')

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization

  console.log(authHeader)

  if (!authHeader || !authHeader.startsWith('Bearer '))
    throw new UnauthenticatedError('Authentication Error')

  const token = authHeader.split(' ')[1]

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    console.log(payload)
    req.user = { userID: payload.userID, username: payload.username }
  } catch (error) {
    throw new UnauthenticatedError('Authentication Error')
  }
  next()
}

module.exports = auth
