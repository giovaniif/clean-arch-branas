import { ItemRepository } from "../domain/repositories/item-repository"
import { Order } from "../domain/entity/order"
import { OrderRepository } from "../domain/repositories/order-repository"
import { CouponRepository } from "../domain/repositories/coupon-repository"
import { RepositoryFactory } from "../domain/factory/repository"

export class Checkout {
  private readonly orderRepository: OrderRepository
  private readonly itemRepository: ItemRepository 
  private readonly couponRepository: CouponRepository 
  constructor (repositoryFactory: RepositoryFactory) {
    this.itemRepository = repositoryFactory.createItemRepository()
    this.couponRepository = repositoryFactory.createCouponRepository()
    this.orderRepository = repositoryFactory.createOrderRepository()
  }

  async execute (input: Input): Promise<void> {
    const nextSequence = (await this.orderRepository.count()) + 1
    const order = new Order(input.cpf, input.date, nextSequence)
    for (const orderItem of input.orderItems) {
      const item = await this.itemRepository.getItem(orderItem.idItem)
      order.addItem(item, orderItem.quantity)
    }
    if (input.coupon) {
      const coupon = await this.couponRepository.getCoupon(input.coupon)
      if (coupon) {
        order.addCoupon(coupon)
      }
    }
    await this.orderRepository.save(order)
  }
}

type Input = {
  orderItems: { idItem: number, quantity: number }[]
  cpf: string
  coupon?: string
  date?: Date
}
