import { Order } from '#src/models/order'
import { ProductCode } from '../../../models'

export const calculate = async (orders: Order[]): Promise<number> => {

  let total = 0
  orders.forEach(order => {
    if (order.itemCode === ProductCode.StandoutAd) {
      // check how many eligible "5 for 4" deal
      const countDeals = Math.floor(order.qty/5)

      // check remaining order not part of "5 for 4" deal
      const remaining = order.qty % 5

      total += (countDeals * 4 * order.retailPrice) + (remaining * order.retailPrice)
    } else if (order.itemCode === ProductCode.PremiumAd) {
      total += order.qty * 38999
    } else {
      total += order.qty * order.retailPrice
    }
  })

  console.log(`total calculated with [myer] pricing = ${total}`)
  return total
}
