import { ItemRepository } from "../domain/repositories/item-repository"
import { Order } from "../domain/entity/order"
import { CouponRepository } from "../domain/repositories/coupon-repository"
import { CalculateFreightGateway } from "./gateways/calculate-freight"
import { GetItemGateway } from "./gateways/get-item"

export class Preview {
  constructor (
    private readonly couponRepository: CouponRepository,
    private readonly getItemGateway: GetItemGateway,
    private readonly calculateFreightGateway: CalculateFreightGateway
  ) {}

  async execute (input: Input): Promise<number> {
    const order = new Order(input.cpf)
    const orderItems = []
    for (const orderItem of input.orderItems) {
      const item = await this.getItemGateway.getItem(orderItem.idItem)
      order.addItem(item, orderItem.quantity)
      orderItems.push({ volume: item.getVolume(), density: item.getDensity(), quantity: orderItem.quantity })
    }
    order.freight = await this.calculateFreightGateway.calculate(orderItems, input.from, input.to)
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
  from?: string
  to?: string
}
