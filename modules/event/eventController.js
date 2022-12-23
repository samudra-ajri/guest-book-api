const asyncHandler = require('express-async-handler')
const Event = require('./eventModel')

const eventController = {}

// @desc    Create event
// @route   POST /api/events
// @access  protect
eventController.create = asyncHandler(async (req, res) => {
    const { name, location, startDate, endDate } = req.body

    const eventExists = await Event.findOne({ name })
    if (eventExists) {
        res.status(403)
        throw new Error('kegiatan sudah pernah dibuat')
    }

    const event = await Event.create({ name, location, startDate, endDate })
    if (event) {
        res.status(201).json({
            success: true,
            statusCode: 201,
            message: 'kegiatan berhasil ditambah'
        })
    } else {
        res.status(400)
        throw new Error('data tidak valid')
    }
})

module.exports = eventController