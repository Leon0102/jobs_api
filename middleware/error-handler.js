const { CustomAPIError } = require('../errors')
const { StatusCodes } = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {

  let customErrors = {
    // set default 
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || 'Something went wrong',
  }
  // if (err instanceof CustomAPIError) {
  //   return res.status(err.statusCode).json({ msg: err.message })
  // }

  if(err.name === 'ValidationError') {
    customErrors.message = Object.values(err.errors).map(error => error.message).join(', ')
    customErrors.statusCode = StatusCodes.BAD_REQUEST
  }

  if(err.code && err.code === 11000) {
    customErrors.message = `Duplicate key error: ${Object.keys(err.keyValue)} already exists`;
    customErrors.statusCode = StatusCodes.BAD_REQUEST;
    
  }
  if(err.name === 'CastError') {
    customErrors.message = `Invalid ${err.path}: ${err.value}`;
    customErrors.statusCode = StatusCodes.BAD_REQUEST;
  }
  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
  return res.status(customErrors.statusCode).json({ msg : customErrors.message })

}

module.exports = errorHandlerMiddleware