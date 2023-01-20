import { ProductCode } from '#src/models/product-code'
import { NextFunction, Request, Response } from 'express'
import * as PricingService from '../../services/pricing'

type CalculateRequest = {
  items: ProductCode[]
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const calculate = async (req: Request, res: Response, next: NextFunction) => {

  const { customer } = req.query as { customer?: string }
  const { items } = req.body as CalculateRequest

  try {

    if (!req.body || !items || items.length === 0) {
      const err = new Error('Invalid Input')
      err.name = 'InputError'
      throw err
    }

    const total = await PricingService.calculate({itemCodes: items, customerCode: customer})

    res.json({ total, customerCode: customer})
  } catch (err) {

    console.error('failed to calculate pricing', { err })
    return next(err)

  }

}
