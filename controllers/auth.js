const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError } = require('../errors')

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
  res.send('Login')
}

module.exports = { register, login }
