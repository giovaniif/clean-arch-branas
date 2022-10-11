import { SimulateFreight } from "../src/application/simulate-freight"
import Dimension from "../src/domain/entity/dimension"
import { Item } from "../src/domain/entity/item"
import { ItemRepositoryMemory } from "../src/infra/repository/memory/item-repository-memory"

describe("SimulateFreight", () => {
  it('should simulate the freight', async () => {
		const itemRepository = new ItemRepositoryMemory()
		itemRepository.save(new Item(1, "Guitarra", 100, new Dimension(100, 30, 10, 3)))
		const simulateFreight = new SimulateFreight(itemRepository)
		const input = {
			orderItems: [
			{ idItem: 1, quantity: 1 }
			]
		}	
		const freight = await simulateFreight.execute(input)
		expect(freight).toBe(30)
  })
})
