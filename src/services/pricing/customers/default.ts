import { Order } from '#src/models/order'

export const calculate = async (orders: Order[]): Promise<number> => {

  let total = 0
  orders.forEach(order => {
    total += order.qty * order.retailPrice
  })

  console.log(`total calculated with [default] pricing = ${total}`)
  return total
}
