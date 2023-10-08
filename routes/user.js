const express = require('express')
const router = express.Router()
const { getUserDetails } = require('../controllers/users')

router.route('/').get(getUserDetails)

module.exports = router
