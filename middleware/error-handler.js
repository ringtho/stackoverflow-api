const { CustomAPIError } = require('../errors')
const { StatusCodes } = require('http-status-codes')

const errorHandler = async (err, req, res, next) => {
  console.log(err)
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json('Something is wrong, please try again later')
}

module.exports = errorHandler
