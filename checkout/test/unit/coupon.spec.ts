import { Coupon } from "../../src/domain/entity/coupon"

describe('Coupon', () => {
  it('should calculate the discount', () => {
    const coupon = new Coupon("VALE20", 20)
    const discount = coupon.calculateDiscount(1000)
    expect(discount).toBe(200)
  })

  it('should return correctly for a not expired coupon', () => {
    const coupon = new Coupon("VALE20", 20, new Date("2022-03-03T10:00:00"))
    const discount = coupon.calculateDiscount(1000, new Date("2021-03-03T10:00:00"))
    expect(discount).toBe(200)
  })

  it('should return 0 for an expired coupon', () => {
    const coupon = new Coupon("VALE20", 20, new Date("2021-03-03T10:00:00"))
    const discount = coupon.calculateDiscount(1000, new Date("2022-03-03T10:00:00"))
    expect(discount).toBe(0)
  })
})