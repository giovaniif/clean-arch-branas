import { Checkout } from "../src/application/checkout"
import { Item } from "../src/domain/entity/item"
import { GetOrdersByCpf } from "../src/application/get-orders-by-cpf"
import { Coupon } from "../src/domain/entity/coupon"
import MemoryRepositoryFactory from "../src/infra/factory/memory-repository"
import { ItemRepository } from "../src/domain/repositories/item-repository"
import { OrderRepository } from "../src/domain/repositories/order-repository"
import { CouponRepository } from "../src/domain/repositories/coupon-repository"
import { RepositoryFactory } from "../src/domain/factory/repository"

describe('Checkout', () => {
  let itemRepository: ItemRepository
  let orderRepository: OrderRepository
  let couponRepository: CouponRepository
  let repositoryFactory: RepositoryFactory

  beforeEach(() => {
    repositoryFactory = new MemoryRepositoryFactory()
    itemRepository = repositoryFactory.createItemRepository()
    orderRepository = repositoryFactory.createOrderRepository()
    couponRepository = repositoryFactory.createCouponRepository()
  })

  it('should create an order', async () => {
    itemRepository.save(new Item(1, "Guitarra", 1000))
    itemRepository.save(new Item(2, "Amplificador", 5000))
    itemRepository.save(new Item(3, "Cabo", 30))
    const checkout = new Checkout(repositoryFactory)
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

  it('should create an order with discount', async () => {
    itemRepository.save(new Item(1, "Guitarra", 1000))
    itemRepository.save(new Item(2, "Amplificador", 5000))
    itemRepository.save(new Item(3, "Cabo", 30))
    couponRepository.save(new Coupon("VALE20", 20))
    const checkout = new Checkout(repositoryFactory)
    const input = {
      cpf: '317.153.361-86',
      orderItems: [
        { idItem: 1, quantity: 1 },
        { idItem: 2, quantity: 1 },
        { idItem: 3, quantity: 3 },
      ],
      coupon: 'VALE20'
    }
    
    await checkout.execute(input)

    const getOrdersByCpf = new GetOrdersByCpf(orderRepository)
    const orders = await getOrdersByCpf.execute('317.153.361-86')
    expect(orders).toHaveLength(1)
    expect(orders[0].total).toBe(4872)
  })

  it('should create an order with expired discount coupon', async () => {
    itemRepository.save(new Item(1, "Guitarra", 1000))
    itemRepository.save(new Item(2, "Amplificador", 5000))
    itemRepository.save(new Item(3, "Cabo", 30))
    couponRepository.save(new Coupon("VALE20", 20, new Date('2021-01-01T10:00:00')))
    const checkout = new Checkout(repositoryFactory)
    const input = {
      cpf: '317.153.361-86',
      orderItems: [
        { idItem: 1, quantity: 1 },
        { idItem: 2, quantity: 1 },
        { idItem: 3, quantity: 3 },
      ],
      coupon: 'VALE20',
      date: new Date("2022-01-01T10:00:00")
    }
    
    await checkout.execute(input)

    const getOrdersByCpf = new GetOrdersByCpf(orderRepository)
    const orders = await getOrdersByCpf.execute('317.153.361-86')
    expect(orders).toHaveLength(1)
    expect(orders[0].total).toBe(6090)
  })

  it('should create an order with valid discount coupon', async () => {
    itemRepository.save(new Item(1, "Guitarra", 1000))
    itemRepository.save(new Item(2, "Amplificador", 5000))
    itemRepository.save(new Item(3, "Cabo", 30))
    couponRepository.save(new Coupon("VALE20", 20, new Date('2022-01-01T10:00:00')))
    const checkout = new Checkout(repositoryFactory)
    const input = {
      cpf: '317.153.361-86',
      orderItems: [
        { idItem: 1, quantity: 1 },
        { idItem: 2, quantity: 1 },
        { idItem: 3, quantity: 3 },
      ],
      coupon: 'VALE20',
      date: new Date("2021-01-01T10:00:00")
    }
    
    await checkout.execute(input)

    const getOrdersByCpf = new GetOrdersByCpf(orderRepository)
    const orders = await getOrdersByCpf.execute('317.153.361-86')
    expect(orders).toHaveLength(1)
    expect(orders[0].total).toBe(4872)
  })

  it('should create an order with code', async () => {
    itemRepository.save(new Item(1, "Guitarra", 1000))
    const checkout = new Checkout(repositoryFactory)
    const input = {
      cpf: '317.153.361-86',
      orderItems: [
        { idItem: 1, quantity: 1 },
      ],
      date: new Date("2021-01-01T10:00:00")
    }
    
    await checkout.execute(input)
    await checkout.execute(input)

    const getOrdersByCpf = new GetOrdersByCpf(orderRepository)
    const orders = await getOrdersByCpf.execute('317.153.361-86')
    expect(orders).toHaveLength(2)
    expect(orders[0].code).toBe('202100000001')
    expect(orders[1].code).toBe('202100000002')
  })
})
