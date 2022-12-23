const mongoose = require('mongoose')

const guestSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        unique: true,
        required: true
    },
    address: {
        type: String,
        required: false
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    },
}, {
    timestamps: true
})

const Guest = mongoose.model('Guest', guestSchema)
module.exports = Guest