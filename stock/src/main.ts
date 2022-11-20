import { RestController } from "./infra/controller/rest-controller"
import { ExpressAdapter } from "./infra/http/express-adapter"

const httpServer = new ExpressAdapter()
new RestController(httpServer)
httpServer.listen(3003, () => console.log('stock running'))
