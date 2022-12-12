import { MemoryRepositoryFactory } from "./infra/factory/memory-repository"
import { Checkout } from "./application/use-cases/checkout"
import { GetOrdersByCpf } from "./application/use-cases/get-orders-by-cpf"
import { Preview } from "./application/use-cases/preview"
import { OrderController } from "./infra/controller/order-controller"
import { CalculateFreightHttpGateway } from "./infra/gateway/calculate-freight"
import { GetItemHttpGateway } from "./infra/gateway/get-item"
import { ExpressAdapter } from "./infra/http/express-adapter"

const repositoryFactory = new MemoryRepositoryFactory()
const calculateFreightGateway = new CalculateFreightHttpGateway()
const getItemGateway = new GetItemHttpGateway()
const preview = new Preview(repositoryFactory, getItemGateway, calculateFreightGateway)
const checkout = new Checkout(repositoryFactory, getItemGateway, calculateFreightGateway)
const getOrdersByCpf = new GetOrdersByCpf(repositoryFactory)
const httpServer = new ExpressAdapter()
new OrderController(httpServer, preview, checkout, getOrdersByCpf)
httpServer.listen(3000, () => console.log('checkout running'))
