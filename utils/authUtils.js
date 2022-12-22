const jwt = require('jsonwebtoken')

const authUtils = {}

authUtils.generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

module.exports = authUtils