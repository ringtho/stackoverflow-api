const Question = require('../models/question')
const Answer = require('../models/answer')
const Comment = require('../models/comment')
const { NotFoundError } = require('../errors')

const checkQuestionExists = async (questionId) => {
  const question = await Question.findOne({ _id: questionId })
  if (!question) {
    throw new NotFoundError(`Question with id ${questionId} does not exist`)
  }
  return question
}

const checkAnswerExists = async (answerId) => {
  const answer = await Answer.findOne({ _id: answerId })
  if (!answer) {
    throw new NotFoundError(`Answer with id ${answerId} does not exist`)
  }
  return answer
}

const checkCommentExists = async (commentId) => {
  const comment = await Comment.findOne({ _id: commentId })
  if (!comment) {
    throw new NotFoundError(`Comment with id ${commentId} does not exist`)
  }
  return comment
}

module.exports = { checkQuestionExists, checkAnswerExists, checkCommentExists }
