const Answer = require('../models/answer')
const Question = require('../models/question')
const { StatusCodes } = require('http-status-codes')
const { NotFoundError, BadRequestError } = require('../errors')

const createAnswer = async (req, res) => {
  const createdBy = req.user.userId
  const questionId = req.params.id
  const question = await Question.findOne({ _id: questionId })
  if (!question) {
    throw new NotFoundError(`Question with id ${questionId} does not exist`)
  }
  const { answer: solution } = req.body
  if (!solution) {
    throw new BadRequestError('Please provide an answer to the question')
  }
  const answer = await Answer.create({ answer: solution, createdBy, questionId })
  res.status(StatusCodes.CREATED).json({ answer })
}

const updateAnswer = async (req, res) => {
  const { id: questionId, answerId } = req.params
  const userId = req.user.userId
  const { answer: solution } = req.body
  const question = await Question.findOne({ _id: questionId })
  if (!question) {
    throw new NotFoundError(`Question with id ${questionId} does not exist`)
  }
  const answer = await Answer.findOneAndUpdate({ _id: answerId, createdBy: userId },
    { answer: solution }, { new: true, runValidators: true })
  if (!answer) {
    throw new NotFoundError(`Answer with id ${answerId} does not exist`)
  }
  res.status(StatusCodes.OK).json({ answer })
}

const deleteAnswer = async (req, res) => {
  const { id: questionId, answerId } = req.params
  const userId = req.user.userId
  const question = await Question.findOne({ _id: questionId })
  if (!question) {
    throw new NotFoundError(`Question with id ${questionId} does not exist`)
  }
  const answer = await Answer.findOneAndRemove({ _id: answerId, createdBy: userId })
  if (!answer) {
    throw new NotFoundError(`Answer with id ${answerId} does not exist`)
  }
  res.status(StatusCodes.OK).json({
    msg: `Successfully deleted answer with id ${answerId}`
  })
}

module.exports = {
  createAnswer,
  updateAnswer,
  deleteAnswer
}
