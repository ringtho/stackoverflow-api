const { StatusCodes } = require('http-status-codes')

const signup = async (req, res) => {
  res.status(StatusCodes.CREATED).json({ user: req.body })
}

const login = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: 'Successfully logged in' })
}

module.exports = { signup, login }
