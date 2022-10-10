import { Checkout } from "../src/application/checkout"
import { Item } from "../src/domain/entity/item"
import { ItemRepositoryMemory } from "../src/infra/repository/memory/item-repository-memory"
import { ItemRepository } from "../src/domain/repositories/item-repository"
import { OrderRepository } from "../src/domain/repositories/order-repository"
import { GetOrdersByCpf } from "../src/application/get-orders-by-cpf"
import { OrderRepositoryMemory } from "../src/infra/repository/memory/order-repository-memory"

describe('Checkout', () => {
  it('should create an order', async () => {
    const itemRepository: ItemRepository = new ItemRepositoryMemory()
    itemRepository.save(new Item(1, "Guitarra", 1000))
    itemRepository.save(new Item(2, "Amplificador", 5000))
    itemRepository.save(new Item(3, "Cabo", 30))
    const orderRepository: OrderRepository = new OrderRepositoryMemory()
    const checkout = new Checkout(itemRepository, orderRepository)
    const input = {
      cpf: '317.153.361-86',
      orderItems: [
        { idItem: 1, quantity: 1 },
        { idItem: 2, quantity: 1 },
        { idItem: 3, quantity: 3 },
      ]
    }
    
    await checkout.execute(input)

    const getOrdersByCpf = new GetOrdersByCpf(orderRepository)
    const orders = await getOrdersByCpf.execute('317.153.361-86')
    expect(orders).toHaveLength(1)
    expect(orders[0].total).toBe(6090)
  })
})
