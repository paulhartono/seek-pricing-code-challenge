/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorRequestHandler } from 'express'

interface Logger {
  info(data: any, message: string): any

  error(data: any, message: string): any
}

export const createDefaultErrorHandler = (logger?: Logger): ErrorRequestHandler => {

  return (err, req: any, res, next) => {

    if (res.headersSent) {
      return next(err)
    }

    const { code, name, message } = err

    if (name === 'UnauthorizedError') {
      return res.status(401).json({
        error: {
          code: name,
          message,
        },
      })
    }

    if (code === 'ForbiddenError') {
      return res.status(403).json({
        error: {
          code,
          message,
        },
      })
    }

    if (name === 'InputError') {
      return res.status(400).json({
        error: {
          code: name,
          message,
        },
      })
    }

    // TODO: Suggested to use Swagger
    // then we can extend this to lookup swagger validation error handling such that:
    // example:
    // if (
    //   err instanceof swaggerValidator.InputValidationError
    //   || code === 'InvalidInputError'
    //   || message === 'Input validation error'
    // ) {
    //   return res.status(400).json({
    //     errors: [{
    //       code: err.code || 'InvalidInputError',
    //       message,
    //     }],
    //   })
    // }

    // if (typeof code === 'string' && code.includes('NotFoundError')) {
    //   return res.status(404).json({
    //     errors: [{
    //       code,
    //       message,
    //     }],
    //   })
    // }

    if (logger)
      logger.error({ err }, 'unknown error occurred')
    else
      console.error('unknown error occurred: ', err.message)

    return res.status(500).json({
      errors: [{
        code: 'ServerError',
        message,
      }],
    })

  }

}
