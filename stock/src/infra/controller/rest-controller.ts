import { DecrementStock } from '../../application/usecases/decrement-stock'
import { GetStock } from '../../application/usecases/get-stock'
import { HttpServer } from '../http/http-server'

export class RestController {
  constructor (
    private readonly httpServer: HttpServer,
    private readonly decrementStock: DecrementStock,
    private readonly getStock: GetStock,
  ) {
    httpServer.on('post', '/decrementStock', async (params: any, body: any) => {
      await decrementStock.execute(body)
    })
    httpServer.on('post', '/getStock/:idItem', async (params: any, body: any) => {
      const output = await getStock.execute(params.idItem)
      return output
    })
  }
}