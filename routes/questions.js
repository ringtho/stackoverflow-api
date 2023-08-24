const express = require('express')
const router = express.Router()

const {
  getAllQuestions,
  createQuestion,
  getSingleQuestion,
  updateQuestion,
  deleteQuestion,
  getUserCreatedQuestions
} = require('../controllers/questions')
const {
  createAnswer,
  updateAnswer,
  deleteAnswer
} = require('../controllers/answers')

router.route('/')
  .get(getAllQuestions)
  .post(createQuestion)

router.route('/:id')
  .get(getSingleQuestion)
  .patch(updateQuestion)
  .delete(deleteQuestion)

router.route('/:id/answers').post(createAnswer)
router.route('/:id/answers/:answerId')
  .patch(updateAnswer)
  .delete(deleteAnswer)

router.route('/users/:userId').get(getUserCreatedQuestions)

module.exports = router
