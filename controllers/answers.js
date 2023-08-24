const Answer = require('../models/answer')
const Question = require('../models/question')
const { StatusCodes } = require('http-status-codes')
const { NotFoundError, BadRequestError } = require('../errors')

const createAnswer = async (req, res) => {
  const questionId = req.params.id
  const question = await Question.findOne({ _id: questionId })
  if (!question) {
    throw new NotFoundError(`Question with id ${questionId} does not exist`)
  }
  const { answer: solution } = req.body
  if (!solution) {
    throw new BadRequestError('Please provide an answer to the question')
  }
  req.body.createdBy = req.user.userId
  req.body.questionId = req.params.id
  const answer = await Answer.create(solution)
  res.status(StatusCodes.CREATED).json({ answer })
}

module.exports = {
  createAnswer
}
