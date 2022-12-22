const adminController = require('../modules/admin/adminController')
const express = require('express')

const router = express.Router()
router.route('/').post(adminController.registerAdmin)

module.exports = router