const errorMiddleware = {}

errorMiddleware.notFound = (req, res, next) => {
    const error = new Error('Not Found')
    res.status(404)
    next(error)
}

errorMiddleware.errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode

    if (err.message === 'Request failed with status code 400') {
        statusCode = 400
        err.message = 'Access token tidak valid'
    }
    
    res.status(statusCode)
    res.json({
        statusCode: res.statusCode,
        message: err.message,
        success: false,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
}

module.exports = errorMiddleware