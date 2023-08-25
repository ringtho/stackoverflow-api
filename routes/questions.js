const express = require('express')
const router = express.Router()

const {
  getAllQuestions,
  createQuestion,
  getSingleQuestion,
  updateQuestion,
  deleteQuestion,
  getUserCreatedQuestions,
  searchQuestions
} = require('../controllers/questions')
const {
  createAnswer,
  updateAnswer,
  deleteAnswer,
  makePreferredAnswer,
  getAnswer
} = require('../controllers/answers')
const {
  createComment,
  updateComment,
  deleteComment
} = require('../controllers/comments')

router.route('/')
  .get(getAllQuestions)
  .post(createQuestion)

router.route('/:id')
  .get(getSingleQuestion)
  .patch(updateQuestion)
  .delete(deleteQuestion)

router.route('/search').post(searchQuestions)

// answers
router.route('/:id/answers').post(createAnswer)
router.route('/:id/answers/:answerId')
  .get(getAnswer)
  .put(updateAnswer)
  .patch(makePreferredAnswer)
  .delete(deleteAnswer)

// comments
router.route('/:id/answers/:answerId/comments')
  .post(createComment)
router.route('/:id/answers/:answerId/comments/:commentId')
  .patch(updateComment)
  .delete(deleteComment)

router.route('/users/:userId').get(getUserCreatedQuestions)

module.exports = router
