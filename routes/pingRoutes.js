const express = require('express')
const pingController = require('../modules/ping/pingController')

const router = express.Router()
router.route('/').get(pingController.getPing)

module.exports = router