const mongoose = require('mongoose')
const config = require('../../config')

mongoose.set('strictQuery', false)
mongoose.connect(config.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})


module.exports = mongoose.connection
