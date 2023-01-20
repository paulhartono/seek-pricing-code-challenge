import request from 'supertest'
import { suiteName } from '../../src/util'
import { setupApp } from '../../src/setup'
import { config } from '../../src/config'
import { Router } from 'express'
import * as jwt from 'jsonwebtoken'

const SYSTEM_NAME = config.get('SYSTEM_NAME')
const JWT_SECRET = config.get('JWT_SECRET') || ''

describe(suiteName(__filename), () => {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let app: any = {}
  const token = jwt.sign({ aud: `${SYSTEM_NAME}` }, JWT_SECRET)

  beforeAll(async () => {
    // if we have db connection, this is a good place to put
  })

  it('single route handler is added', async () => {

    const setupRoutes = (router: Router): void => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      router.get('/', (req: any, res: any) => res.send('bar'))
    }

    const setup = await setupApp({
      jwt: {
        audience: config.get('SYSTEM_NAME'),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        secret: config.get('JWT_SECRET') as any,
      },
      setupRoutes,
    })
    app = setup.express

    const result = await request(app)
      .get('/')
      .set({ Authorization: `Bearer ${token}` })
      .expect(200)

    expect(result.text).toEqual('bar')

  })

})
