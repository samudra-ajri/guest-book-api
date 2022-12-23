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
adminController.getAdmins = asyncHandler(async (req, res) => {
    if (req.admin?.role != roleTypes.SUPERADMIN) {
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

// // @desc    Get user by id
// // @route   GET /api/users/:id
// // @access  Private/Manager
// const getUserById = asyncHandler(async (req, res) => {
//     const user = await User.findById(req.params.id).select('-password')
//     res.json(user)
// })

// // @desc    Get user data
// // @route   GET /api/users/me
// // @access  Private
// const getMe = asyncHandler(async (req, res) => {
//     res.status(200).json(req.user)
// })

// // @desc    Update user data
// // @route   PUT /api/users/me
// // @access  Private
// const updateMe = asyncHandler(async (req, res) => {
//     const user = req.user

//     user.name = req.body.name || user.name
//     user.sex = req.body.sex || user.sex
//     user.username = req.body.username || user.username
//     user.email = req.body.email || user.email
//     user.phone = req.body.phone || user.phone
//     user.isMuballigh = req.body.isMuballigh
//     user.ds = req.body.ds || user.ds
//     user.klp = req.body.klp || user.klp

//     const yearBirth = req.body.yearBirth || new Date(user.birthdate).getFullYear()
//     const monthBirth = req.body.monthBirth - 1 || new Date(user.birthdate).getMonth()
//     const dayBirth = req.body.dayBirth || new Date(user.birthdate).getDate()

//     if (req.body.yearBirth || req.body.monthBirth || req.body.dayBirth) {
//         if (validateDate(yearBirth, monthBirth, dayBirth)) {
//             user.birthdate = new Date(Date.UTC(Number(yearBirth), Number(monthBirth), Number(dayBirth)))
//         } else {
//             res.status(400)
//             throw new Error('Invalid birthdate')
//         }
//     }

//     if (req.body.password) {
//         user.password = req.body.password
//     }

//     const updatedUser = await user.save()
//     const { password, ...userData } = updatedUser._doc
//     res.json({
//         ...userData,
//         token: generateToken(user._id)
//     })
// })

// // @desc    Update user data that allowed by Manager
// // @route   PUT /api/users/:id
// // @access  Private/Manager
// const updateUserByManager = asyncHandler(async (req, res) => {
//     const user = await User.findById(req.params.id).select('-password')
//     user.isMuballigh = req.body.isMuballigh || user.isMuballigh
//     user.isActive = req.body.isActive || user.isActive
//     user.role = req.body.role || user.role
//     user.ds = req.body.ds || user.ds
//     user.klp = req.body.klp || user.klp

//     // Update user completion
//     if (req.body.ds || req.body.klp) {
//         await Completion.updateMany({
//             user: req.params.id
//         }, {
//             $set: {
//                 ds: user.ds,
//                 klp: user.klp,
//             }
//         })
//     }

//     const updatedUser = await user.save()
//     const { password, ...userData } = updatedUser._doc
//     res.json({
//         ...userData,
//     })
// })

// // @desc    Delete a user
// // @route   DELETE /api/users/:id
// // @access  Private/Manager
// const deleteUser = asyncHandler(async (req, res) => {
//     const user = await User.findById(req.params.id)
//     if (user) {
//         await user.remove()
//         res.json({ id: req.params.id })
//     } else {
//         res.status(404)
//         throw new Error('User not found')
//     }
// })

// // @desc    Get users roles count
// // @route   GET /api/users/roles?ds=&klp=
// // @access  Private, Managers
// const getRolesCount = asyncHandler(async (req, res) => {
//     const { ds, klp } = req.query;
//     const locations = []
//     if (ds) locations.push({ ds: ds.toUpperCase() })
//     if (klp) locations.push({ klp: klp.toUpperCase() })

//     const roles = await User.aggregate(
//         [
//             { $match: filterLocation(locations) },
//             {
//                 $group: {
//                     _id: "$role",
//                     total: { $sum: 1 }
//                 }
//             },
//         ]
//     )
//     res.status(200).json({
//         countRoles: roles,
//     })
// })

module.exports = adminController