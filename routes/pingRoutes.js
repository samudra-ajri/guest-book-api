const express = require('express')
const config = require('../config')
const pingController = require(`../modules/controllers/pingController`)

const router = express.Router()
router.route('/').get(pingController.getPing)

module.exports = router