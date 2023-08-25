const Answer = require('../models/answer')
const Comment = require('../models/comment')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnAuthenticatedError } = require('../errors')
const { checkQuestionExists, checkAnswerExists } = require('./utils')

const getAnswer = async (req, res) => {
  const { id: questionId, answerId } = req.params
  await checkQuestionExists(questionId)
  const answer = await checkAnswerExists(answerId)
  const comments = await Comment.find({ answerId })
  res.status(StatusCodes.OK).json(
    { answer, comments, count: comments.length }
  )
}

const createAnswer = async (req, res) => {
  const createdBy = req.user.userId
  const questionId = req.params.id
  const question = await checkQuestionExists(questionId)
  const questionAuthor = question.createdBy
  const { answer: solution } = req.body
  if (!solution) {
    throw new BadRequestError('Please provide an answer to continue')
  }
  const answer = await Answer.create({
    answer: solution, createdBy, questionId, questionAuthor
  })
  res.status(StatusCodes.CREATED).json({ answer })
}

const updateAnswer = async (req, res) => {
  const { id: questionId, answerId } = req.params
  const userId = req.user.userId
  const { answer: solution } = req.body
  if (!solution) {
    throw new BadRequestError('Please provide an answer to continue')
  }
  await checkQuestionExists(questionId)
  await checkAnswerExists(answerId)
  const answer = await Answer.findOneAndUpdate(
    { _id: answerId, createdBy: userId },
    { answer: solution },
    { new: true, runValidators: true }
  )
  if (!answer) {
    throw new UnAuthenticatedError('You are unauthorized!')
  }
  res.status(StatusCodes.OK).json({ answer })
}

const deleteAnswer = async (req, res) => {
  const { id: questionId, answerId } = req.params
  const userId = req.user.userId
  await checkQuestionExists(questionId)
  await checkAnswerExists(answerId)
  const answer = await Answer.findOneAndRemove(
    { _id: answerId, createdBy: userId }
  )
  if (!answer) {
    throw new UnAuthenticatedError('You are unauthorized!')
  }
  res.status(StatusCodes.OK).json({
    msg: `Successfully deleted answer with id ${answerId}`
  })
}

const makePreferredAnswer = async (req, res) => {
  const { id: questionId, answerId } = req.params
  const { preferred } = req.body
  if (!preferred) {
    throw new BadRequestError('Please provide a preferred option to continue')
  }
  const userId = req.user.userId
  await checkQuestionExists(questionId)
  await checkAnswerExists(answerId)
  const answer = await Answer.findOneAndUpdate(
    { _id: answerId, questionAuthor: userId },
    { preferred }, { new: true, runValidators: true })
  if (!answer) {
    throw new UnAuthenticatedError('You are unauthorized!')
  }
  res.status(StatusCodes.OK).json({ answer })
}

module.exports = {
  getAnswer,
  createAnswer,
  updateAnswer,
  deleteAnswer,
  makePreferredAnswer
}
