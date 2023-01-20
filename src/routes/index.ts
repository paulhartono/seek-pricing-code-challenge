import { Router } from "express"
import * as pricing from "./pricing"

export const setupRoutes = (router: Router): void => {
  router.get("/pricing", pricing.get) // retrieve pricing list
  router.post("/pricing/calculate", pricing.calculate) // calculate total checkout product items
}
