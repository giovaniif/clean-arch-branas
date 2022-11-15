import { Preview } from "../src/application/preview"
import { Item } from "../src/domain/entity/item"
import { ItemRepositoryMemory } from "../src/infra/repository/memory/item-repository-memory"
import { ItemRepository } from "../src/domain/repositories/item-repository"
import { CouponRepositoryMemory } from "../src/infra/repository/memory/coupon-repository-memory"
import { Coupon } from "../src/domain/entity/coupon"
import Dimension from "../src/domain/entity/dimension"
import { CalculateFreightGateway } from "../src/application/gateways/calculate-freight"
import { CalculateFreightHttpGateway } from "../src/infra/gateway/calculate-freight"
import { GetItemHttpGateway } from "../src/infra/gateway/get-item"

describe('Preview', () => {
  it('should simulate an order', async () => {
    const itemRepository: ItemRepository = new ItemRepositoryMemory()
    itemRepository.save(new Item(1, "Guitarra", 1000))
    itemRepository.save(new Item(2, "Amplificador", 5000))
    itemRepository.save(new Item(3, "Cabo", 30))
    const couponRepository = new CouponRepositoryMemory()
    const calculateFreightGateway: CalculateFreightGateway = {
      async calculate (): Promise<number> {
        return 0 
      }
    }
    const getItemGateway = new GetItemHttpGateway()
    const preview = new Preview(couponRepository, getItemGateway, calculateFreightGateway)
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

  it('should simulate an order with discount', async () => {
    const itemRepository: ItemRepository = new ItemRepositoryMemory()
    itemRepository.save(new Item(1, "Guitarra", 1000))
    itemRepository.save(new Item(2, "Amplificador", 5000))
    itemRepository.save(new Item(3, "Cabo", 30))
    const couponRepository = new CouponRepositoryMemory()
    couponRepository.save(new Coupon("VALE20", 20))
    const calculateFreightGateway: CalculateFreightGateway = {
      async calculate (): Promise<number> {
        return 0
      }
    }
    const getItemGateway = new GetItemHttpGateway()
    const preview = new Preview(couponRepository, getItemGateway, calculateFreightGateway)
    const input = {
      cpf: '317.153.361-86',
      orderItems: [
        { idItem: 1, quantity: 1 },
        { idItem: 2, quantity: 1 },
        { idItem: 3, quantity: 3 },
      ],
      coupon: 'VALE20'
    }
    
    const total = await preview.execute(input)

    expect(total).toBe(4872)
  })

  it('should simulate an order with distance', async () => {
    const itemRepository: ItemRepository = new ItemRepositoryMemory()
    itemRepository.save(new Item(1, "Guitarra", 1000, new Dimension(100, 30, 10, 3)))
    itemRepository.save(new Item(2, "Amplificador", 5000, new Dimension(50, 50, 50, 20)))
    itemRepository.save(new Item(3, "Cabo", 30, new Dimension(10, 10, 10, 0.9)))
    const couponRepository = new CouponRepositoryMemory()
    const calculateFreightGateway: CalculateFreightGateway = {
      async calculate (): Promise<number> {
        return 182.09100894187753
      }
    }
    const getItemGateway = new GetItemHttpGateway()
    const preview = new Preview(couponRepository, getItemGateway, calculateFreightGateway)
    const input = {
      cpf: '317.153.361-86',
      orderItems: [
        { idItem: 1, quantity: 1 },
        { idItem: 2, quantity: 1 },
        { idItem: 3, quantity: 3 },
      ],
      from: '88015600',
			to: '22060030'
    }
    
    const total = await preview.execute(input)

    expect(total).toBe(6272.091008941878)
  })
})
