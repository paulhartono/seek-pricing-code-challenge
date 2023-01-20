import { Express } from "express"
import { setupApp } from "./setup"
import { setupRoutes } from "./routes"
import { config } from "./config"

const listen = (app: Express, name: string, port: number) => {
  app.listen(port, () => {
    console.log(`Express ${name} server running at http://0.0.0.0:${port}/`)
  })
}

Promise.all([
  setupApp({
    jwt: {
      audience: config.get("SYSTEM_NAME"),
      secret: config.get("JWT_SECRET"),
    },
    setupRoutes,
  }),
  //setupSomethingElseHereWhenNecessary(),
])
  .then(([app]) => {
    listen(app.express, "main", config.get("HTTP_PORT"))
  })
  .catch((err) => {
    console.error("setup throws error", err) // eslint-disable-line
    process.exit(1)
  })
