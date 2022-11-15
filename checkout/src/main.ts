import { Checkout } from "./application/checkout"
import { GetOrdersByCpf } from "./application/get-orders-by-cpf"
import { Preview } from "./application/preview"
import { SimulateFreight } from "./application/simulate-freight"
import { Coord } from "./domain/entity/coord"
import { Coupon } from "./domain/entity/coupon"
import Dimension from "./domain/entity/dimension"
import { Item } from "./domain/entity/item"
import { Zipcode } from "./domain/entity/zipcode"
import { OrderController } from "./infra/controller/order-controller"
import MemoryRepositoryFactory from "./infra/factory/memory-repository"
import { CalculateFreightHttpGateway } from "./infra/gateway/calculate-freight"
import { GetItemHttpGateway } from "./infra/gateway/get-item"
import { ExpressAdapter } from "./infra/http/express-adapter"
import { CouponRepositoryMemory } from "./infra/repository/memory/coupon-repository-memory"
import { ItemRepositoryMemory } from "./infra/repository/memory/item-repository-memory"
import { OrderRepositoryMemory } from "./infra/repository/memory/order-repository-memory"
import { ZipcodeRepositoryMemory } from "./infra/repository/memory/zipcode-repository-memory"

const itemRepository = new ItemRepositoryMemory()
itemRepository.save(new Item(1, "Guitarra", 1000, new Dimension(100, 30, 10, 3)))
itemRepository.save(new Item(2, "Amplificador", 5000, new Dimension(50, 50, 50, 20)))
itemRepository.save(new Item(3, "Cabo", 30, new Dimension(10, 10, 10, 0.9)))
const orderRepository = new OrderRepositoryMemory()
const couponRepository = new CouponRepositoryMemory()
const repositoryFactory = new MemoryRepositoryFactory()
couponRepository.save(new Coupon("VALE20", 20))
const zipcodeRepository = new ZipcodeRepositoryMemory()
const calculateFreightGateway = new CalculateFreightHttpGateway()
const getItemGateway = new GetItemHttpGateway()
const preview = new Preview(couponRepository, getItemGateway, calculateFreightGateway)
const checkout = new Checkout(repositoryFactory)
const getOrdersByCpf = new GetOrdersByCpf(orderRepository)
zipcodeRepository.save(new Zipcode('88015600', 'Rua Almirante Lamego', 'Centro', new Coord(-27.5945, -48.5477)))
zipcodeRepository.save(new Zipcode('22060030', 'Rua Aires Saldanha', 'Copacabana', new Coord(-22.9129, -43.2003)))
const simulateFreight = new SimulateFreight(itemRepository, zipcodeRepository)
const httpServer = new ExpressAdapter()
new OrderController(httpServer, preview, checkout, getOrdersByCpf, simulateFreight)
httpServer.listen(3000, () => console.log('checkout running'))
