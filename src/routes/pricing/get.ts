import { Pricing } from '#src/models/pricing'
import { NextFunction, Request, Response } from 'express'
import db from '../../pricing.json'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const get = async (req: Request, res: Response, next: NextFunction) => {

  try {
    const pricing = db as Pricing[]
    res.json(pricing)

  } catch (err) {

    console.error('failed to get pricing', { err })
    return next(err)

  }

}
