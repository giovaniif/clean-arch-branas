import { CalculateFreight } from '../../application/calculate-freight'
import { HttpServer } from '../http/http-server'

export class RestController{
  constructor (
    private readonly httpServer: HttpServer,
    private readonly calculateFreight: CalculateFreight
  ) {
    httpServer.on("post", '/calculateFreight', async (_: any, body: any) => {
      const freight = await calculateFreight.execute(body)
      return freight
    })
  }
}