const { UnAuthenticatedError } = require('../errors')
const jwt = require('jsonwebtoken')

const authenticateUser = async (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnAuthenticatedError('Authentication Invalid')
  }

  const token = authHeader.split(' ')[1]

  try {
    const { userId, name } = jwt.verify(token, process.env.JWT_SECRET)
    req.user = { userId, name }
    next()
  } catch (error) {
    throw new UnAuthenticatedError('Invalid token')
  }
}

module.exports = authenticateUser
