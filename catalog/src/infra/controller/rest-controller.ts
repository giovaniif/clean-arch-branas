import { GetItem } from "../../application/get-item"
import { HttpServer } from "../http/http-server"

export class RestController {
  constructor (
    private readonly httpServer: HttpServer,
    private readonly getItem: GetItem
  ) {
    httpServer.on("get", '/items/:idItem', async (params: any) => {
      const item = await getItem.execute(params.idItem)
      return item
    })
  }
}