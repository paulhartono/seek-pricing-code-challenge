import { suiteName } from '../../../../src/util'
import { calculate } from '../../../../src/services/pricing'
import * as customerDefault from '../../../../src/services/pricing/customers/default'
import * as customerAxil from '../../../../src/services/pricing/customers/axil'
import { ProductCode } from '../../../../src/models'

jest.mock('../../../../src/services/pricing/customers/default')
jest.mock('../../../../src/services/pricing/customers/axil')


describe(suiteName(__filename), () => {

  afterEach(() => {
    jest.clearAllMocks
  })

  it('test default customer', async () => {

    (customerDefault.calculate as jest.Mock).mockReturnValue(2)

    const result = await calculate({ itemCodes: [ProductCode.ClassicAd, ProductCode.PremiumAd] })

    expect(customerDefault.calculate).toBeCalled()
    expect(customerAxil.calculate).not.toBeCalled()
    expect(result).toEqual(2)
  })

  it('test axil customer', async () => {

    (customerAxil.calculate as jest.Mock).mockReturnValue(3)

    const result = await calculate({ itemCodes: [ProductCode.ClassicAd, ProductCode.PremiumAd], customerCode: 'axil'})

    expect(customerDefault.calculate).not.toBeCalled()
    expect(customerAxil.calculate).toBeCalled()
    expect(result).toEqual(3)
  })
})
