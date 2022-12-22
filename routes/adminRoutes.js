const adminController = require('../modules/admin/adminController')
const express = require('express')

const router = express.Router()
router.route('/').post(adminController.register)
router.route('/auth').post(adminController.auth)

module.exports = router