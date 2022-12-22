const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const roleTypes = require('../../consts/roleTypes')

const adminSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: false,
        unique: false,
    },
    password: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    },
    role: {
        type: String,
        required: true,
        default: roleTypes.ADMIN
    },
}, {
    timestamps: true
})

adminSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

adminSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

const Admin = mongoose.model('Admin', adminSchema)
module.exports = Admin