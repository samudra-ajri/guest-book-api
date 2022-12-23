const adminController = require('../modules/admin/adminController')
const express = require('express')
const { protect } = require('../middlewares/authMiddleware')

const router = express.Router()
router.route('/')
    .get(protect, adminController.list)
    .post(adminController.register)
router.route('/auth')
    .post(adminController.auth)
router.route('/me')
    .get(protect, adminController.profile)
    .put(protect, adminController.update)
router.route('/:id')
    .get(protect, adminController.detail)
    .delete(protect, adminController.delete)

module.exports = router