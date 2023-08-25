const Comment = require('../models/comment')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnAuthenticatedError } = require('../errors')
const {
  checkQuestionExists,
  checkAnswerExists,
  checkCommentExists
} = require('./utils')

const createComment = async (req, res) => {
  const { id: questionId, answerId } = req.params
  const { userId } = req.user
  const { comment: data } = req.body
  if (!data) {
    throw new BadRequestError('Please provide a comment to the answer')
  }
  await checkQuestionExists(questionId)
  await checkAnswerExists(answerId)
  const comment = await Comment.create({
    comment: data,
    createdBy: userId,
    answerId
  })
  res.status(StatusCodes.CREATED).json({ comment })
}

const updateComment = (req, res) => {
  res.status(StatusCodes.CREATED).json({ msg: 'Updated Comment' })
}

const deleteComment = async (req, res) => {
  const {
    params: { id: questionId, answerId, commentId },
    user: { userId }
  } = req
  await checkQuestionExists(questionId)
  await checkAnswerExists(answerId)
  await checkCommentExists(commentId)
  const comment = await Comment.findOneAndRemove({
    _id: commentId,
    createdBy: userId
  })
  if (!comment) {
    throw new UnAuthenticatedError('You are unauthorized!')
  }
  res.status(StatusCodes.OK).json({
    msg: `Successfully deleted comment with id ${commentId}`
  })
}

module.exports = {
  createComment,
  updateComment,
  deleteComment
}
