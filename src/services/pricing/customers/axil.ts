import { Order } from '#src/models/order'
import { ProductCode } from '../../../models'

export const calculate = async (orders: Order[]): Promise<number> => {

  let total = 0
  orders.forEach(order => {
    if (order.itemCode === ProductCode.StandoutAd) {
      total += order.qty * 29999
    } else {
      total += order.qty * order.retailPrice
    }
  })

  console.log(`total calculated with [axil] pricing = ${total}`)
  return total
}
