import convict from "convict"
import * as dotenv from "dotenv"

if (process.env.DOTENV) {
  dotenv.config({ path: process.env.DOTENV })
} else {
  dotenv.config()
}

const config = convict({
  SYSTEM_NAME: {
    env: "SYSTEM_NAME",
    format: "*",
    default: "",
  },
  HTTP_PORT: {
    env: "HTTP_PORT",
    format: "port",
    default: 3000,
  },
  JWT_SECRET: {
    env: "JWT_SECRET",
    format: String,
    default: "",
  },
})

config.validate({ allowed: "strict" })
export { config }
