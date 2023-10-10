const User = require('../models/user')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnAuthenticatedError } = require('../errors')

const signup = async (req, res) => {
  const user = await User.create(req.body)
  const token = user.createJWT()
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token })
}

const login = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    throw new BadRequestError('Please provide an email and a password')
  }

  const user = await User.findOne({ email })
  if (!user) {
    throw new UnAuthenticatedError('Invalid Credentials')
  }

  const isPasswordCorrect = await user.checkPassword(password)
  if (!isPasswordCorrect) {
    throw new UnAuthenticatedError('Invalid Credentials')
  }

  const token = user.createJWT()
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token })
}

const getUserDetails = async (req, res) => {
  const { id } = req.params
  const user = await User
    .findOne({ _id: id }, '_id name email')
    .populate({
      path: 'questions',
      populate: { path: 'answers' }
    })
  if (!user) {
    throw new UnAuthenticatedError('You are not authorized')
  }
  res.status(StatusCodes.OK).json({ user })
}

module.exports = { signup, login, getUserDetails }
