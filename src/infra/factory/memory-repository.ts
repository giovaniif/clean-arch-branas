import { RepositoryFactory } from "../../domain/factory/repository";
import { CouponRepository } from "../../domain/repositories/coupon-repository";
import { ItemRepository } from "../../domain/repositories/item-repository";
import { OrderRepository } from "../../domain/repositories/order-repository";
import { CouponRepositoryMemory } from "../repository/memory/coupon-repository-memory";
import { ItemRepositoryMemory } from "../repository/memory/item-repository-memory";
import { OrderRepositoryMemory } from "../repository/memory/order-repository-memory";

export default class MemoryRepositoryFactory implements RepositoryFactory {
  itemRepository?: ItemRepository
  couponRepository?: CouponRepository 
  orderRepository?: OrderRepository

  createItemRepository(): ItemRepository {
    if (!this.itemRepository) {
      this.itemRepository = new ItemRepositoryMemory()
    }
    return this.itemRepository
  }

  createCouponRepository(): CouponRepository {
    if (!this.couponRepository) {
      this.couponRepository = new CouponRepositoryMemory()
    }
    return this.couponRepository
  }

  createOrderRepository(): OrderRepository {
    if (!this.orderRepository) {
      this.orderRepository = new OrderRepositoryMemory()
    }
    return this.orderRepository
  }
}