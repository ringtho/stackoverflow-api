const User = require('../models/user')
const { StatusCodes } = require('http-status-codes')
const bcrypt = require('bcryptjs')

const signup = async (req, res) => {
  const { name, email, password } = req.body
  const salt = await bcrypt.genSalt(10)
  const tempPassword = await bcrypt.hash(password, salt)
  const user = await User.create({ name, email, password: tempPassword })
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token: 'token' })
}

const login = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: 'Successfully logged in' })
}

module.exports = { signup, login }
