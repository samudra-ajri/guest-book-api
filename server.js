const cors = require('cors')
const express = require('express')
const morgan = require('morgan')

const config = require('./config')
const mongoDb = require('./database/config/mongo')
const errorMiddleware = require('./middlewares/errorMiddleware')
const pingRoutes = require('./routes/pingRoutes')
const adminRoutes = require('./routes/adminRoutes')
const eventRoutes = require('./routes/eventRoutes')

// Connecting db
mongoDb
  .once('open', function callback() { console.log('Connection with mongoDb succeeded.') })
  .on('error', console.error.bind(console, 'connection error'))

// Connecting express
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Logging
if (config.NODE_ENV !== 'production') app.use(morgan('dev'))

// Routes
app.use('/api/ping', pingRoutes)
app.use('/api/admins', adminRoutes)
app.use('/api/events', eventRoutes)

// Error handler
app.use(errorMiddleware.notFound)
app.use(errorMiddleware.errorHandler)

// Listening port
app.listen(config.PORT, console.log('API server running on port:', `${config.APP_URL}:${config.PORT}`))