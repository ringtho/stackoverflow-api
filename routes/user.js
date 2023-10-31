const express = require('express')
const router = express.Router()
const { getUserDetails, getLoggedInUser } = require('../controllers/users')

router.route('/:id').get(getUserDetails)
router.route('/').get(getLoggedInUser)

module.exports = router
