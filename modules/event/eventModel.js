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
    },
    guests: [{
        name: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: false
        },
        address: {
            type: String,
            required: false
        },
        time: {
            type: Date,
            required: true
        }
    }],
    guestsCount: {
        type: Number,
        required: true,
        default: 0
    }
}, {
    timestamps: true
})

eventSchema.pre('save', async function(next) {
    this.guestsCount = this.guests.length
})

const Event = mongoose.model('Event', eventSchema)
module.exports = Event