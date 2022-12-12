import { Coupon } from "../../../domain/entity/coupon";
import { CouponRepository } from "../../../domain/repositories/coupon-repository";

export class CouponRepositoryMemory implements CouponRepository {
  private coupons: Coupon[]

  constructor () {
    this.coupons = [new Coupon("VALE20", 20), new Coupon("EXPIRED", 20, new Date('1999-01-01'))]
  }

  async save (coupon: Coupon): Promise<void> {
    this.coupons.push(coupon)
  }

  async getCoupon(code: string): Promise<Coupon | undefined> {
    return this.coupons.find(coupon => coupon.code === code)
  }
}