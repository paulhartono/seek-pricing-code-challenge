import { v4 as uuidv4 } from 'uuid'
import { RequestHandler, Request, Response, NextFunction } from 'express'

export default (): RequestHandler => {

  return (req: Request, res: Response, next: NextFunction) => {

    const traceToken = req.get('x-ph-trace-token') || uuidv4()

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ; (req as any).traceToken = traceToken
    res.set('x-ph-trace-token', traceToken)

    next()

  }

}
