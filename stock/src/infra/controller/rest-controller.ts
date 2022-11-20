import { HttpServer } from '../http/http-server'

export class RestController{
  constructor (
    private readonly httpServer: HttpServer,
  ) {
  }
}