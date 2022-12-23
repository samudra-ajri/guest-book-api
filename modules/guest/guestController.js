const asyncHandler = require('express-async-handler')
const Event = require('../event/eventModel')
const Guest = require('./guestModel')

const guestController = {}

// @desc    Create guest
// @route   POST /api/guests
// @access  Public
guestController.create = asyncHandler(async (req, res) => {
    const { name, phone, address, event } = req.body

    const eventExists = await Event.findById(event)
    if (!eventExists) {
        res.status(404)
        throw new Error('tidak ada kegiatan')
    }

    const guestExist = await Guest.findOne({ event, phone })
    if (guestExist) {
        res.status(401)
        throw new Error('sudah mengisi kehadiran')
    }

    const guest = await Guest.create({ name, phone, address, event })

    if (guest) {
        res.status(201).json({
            success: true,
            statusCode: 201,
            message: 'success'
        })
    } else {
        res.status(400)
        throw new Error('data tidak valid')
    }
})

// // @desc    Get all events
// // @route   GET /api/events?page=&limit=
// // @access  Public
// eventController.list = asyncHandler(async (req, res) => {
//     const { page = 1, limit = 10 } = req.query;
//     const events = await Event.find({})
//         .limit(limit * 1)
//         .skip((page - 1) * limit)
//         .sort('startedAt')

//     res.json({
//         success: true,
//         statusCode: 200,
//         message: 'success',
//         data: events,
//         total: events.length,
//     })
// })

// // @desc    Get event detail
// // @route   GET /api/events/:id
// // @access  Public
// eventController.detail = asyncHandler(async (req, res) => {
//     const event = await Event.findById(req.params.id)
//     if (event) {
//         res.json({
//             success: true,
//             statusCode: 200,
//             message: 'success',
//             data: event,
//         })
//     } else {
//         res.status(404)
//         throw new Error('Data tidak ditemukan')
//     }
// })

// // @desc    Update user data
// // @route   PUT /api/events/:id
// // @access  Private
// eventController.update = asyncHandler(async (req, res) => {
//     const event = await Event.findById(req.params.id)
//     event.name = req.body.name || event.name
//     event.location = req.body.location || event.location
//     event.startDate = req.body.startDate || event.startDate
//     event.endDate = req.body.endDate || event.endDate
//     event.updatedBy = req.user.email
//     await event.save()

//     res.json({
//         success: true,
//         statusCode: 201,
//         message: 'updated',
//     })
// })

// // @desc    Delete event
// // @route   DELETE /api/events/:id
// // @access  Private
// eventController.delete = asyncHandler(async (req, res) => {
//     const event = await Event.findById(req.params.id)
//     if (event) {
//         await event.remove()
//         res.json({
//             success: true,
//             statusCode: 200,
//             message: req.params.id,
//         })
//     } else {
//         res.status(404)
//         throw new Error('Kegiatan tidak ditemukan')
//     }
// })

module.exports = guestController