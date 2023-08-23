const { CustomAPIError } = require('../errors')
const { StatusCodes } = require('http-status-codes')

const errorHandler = async (err, req, res, next) => {
//   const customError = {
//     msg: err.message || 'Something went wrong, please try again later',
//     statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
//   }

//   return res.status(customError.statusCode)
//     .json({ msg: customError.msg })
}

module.exports = errorHandler
