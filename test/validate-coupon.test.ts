import { ValidateCoupon } from "../src/application/validate-coupon"
import { Coupon } from "../src/domain/entity/coupon"
import { CouponRepositoryMemory } from "../src/infra/repository/memory/coupon-repository-memory"

describe("ValidateCoupon", () => {
  it("should validate the discount coupon", async () => {
    const couponRepository = new CouponRepositoryMemory()
    couponRepository.save(new Coupon("VALE20", 29, new Date("2022-10-10")))
    const validateCoupon = new ValidateCoupon(couponRepository)
    const input = {
      date: new Date("2022-11-10"),
      code: 'VALE20'
    }
    const isValid = await validateCoupon.execute(input)

    expect(isValid).toBe(true)
  })
})