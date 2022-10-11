import { Checkout } from "./application/checkout"
import { GetOrdersByCpf } from "./application/get-orders-by-cpf"
import { Preview } from "./application/preview"
import { SimulateFreight } from "./application/simulate-freight"
import { Coupon } from "./domain/entity/coupon"
import Dimension from "./domain/entity/dimension"
import { Item } from "./domain/entity/item"
import { OrderController } from "./infra/controller/order-controller"
import MemoryRepositoryFactory from "./infra/factory/memory-repository"
import { ExpressAdapter } from "./infra/http/express-adapter"
import { CouponRepositoryMemory } from "./infra/repository/memory/coupon-repository-memory"
import { ItemRepositoryMemory } from "./infra/repository/memory/item-repository-memory"
import { OrderRepositoryMemory } from "./infra/repository/memory/order-repository-memory"

const itemRepository = new ItemRepositoryMemory()
itemRepository.save(new Item(1, "Guitarra", 1000, new Dimension(100, 100, 300, 20)))
itemRepository.save(new Item(2, "Amplificador", 5000))
itemRepository.save(new Item(3, "Cabo", 30))
const orderRepository = new OrderRepositoryMemory()
const couponRepository = new CouponRepositoryMemory()
const repositoryFactory = new MemoryRepositoryFactory()
couponRepository.save(new Coupon("VALE20", 20))
const preview = new Preview(itemRepository, couponRepository)
const checkout = new Checkout(repositoryFactory)
const getOrdersByCpf = new GetOrdersByCpf(orderRepository)
const simulateFreight = new SimulateFreight(itemRepository)
const httpServer = new ExpressAdapter()
new OrderController(httpServer, preview, checkout, getOrdersByCpf, simulateFreight)
httpServer.listen(3000, () => console.log('app running'))
