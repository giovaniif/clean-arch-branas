import { GetItem } from "../src/application/get-item"
import { Dimension } from "../src/domain/entity/dimension"
import { Item } from "../src/domain/entity/item"
import { ItemRepositoryMemory } from "../src/infra/repository/memory/item-repository-memory"

describe("GetItem", () => {
  it('should get the item ', async () => {
		const itemRepository = new ItemRepositoryMemory()
		itemRepository.save(new Item(1, "Guitarra", 1000, new Dimension(100, 30, 10, 3)))
		const getItem = new GetItem(itemRepository)

		const freight = await getItem.execute(1)

		expect(freight.price).toBe(1000)
  })
})
