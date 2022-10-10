import { Checkout } from "../../application/checkout";
import { GetOrdersByCpf } from "../../application/get-orders-by-cpf";
import { Preview } from "../../application/preview";
import { HttpServer } from "../http/http-server";

export class OrderController {
  constructor (
    private readonly httpServer: HttpServer,
    private readonly preview: Preview,
    private readonly checkout: Checkout,
    private readonly getOrdersByCpf: GetOrdersByCpf
  ) {
    httpServer.on("post", '/preview', async (_: any, body: any) => {
      const total = await preview.execute(body)
      return { total }
    })
    
    httpServer.on("post", '/checkout', async (_: any, body: any) => {
      await checkout.execute(body)
    })
    
    httpServer.on("post", '/orders/:cpf', async (params: any) => {
      const orders = await getOrdersByCpf.execute(params.cpf)
      return orders
    })
  }
}