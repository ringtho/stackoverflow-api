const { StatusCodes } = require('http-status-codes')

const getAllQuestions = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: 'All Questions' })
}

const createQuestion = async (req, res) => {
  res.status(StatusCodes.CREATED).json({ msg: 'Create Questions' })
}

const getSingleQuestion = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: 'Get Question' })
}

const updateQuestion = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: 'Update Question' })
}

const deleteQuestion = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: 'Get Question' })
}

module.exports = {
  getAllQuestions,
  createQuestion,
  getSingleQuestion,
  updateQuestion,
  deleteQuestion
}
