const Question = require('../models/question')
const Answer = require('../models/answer')
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

module.exports = { checkQuestionExists, checkAnswerExists }
