import { Order } from "#src/models/order"
import { Pricing } from "#src/models/pricing"
import { ProductCode } from "#src/models/product-code"
import db from "../../pricing.json"

interface CustomerPricingModule {
  calculate(orders: Order[]): Promise<number>
}

type CalculateInput = {
  itemCodes: ProductCode[]
  customerCode?: string
}

// Calculate wrapper service function. This function is responsible to dynamically load different types customer pricing model.
// Any new customer model pricing should be implemented on the customers/<customer-pricing-model>
export const calculate = async ({ itemCodes, customerCode = "default" }: CalculateInput): Promise<number> => {
  let customerModule: CustomerPricingModule
  const pricingList = db as Pricing[]
  // create map of key=itemcode; value=itemTotal
  const itemMap = new Map<string, Order>()
  for (const itemCode of itemCodes) {
    if (itemMap.has(itemCode)) {
      const order = itemMap.get(itemCode)
      if (order) {
        itemMap.set(itemCode, { ...order, qty: order.qty + 1 } as Order)
      }
    } else {
      const pricing = pricingList.find((el) => el.code === itemCode)
      if (pricing) {
        itemMap.set(itemCode, { itemCode, qty: 1, retailPrice: pricing.price } as Order)
      }
    }
  }

  try {
    customerModule = await import(`./customers/${customerCode}`)
    console.log(`loaded ${customerCode} pricing module`)
  } catch (err) {
    customerModule = await import("./customers/default")
    console.log("loading default pricing module instead")
  }

  const orders = Array.from(itemMap, ([_key, value]) => value)
  const total = await customerModule.calculate(orders)

  return total
}
