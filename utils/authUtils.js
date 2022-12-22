const jwt = require('jsonwebtoken')

const authUtils = {}

authUtils.generateToken = (email, role) => {
    return jwt.sign({ email, role }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

module.exports = authUtils