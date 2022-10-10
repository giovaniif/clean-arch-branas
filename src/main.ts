import { Checkout } from "./application/checkout"
import { GetOrdersByCpf } from "./application/get-orders-by-cpf"
import { Preview } from "./application/preview"
import { Item } from "./domain/entity/item"
import { OrderController } from "./infra/controller/order-controller"
import { ExpressAdapter } from "./infra/http/express-adapter"
import { ItemRepositoryMemory } from "./infra/repository/memory/item-repository-memory"
import { OrderRepositoryMemory } from "./infra/repository/memory/order-repository-memory"

const itemRepository = new ItemRepositoryMemory()
itemRepository.save(new Item(1, "Guitarra", 1000))
itemRepository.save(new Item(2, "Amplificador", 5000))
itemRepository.save(new Item(3, "Cabo", 30))
const orderRepository = new OrderRepositoryMemory()
const preview = new Preview(itemRepository)
const checkout = new Checkout(itemRepository, orderRepository)
const getOrdersByCpf = new GetOrdersByCpf(orderRepository)
const httpServer = new ExpressAdapter()
new OrderController(httpServer, preview, checkout, getOrdersByCpf)
httpServer.listen(3000, () => console.log('app running'))