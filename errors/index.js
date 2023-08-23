const CustomAPIError = require('./custom-error')
const BadRequestError = require('./bad-request')
const NotFoundError = require('./not-found')
const UnAuthenticatedError = require('./authentication')

module.exports = {
  CustomAPIError,
  BadRequestError,
  NotFoundError,
  UnAuthenticatedError
}
