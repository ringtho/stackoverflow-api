// const { CustomAPIError } = require('../errors')
const { StatusCodes } = require('http-status-codes')
const { CustomAPIError } = require('../errors')

const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message })
  }
  res.status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ msg: 'Something is wrong, please try again later' })
  next()
}

module.exports = errorHandler
