import { Preview } from "../src/application/preview"
import { Item } from "../src/domain/entity/item"
import { ItemRepositoryMemory } from "../src/infra/repository/memory/item-repository-memory"
import { ItemRepository } from "../src/domain/repositories/item-repository"

describe('Preview', () => {
  it('should simulate an order', async () => {
    const itemRepository: ItemRepository = new ItemRepositoryMemory()
    itemRepository.save(new Item(1, "Guitarra", 1000))
    itemRepository.save(new Item(2, "Amplificador", 5000))
    itemRepository.save(new Item(3, "Cabo", 30))
    const preview = new Preview(itemRepository)
    const input = {
      cpf: '317.153.361-86',
      orderItems: [
        { idItem: 1, quantity: 1 },
        { idItem: 2, quantity: 1 },
        { idItem: 3, quantity: 3 },
      ]
    }
    
    const total = await preview.execute(input)

    expect(total).toBe(6090)
  })
})
