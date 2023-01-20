import { ProductCode } from './product-code'

export type Order = {
  itemCode: ProductCode,
  qty: number,
  retailPrice: number
}
