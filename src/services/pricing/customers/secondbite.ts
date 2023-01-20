import { Order } from '#src/models/order'
import { ProductCode } from '../../../models'

export const calculate = async (orders: Order[]): Promise<number> => {

  let total = 0
  orders.forEach(order => {
    if (order.itemCode === ProductCode.ClassicAd) {
      // check how many eligible "3 for 2" deal
      const countDeals = Math.floor(order.qty/3)

      // check remaining order not part of "3 for 2" deal
      const remaining = order.qty % 3

      total += (countDeals * 2 * order.retailPrice) + (remaining * order.retailPrice)
    } else {
      total += order.qty * order.retailPrice
    }
  })

  console.log(`total calculated with [secondbite] pricing = ${total}`)
  return total
}
