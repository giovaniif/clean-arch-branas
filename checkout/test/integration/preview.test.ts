import { CalculateFreightGateway } from "../../src/application/gateways/calculate-freight"
import { Preview } from "../../src/application/use-cases/preview"
import { RepositoryFactory } from "../../src/domain/factory/repository"
import { MemoryRepositoryFactory } from "../../src/infra/factory/memory-repository"
import { GetItemHttpGateway } from "../../src/infra/gateway/get-item"

describe('Preview', () => {
  let repositoryFactory: RepositoryFactory

  beforeEach(() => {
    repositoryFactory = new MemoryRepositoryFactory()
  })

  it('should simulate an order', async () => {
    const calculateFreightGateway: CalculateFreightGateway = {
      async calculate (): Promise<number> {
        return 0 
      }
    }
    const getItemGateway = new GetItemHttpGateway()
    const preview = new Preview(repositoryFactory, getItemGateway, calculateFreightGateway)
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
    const calculateFreightGateway: CalculateFreightGateway = {
      async calculate (): Promise<number> {
        return 0
      }
    }
    const getItemGateway = new GetItemHttpGateway()
    const preview = new Preview(repositoryFactory, getItemGateway, calculateFreightGateway)
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
    const calculateFreightGateway: CalculateFreightGateway = {
      async calculate (): Promise<number> {
        return 182.09100894187753
      }
    }
    const getItemGateway = new GetItemHttpGateway()
    const preview = new Preview(repositoryFactory, getItemGateway, calculateFreightGateway)
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
