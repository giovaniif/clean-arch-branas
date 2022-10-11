import { ItemRepository } from "../domain/repositories/item-repository"
import { Order } from "../domain/entity/order"
import { CouponRepository } from "../domain/repositories/coupon-repository"

export class Preview {
  constructor (private readonly itemRepository: ItemRepository, private readonly couponRepository: CouponRepository) {}

  async execute (input: Input): Promise<number> {
    const order = new Order(input.cpf)
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
    return order.getTotal()
  }
}

type Input = {
  orderItems: { idItem: number, quantity: number }[]
  cpf: string
  coupon?: string
}
