const express = require('express')
const { protect } = require('../middlewares/authMiddleware')
const eventController = require('../modules/event/eventController')

const router = express.Router()
router.route('/')
    .post(protect, eventController.create)

module.exports = router