import { CalculateFreight } from '../src/application/calculate-freight'
import { Coord } from '../src/domain/entity/coord'
import { Zipcode } from '../src/domain/entity/zipcode'
import { ZipcodeRepository } from '../src/domain/repositories/zipcode-repository'
import { ZipcodeRepositoryMemory } from '../src/infra/repository/memory/zipcode-repository-memory'

describe('CalculateFreight', () => {
	let zipcodeRepositoryMemory: ZipcodeRepository 

	beforeEach(() => {
		zipcodeRepositoryMemory = new ZipcodeRepositoryMemory()
	})

  it('should calculate the freight', async () => {
		const simulateFreight = new CalculateFreight(zipcodeRepositoryMemory)
		const input = {
			orderItems: [
			  { volume: 0.03, density: 100, quantity: 1 }
			]
		}	
		const freight = await simulateFreight.execute(input)
		expect(freight).toBe(30)
  })

	it('should calculate the freight calculating the distance', async () => {
		const simulateFreight = new CalculateFreight(zipcodeRepositoryMemory)
		zipcodeRepositoryMemory.save(new Zipcode('88015600', 'Rua Almirante Lamego', 'Centro', new Coord(-27.5945, -48.5477)))
		zipcodeRepositoryMemory.save(new Zipcode('22060030', 'Rua Aires Saldanha', 'Copacabana', new Coord(-22.9129, -43.2003)))
		const input = {
			orderItems: [{ volume: 0.03, density: 100, quantity: 1 }],
			from: '88015600',
			to: '22060030'
		}	
		const freight = await simulateFreight.execute(input)
		expect(freight).toBe(22.446653340244893)
  })
})
