import { FreightCalculator } from '../src/domain/entity/freight-calculator'

describe('FreightCalculator', () => {
  it('should calculate the freight', () => {
    const freight = FreightCalculator.calculate(0.03, 100)

    expect(freight).toBe(30)
  })

  it('should calculate the minimum freight', () => {
    const freight = FreightCalculator.calculate(0.001, 900)

    expect(freight).toBe(10)
  })

  it('should calculate the freight with distance', () => {
    const distance = 748.2217780081631

    const freight = FreightCalculator.calculate(0.03, 100, distance)

    expect(freight).toBe(22.446653340244893)
  })
})