const Question = require('../models/question')
const { StatusCodes } = require('http-status-codes')
const { NotFoundError } = require('../errors')

const getAllQuestions = async (req, res) => {
  const questions = await Question.find({ })
  res.status(StatusCodes.OK).json({ questions, count: questions.length })
}

const createQuestion = async (req, res) => {
  const question = await Question.create(req.body)
  res.status(StatusCodes.CREATED).json({ question })
}

const getSingleQuestion = async (req, res) => {
  const questionId = req.params.id
  const question = await Question.findOne({ _id: questionId })
  if (!question) {
    throw new NotFoundError(`Question with id ${questionId} does not exist`)
  }
  res.status(StatusCodes.OK).json({ question })
}

const updateQuestion = async (req, res) => {
  const questionId = req.params.id
  const question = await Question.findOneAndUpdate({ _id: questionId },
    req.body,
    { new: true, runValidators: true }
  )
  if (!question) {
    throw new NotFoundError(`Question with id ${questionId} does not exist`)
  }
  res.status(StatusCodes.OK).json({ question })
}

const deleteQuestion = async (req, res) => {
  const questionId = req.params.id
  const question = await Question.findOneAndRemove({ _id: questionId })
  if (!question) {
    throw new NotFoundError(`Question with id ${questionId} does not exist`)
  }
  res.status(StatusCodes.OK).json({
    msg: `Successfully deleted question with id ${questionId}`
  })
}

module.exports = {
  getAllQuestions,
  createQuestion,
  getSingleQuestion,
  updateQuestion,
  deleteQuestion
}
