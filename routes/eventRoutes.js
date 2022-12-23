const express = require('express')
const { protect } = require('../middlewares/authMiddleware')
const eventController = require('../modules/event/eventController')

const router = express.Router()
router.route('/')
    .post(protect, eventController.create)
    .get(eventController.list)
router.route('/:id')
    .get(eventController.detail)
    .put(protect, eventController.update)
    .delete(protect, eventController.delete)

module.exports = router