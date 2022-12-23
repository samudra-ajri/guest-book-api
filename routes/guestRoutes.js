const express = require('express')
const { protect } = require('../middlewares/authMiddleware')
const guestController = require('../modules/guest/guestController')

const router = express.Router()
router.route('/')
    .post(guestController.create)

module.exports = router