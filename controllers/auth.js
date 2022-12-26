const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')

const register = async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password)
    throw new BadRequestError('please provide all fields')

  const user = await User.create({ ...req.body })

  if (!user) throw BadRequestError('cannot create user')

  const token = user.createJWT()

  res.status(StatusCodes.CREATED).json({ user: { username: user.name }, token })
}

const login = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password)
    throw new BadRequestError('please provide email and password')

  const user = await User.findOne({ email })
  if (!user) throw new UnauthenticatedError('Invalid Credentials')

  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) throw new UnauthenticatedError('Invalid Credentials')
  console.log(isPasswordCorrect)

  const token = user.createJWT()

  res.status(StatusCodes.OK).json({ user: { name: user.name }, token })
}

module.exports = { register, login }
