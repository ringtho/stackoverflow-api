const express = require('express')
const router = express.Router()

const {
  getAllQuestions,
  createQuestion,
  getSingleQuestion,
  updateQuestion,
  deleteQuestion
} = require('../controllers/questions')

router.route('/')
  .get(getAllQuestions)
  .post(createQuestion)

router.route('/:id')
  .get(getSingleQuestion)
  .patch(updateQuestion)
  .delete(deleteQuestion)

module.exports = router
