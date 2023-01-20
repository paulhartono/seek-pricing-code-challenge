import express, { Router } from "express"
import cookieParser from "cookie-parser"
// @ts-ignore
import expressHealthcheck = require("express-healthcheck")
import { createDefaultErrorHandler } from "./middlewares/create-default-error-handler"
import { expressjwt } from "express-jwt"

export interface SetupApiOptions {
  jwt: "disabled" | { secret: string; audience: string }
  parseCookies?: boolean
  healthcheck?: { test: () => Promise<void> }
  setupRoutes: (router: Router) => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  logger?: Console // suggestion: can use bunyan or winston here, but for simplicity i put console logging here
}

interface SetupApiOutput {
  express: express.Express
}

export const setupApp = async (options: SetupApiOptions): Promise<SetupApiOutput> => {
  const app: express.Express = express()

  let healthcheck = expressHealthcheck()

  if (options.healthcheck) {
    healthcheck = expressHealthcheck({
      // eslint-disable-next-line @typescript-eslint/ban-types
      test: (callback: Function) => {
        // @ts-ignore`
        options.healthcheck
          .test()
          .then(() => callback())
          .catch((err) => {
            if (options.logger) {
              options.logger.error({ err }, "healthcheck test failed")
            } else {
              console.error("healthcheck failed", err)
            }
            callback(new Error("down"))
          })
      },
    })
  }

  app.use("/healthcheck", healthcheck)

  app.use(express.json())

  if (options.parseCookies === true) {
    app.use("/", cookieParser())
  }

  const router = express.Router()

  // setup route level middlewares.
  // example, we can set a traceToken for log tracing purpose here
  // router.use(traceToken())

  // we can preformat request log format output
  //router.use(requestLogger(options.logger))

  // Set JWT
  if (options.jwt !== "disabled") {
    router.use(
      expressjwt({
        ...options.jwt,
        algorithms: ["HS256"],
      })
    )
  }

  options.setupRoutes(router)

  app.use(router)

  // default error handler
  app.use(createDefaultErrorHandler(options.logger))

  return { express: app }
}
