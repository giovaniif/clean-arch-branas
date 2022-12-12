import { Coupon } from "../../src/domain/entity/coupon"
import { MemoryRepositoryFactory } from "../../src/infra/factory/memory-repository"
import { CouponRepository } from "../../src/domain/repositories/coupon-repository"
import { RepositoryFactory } from "../../src/domain/factory/repository"
import { Checkout } from "../../src/application/use-cases/checkout"
import { GetOrdersByCpf } from "../../src/application/use-cases/get-orders-by-cpf"
import { GetItemHttpGateway } from "../../src/infra/gateway/get-item"
import { CalculateFreightHttpGateway } from "../../src/infra/gateway/calculate-freight"
import { GetItemGateway } from "../../src/application/gateways/get-item"

describe('Checkout', () => {
  let couponRepository: CouponRepository
  let repositoryFactory: RepositoryFactory
  let getItemGateway: GetItemGateway;
  let calculateFreightGateway: CalculateFreightHttpGateway;

  beforeEach(() => {
    repositoryFactory = new MemoryRepositoryFactory()
    couponRepository = repositoryFactory.createCouponRepository()
    getItemGateway = new GetItemHttpGateway();
    calculateFreightGateway = new CalculateFreightHttpGateway();
  })

  it('should create an order', async () => {
  
    const checkout = new Checkout(repositoryFactory, getItemGateway, calculateFreightGateway)
    const input = {
      cpf: '317.153.361-86',
      orderItems: [
        { idItem: 1, quantity: 1 },
        { idItem: 2, quantity: 1 },
        { idItem: 3, quantity: 3 },
      ]
    }
    
    await checkout.execute(input)

    const getOrdersByCpf = new GetOrdersByCpf(repositoryFactory)
    const orders = await getOrdersByCpf.execute('317.153.361-86')
    expect(orders).toHaveLength(1)
    expect(orders[0].total).toBe(6330)
  })

  it('should create an order with discount', async () => {
    const checkout = new Checkout(repositoryFactory, getItemGateway, calculateFreightGateway)
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

    const getOrdersByCpf = new GetOrdersByCpf(repositoryFactory)
    const orders = await getOrdersByCpf.execute('317.153.361-86')
    expect(orders).toHaveLength(1)
    expect(orders[0].total).toBe(5112)
  })

  it('should create an order with expired discount coupon', async () => {
    const checkout = new Checkout(repositoryFactory, getItemGateway, calculateFreightGateway)
    const input = {
      cpf: '317.153.361-86',
      orderItems: [
        { idItem: 1, quantity: 1 },
        { idItem: 2, quantity: 1 },
        { idItem: 3, quantity: 3 },
      ],
      coupon: 'EXPIRED',
      date: new Date("2022-01-01T10:00:00")
    }
    
    await checkout.execute(input)

    const getOrdersByCpf = new GetOrdersByCpf(repositoryFactory)
    const orders = await getOrdersByCpf.execute('317.153.361-86')
    expect(orders).toHaveLength(1)
    expect(orders[0].total).toBe(6330)
  })

  it('should create an order with valid discount coupon', async () => {
    couponRepository.save(new Coupon("VALE20", 20, new Date('2022-01-01T10:00:00')))
    const checkout = new Checkout(repositoryFactory, getItemGateway, calculateFreightGateway)
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

    const getOrdersByCpf = new GetOrdersByCpf(repositoryFactory)
    const orders = await getOrdersByCpf.execute('317.153.361-86')
    expect(orders).toHaveLength(1)
    expect(orders[0].total).toBe(5112)
  })

  it('should create an order with freight', async () => {
    const checkout = new Checkout(repositoryFactory, getItemGateway, calculateFreightGateway)
    const input = {
      cpf: '317.153.361-86',
      orderItems: [
        { idItem: 1, quantity: 1 },
        { idItem: 2, quantity: 1 },
        { idItem: 3, quantity: 3 },
      ],
    }
    
    await checkout.execute(input)

    const getOrdersByCpf = new GetOrdersByCpf(repositoryFactory)
    const orders = await getOrdersByCpf.execute('317.153.361-86')
    expect(orders).toHaveLength(1)
    expect(orders[0].total).toBe(6330)
  })

  it('should create an order with code', async () => {
    const checkout = new Checkout(repositoryFactory, getItemGateway, calculateFreightGateway)
    const input = {
      cpf: '317.153.361-86',
      orderItems: [
        { idItem: 1, quantity: 1 },
      ],
      date: new Date("2021-01-01T10:00:00")
    }
    
    await checkout.execute(input)
    await checkout.execute(input)

    const getOrdersByCpf = new GetOrdersByCpf(repositoryFactory)
    const orders = await getOrdersByCpf.execute('317.153.361-86')
    expect(orders).toHaveLength(2)
    expect(orders[0].code).toBe('202100000001')
    expect(orders[1].code).toBe('202100000002')
  })
})
