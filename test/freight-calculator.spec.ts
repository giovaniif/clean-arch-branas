import Dimension from "../src/domain/entity/dimension"
import FreightCalculator from "../src/domain/entity/freight-calculator"
import { Item } from "../src/domain/entity/item"

describe('FreightCalculator', () => {
  it('should calculate the freight', () => {
    const item = new Item(1, "Guitarra", 1000, new Dimension(100, 30, 10, 3))

    const freight = FreightCalculator.calculate(item)

    expect(freight).toBe(30)
  })

  it('should calculate the minimum freight', () => {
    const item = new Item(1, "Guitarra", 1000, new Dimension(1, 1, 1, 0.9))

    const freight = FreightCalculator.calculate(item)

    expect(freight).toBe(10)
  })

  it('should calculate the freight with distance', () => {
    const item = new Item(1, "Guitarra", 1000, new Dimension(100, 30, 10, 3))
    const distance = 748.2217780081631

    const freight = FreightCalculator.calculate(item, distance)

    expect(freight).toBe(22.446653340244893)
  })
})