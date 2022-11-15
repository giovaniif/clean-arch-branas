import { SimulateFreight } from "../src/application/simulate-freight"
import { Coord } from "../src/domain/entity/coord"
import Dimension from "../src/domain/entity/dimension"
import { Item } from "../src/domain/entity/item"
import { Zipcode } from "../src/domain/entity/zipcode"
import { ZipcodeRepository } from "../src/domain/repositories/zipcode-repository"
import { ItemRepositoryMemory } from "../src/infra/repository/memory/item-repository-memory"
import { ZipcodeRepositoryMemory } from "../src/infra/repository/memory/zipcode-repository-memory"

describe("SimulateFreight", () => {
	let zipcodeRepositoryMemory: ZipcodeRepository 

	beforeEach(() => {
		zipcodeRepositoryMemory = new ZipcodeRepositoryMemory()
	})

  it('should simulate the freight', async () => {
		const itemRepository = new ItemRepositoryMemory()
		itemRepository.save(new Item(1, "Guitarra", 100, new Dimension(100, 30, 10, 3)))
		const simulateFreight = new SimulateFreight(itemRepository, zipcodeRepositoryMemory)
		const input = {
			orderItems: [
			{ idItem: 1, quantity: 1 }
			]
		}	
		const freight = await simulateFreight.execute(input)
		expect(freight).toBe(30)
  })

	it('should simulate the freight calculating the distance', async () => {
		const itemRepository = new ItemRepositoryMemory()
		itemRepository.save(new Item(1, "Guitarra", 100, new Dimension(100, 30, 10, 3)))
		const simulateFreight = new SimulateFreight(itemRepository, zipcodeRepositoryMemory)
		zipcodeRepositoryMemory.save(new Zipcode('88015600', 'Rua Almirante Lamego', 'Centro', new Coord(-27.5945, -48.5477)))
		zipcodeRepositoryMemory.save(new Zipcode('22060030', 'Rua Aires Saldanha', 'Copacabana', new Coord(-22.9129, -43.2003)))
		const input = {
			orderItems: [{ idItem: 1, quantity: 1 }],
			from: '88015600',
			to: '22060030'
		}	
		const freight = await simulateFreight.execute(input)
		expect(freight).toBe(22.446653340244893)
  })
})
