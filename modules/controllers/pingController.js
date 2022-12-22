const asyncHandler = require('express-async-handler')

const pingController = {}

// @desc    ping
// @route   GET /ping
// @access  Public
pingController.getPing = asyncHandler(async (req, res) => {
    res.json({
        success: true,
        statusCode: 200,
        message: "connected"
    })
})

module.exports = pingController