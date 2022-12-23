const asyncHandler = require('express-async-handler')
const roleTypes = require('../../consts/roleTypes')
const authUtils = require('../../utils/authUtils')
const Admin = require('./adminModel')

const adminController = {}

// @desc    Register admin
// @route   POST /api/admins
// @access  public
adminController.register = asyncHandler(async (req, res) => {
    const { name, email, phone, password } = req.body

    const adminExists = await Admin.findOne({ email })
    if (adminExists) {
        res.status(403)
        throw new Error('email admin sudah terdaftar')
    }

    const admin = await Admin.create({ name, email, phone, password })
    if (admin) {
        res.status(201).json({
            success: true,
            statusCode: 201,
            message: 'berhasil registrasi'
        })
    } else {
        res.status(400)
        throw new Error('data tidak valid')
    }
})

// @desc    Authenticate an admin
// @route   POST /api/admins/auth
// @access  Public
adminController.auth = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const admin = await Admin.findOne({ email })
    if (admin && (await admin.matchPassword(password))) {
        const data = {
            id: admin.id,
            token: authUtils.generateToken({ email: admin.email, role: admin.role }),
        }
    
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'success',
            data
        })
    } else {
        res.status(401)
        throw new Error('Data salah')
    }
})

// @desc    Get all admins
// @route   GET /api/admins?page=&limit=
// @access  Private
adminController.list = asyncHandler(async (req, res) => {
    if (req.user?.role != roleTypes.SUPERADMIN) {
        res.status(401)
        throw new Error('Not authorized')
    }
    const { page = 1, limit = 10 } = req.query;
    const admins = await Admin.find({})
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .sort('name')
        .select('-password')

    res.json({
        success: true,
        statusCode: 200,
        message: 'success',
        data: admins,
        total: admins.length,
    })
})

// @desc    Get admin detail
// @route   GET /api/admins/:id
// @access  Private
adminController.detail = asyncHandler(async (req, res) => {
    if (req.user?.role != roleTypes.SUPERADMIN) {
        res.status(401)
        throw new Error('Not authorized')
    }
    const admin = await Admin.findById(req.params.id).select('-password')

    if (admin) {
        res.json({
            success: true,
            statusCode: 200,
            message: 'success',
            data: admin,
        })
    } else {
        res.status(404)
        throw new Error('Data tidak ditemukan')
    }
    
})

// @desc    Get my profile
// @route   GET /api/admins/me
// @access  Private
adminController.profile = asyncHandler(async (req, res) => {
    res.json({
        success: true,
        statusCode: 200,
        message: 'success',
        data: req.user,
    })
})

// @desc    Update user data
// @route   PUT /api/users/me
// @access  Private
adminController.update = asyncHandler(async (req, res) => {
    const user = req.user
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.phone = req.body.phone || user.phone

    if (req.body.password) user.password = req.body.password
    await user.save()

    res.json({
        success: true,
        statusCode: 201,
        message: 'updated',
    })
})

// @desc    Delete admin
// @route   DELETE /api/admins/:id
// @access  Private
adminController.delete = asyncHandler(async (req, res) => {
    if (req.user?.role != roleTypes.SUPERADMIN) {
        res.status(401)
        throw new Error('Not authorized')
    }

    const admin = await Admin.findById(req.params.id)
    if (admin) {
        await admin.remove()
        res.json({
            success: true,
            statusCode: 200,
            message: req.params.id,
        })
    } else {
        res.status(404)
        throw new Error('Data tidak ditemukan')
    }
})

module.exports = adminController