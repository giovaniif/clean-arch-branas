import { Coord } from "../src/domain/entity/coord"
import { DistanceCalculator } from "../src/domain/entity/distance-calculator"

describe('DistanceCalculator', () => {
  it('should calculate the distance between two coords', () => {
    const from = new Coord(-27.5945, -48.5477)
    const to = new Coord(-22.9129, -43.2003)

    const distance = DistanceCalculator.calculate(from, to)

    expect(distance).toBe(748.2217780081631)
  })
})
