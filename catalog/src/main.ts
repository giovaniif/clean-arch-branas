import { GetItem } from "./application/get-item"
import { Dimension } from "./domain/entity/dimension"
import { Item } from "./domain/entity/item"
import { RestController } from "./infra/controller/rest-controller"
import { ExpressAdapter } from "./infra/http/express-adapter"
import { ItemRepositoryMemory } from "./infra/repository/memory/item-repository-memory"

const itemRepository = new ItemRepositoryMemory()
itemRepository.save(new Item(1, "Guitarra", 1000, new Dimension(100, 30, 10, 3)))
itemRepository.save(new Item(2, "Amplificador", 5000, new Dimension(50, 50, 50, 20)))
itemRepository.save(new Item(3, "Cabo", 30, new Dimension(10, 10, 10, 0.9)))
const getItem = new GetItem(itemRepository)
const httpServer = new ExpressAdapter()
new RestController(httpServer, getItem)
httpServer.listen(3002, () => console.log('catalog running'))

