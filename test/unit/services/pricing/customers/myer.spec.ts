import { suiteName } from '../../../../../src/util'
import { calculate } from '../../../../../src/services/pricing/customers/myer'
import { Order, ProductCode } from '../../../../../src/models'


describe(suiteName(__filename), () => {

  afterEach(() => {
    jest.clearAllMocks
  })

  it('calculate successfuly', async () => {
    const orders: Order[] = [
      { itemCode: ProductCode.ClassicAd, qty: 2, retailPrice: 10},
      { itemCode: ProductCode.StandoutAd, qty: 6, retailPrice: 20},
      { itemCode: ProductCode.PremiumAd, qty: 2, retailPrice: 30},
    ]

    const total = await calculate(orders)

    expect(total).toEqual(78118)
  })

})
