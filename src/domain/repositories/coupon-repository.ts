import { Coupon } from "../entity/coupon";

export interface CouponRepository {
  getCoupon (code: string): Promise<Coupon | undefined>
  save (coupon: Coupon): Promise<void>
}