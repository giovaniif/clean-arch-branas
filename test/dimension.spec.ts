import Dimension from "../src/domain/entity/dimension"

describe('Dimension', () => {
  it('should calcualte the volume ', () => {
    const dimension = new Dimension(100, 30, 10, 3)
    expect(dimension.getVolume()).toBe(0.03)
  })

  it('should not create invalid dimenson', () => {
    expect(() => new Dimension(-100, -30, -10, -3)).toThrow(new Error("invalid dimension"))
  })
})
