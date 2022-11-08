import { Preview } from "../src/application/preview"
import { Item } from "../src/domain/entity/item"
import { ItemRepositoryMemory } from "../src/infra/repository/memory/item-repository-memory"
import { ItemRepository } from "../src/domain/repositories/item-repository"
import { CouponRepositoryMemory } from "../src/infra/repository/memory/coupon-repository-memory"
import { Coupon } from "../src/domain/entity/coupon"
import { ZipcodeRepositoryMemory } from "../src/infra/repository/memory/zipcode-repository-memory"
import { ZipcodeRepository } from "../src/domain/repositories/zipcode-repository"
import { Zipcode } from "../src/domain/entity/zipcode"
import { Coord } from "../src/domain/entity/coord"
import Dimension from "../src/domain/entity/dimension"

describe('Preview', () => {
  let zipcodeRepositoryMemory: ZipcodeRepository

	beforeEach(() => {
		zipcodeRepositoryMemory = new ZipcodeRepositoryMemory()
	})
  
  it('should simulate an order', async () => {
    const itemRepository: ItemRepository = new ItemRepositoryMemory()
    itemRepository.save(new Item(1, "Guitarra", 1000))
    itemRepository.save(new Item(2, "Amplificador", 5000))
    itemRepository.save(new Item(3, "Cabo", 30))
    const couponRepository = new CouponRepositoryMemory()
    const preview = new Preview(itemRepository, couponRepository, zipcodeRepositoryMemory)
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
    const preview = new Preview(itemRepository, couponRepository, zipcodeRepositoryMemory)
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
    zipcodeRepositoryMemory.save(new Zipcode('88015600', 'Rua Almirante Lamego', 'Centro', new Coord(-27.5945, -48.5477)))
		zipcodeRepositoryMemory.save(new Zipcode('22060030', 'Rua Aires Saldanha', 'Copacabana', new Coord(-22.9129, -43.2003)))
    const preview = new Preview(itemRepository, couponRepository, zipcodeRepositoryMemory)
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

    expect(total).toBe(6292.091008941878)
  })
})
