import { CalculateFreight } from "./application/calculate-freight"
import { Coord } from "./domain/entity/coord"
import { Zipcode } from "./domain/entity/zipcode"
import { RestController } from "./infra/controller/rest-controller"
import { ExpressAdapter } from "./infra/http/express-adapter"
import { ZipcodeRepositoryMemory } from "./infra/repository/memory/zipcode-repository-memory"

const zipcodeRepository = new ZipcodeRepositoryMemory()
zipcodeRepository.save(new Zipcode('88015600', 'Rua Almirante Lamego', 'Centro', new Coord(-27.5945, -48.5477)))
zipcodeRepository.save(new Zipcode('22060030', 'Rua Aires Saldanha', 'Copacabana', new Coord(-22.9129, -43.2003)))
const calculateFreight = new CalculateFreight(zipcodeRepository)
const httpServer = new ExpressAdapter()
new RestController(httpServer, calculateFreight)
httpServer.listen(3001, () => console.log('freight running'))
