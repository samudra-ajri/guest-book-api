const mongoose = require('mongoose')

const eventSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    }
}, {
    timestamps: true
})

const Event = mongoose.model('Event', eventSchema)
module.exports = Event