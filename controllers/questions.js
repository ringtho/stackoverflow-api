const Question = require('../models/question')
const { StatusCodes } = require('http-status-codes')
const { NotFoundError, BadRequestError } = require('../errors')

const getAllQuestions = async (req, res) => {
  const questions = await Question.find({ })
    .populate('posted_by', 'name')
    .populate('answers')
    .sort('-updatedAt')
  res.status(StatusCodes.OK).json({ questions, count: questions.length })
}

const createQuestion = async (req, res) => {
  req.body.createdBy = req.user.userId
  const question = await Question.create(req.body)
  res.status(StatusCodes.CREATED).json({ question })
}

const getSingleQuestion = async (req, res) => {
  const questionId = req.params.id
  const question = await Question.findOne({ _id: questionId })
    .populate('posted_by', 'name')
    .populate({
      path: 'answers',
      options: {
        sort: { updatedAt: -1 }
      },
      populate: { path: 'posted_by', select: 'name' }
    })
  if (!question) {
    throw new NotFoundError(`Question with id ${questionId} does not exist`)
  }
  res.status(StatusCodes.OK).json({ question })
}

const updateQuestion = async (req, res) => {
  const { params: { id: questionId }, user: { userId } } = req
  const question = await Question.findOneAndUpdate(
    { _id: questionId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  )
  if (!question) {
    throw new NotFoundError(`Question with id ${questionId} does not exist`)
  }
  res.status(StatusCodes.OK).json({ question })
}

const deleteQuestion = async (req, res) => {
  const { params: { id: questionId }, user: { userId } } = req
  const question = await Question.findOneAndRemove(
    { _id: questionId, createdBy: userId }
  )
  if (!question) {
    throw new NotFoundError(`Question with id ${questionId} does not exist`)
  }
  res.status(StatusCodes.OK).json({
    msg: `Successfully deleted question with id ${questionId}`
  })
}

const searchQuestions = async (req, res) => {
  const { search } = req.body
  if (!search) {
    throw new BadRequestError('Please provide a search parameter')
  }
  const regex = new RegExp(search, 'i')
  const questions = await Question.find({
    title: { $regex: regex }
  })
  res.status(StatusCodes.OK).json({ questions })
}

const getUserCreatedQuestions = async (req, res) => {
  const userId = req.params.userId
  const questions = await Question.find({ createdBy: userId }).sort('-updatedAt')
  if (questions.length === 0) {
    throw new NotFoundError(`No questions posted by the user with id ${userId}`)
  }
  res.status(StatusCodes.OK).json({ questions, count: questions.length })
}

module.exports = {
  getAllQuestions,
  createQuestion,
  getSingleQuestion,
  updateQuestion,
  deleteQuestion,
  searchQuestions,
  getUserCreatedQuestions
}
