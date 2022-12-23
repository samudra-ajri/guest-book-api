const adminController = require('../modules/admin/adminController')
const express = require('express')
const { protect } = require('../middlewares/authMiddleware')

const router = express.Router()
router.route('/')
    .get(protect, adminController.getAdmins)
    .post(adminController.register)
router.route('/auth')
    .post(adminController.auth)

module.exports = router