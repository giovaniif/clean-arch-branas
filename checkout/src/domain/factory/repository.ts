import { CouponRepository } from "../repositories/coupon-repository";
import { ItemRepository } from "../repositories/item-repository";
import { OrderRepository } from "../repositories/order-repository";

export interface RepositoryFactory {
  createItemRepository (): ItemRepository
  createCouponRepository (): CouponRepository
  createOrderRepository (): OrderRepository
}
