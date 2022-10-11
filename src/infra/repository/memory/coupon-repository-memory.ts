import { Coupon } from "../../../domain/entity/coupon";
import { CouponRepository } from "../../../domain/repositories/coupon-repository";

export class CouponRepositoryMemory implements CouponRepository {
  private coupons: Coupon[]

  constructor () {
    this.coupons = []
  }

  async save (coupon: Coupon): Promise<void> {
    this.coupons.push(coupon)
  }

  async getCoupon(code: string): Promise<Coupon | undefined> {
    return this.coupons.find(coupon => coupon.code === code)
  }
}