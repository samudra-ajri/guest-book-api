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

// @desc    Get all guest by event
// @route   GET /api/guests/event/:eventId/page=&limit=
// @access  Private
guestController.guestEventList = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10 } = req.query
    const { eventId } = req.params

    const guests = await Guest.find({ event: eventId })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .sort('createdAt')

    const total = await Guest.count({ event: eventId })

    res.json({
        success: true,
        statusCode: 200,
        message: 'success',
        data: guests,
        count: guests.length,
        hasNextPage: guests.length == limit,
        total,
    })
})

module.exports = guestController