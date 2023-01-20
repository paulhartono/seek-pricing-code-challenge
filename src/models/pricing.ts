import { ProductCode } from './product-code'

export type Pricing = {
  id: number,
  code: ProductCode,
  name: string,
  price: number,
  description: string
}
