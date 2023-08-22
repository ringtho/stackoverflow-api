const User = require('../models/user')
const { StatusCodes } = require('http-status-codes')

const signup = async (req, res) => {
  const newUser = await User.create(req.body)
  res.status(StatusCodes.CREATED).json({ user: { name: newUser.name }, token: 'token' })
}

const login = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: 'Successfully logged in' })
}

module.exports = { signup, login }
