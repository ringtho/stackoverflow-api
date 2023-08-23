const User = require('../models/user')
const { StatusCodes } = require('http-status-codes')

const signup = async (req, res) => {
  const user = await User.create(req.body)
  const token = user.createJWT()
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token })
}

const login = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: 'Successfully logged in' })
}

module.exports = { signup, login }
