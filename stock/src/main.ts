import { DecrementStock } from "./application/usecases/decrement-stock"
import { GetStock } from "./application/usecases/get-stock"
import { StockEntry } from "./domain/entity/stock-entry"
import { RestController } from "./infra/controller/rest-controller"
import { ExpressAdapter } from "./infra/http/express-adapter"
import { StockRepositoryMemory } from "./infra/repository/memory/stock-repository-memory"

const httpServer = new ExpressAdapter()
const stockRepository = new StockRepositoryMemory()
stockRepository.save(new StockEntry(1, 'in', 20))
const getStock = new GetStock(stockRepository)
const decrementStock = new DecrementStock(stockRepository)
new RestController(httpServer, decrementStock, getStock)
httpServer.listen(3003, () => console.log('stock running'))
