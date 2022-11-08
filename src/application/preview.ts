import { ItemRepository } from "../domain/repositories/item-repository"
import { Order } from "../domain/entity/order"
import { CouponRepository } from "../domain/repositories/coupon-repository"
import FreightCalculator from "../domain/entity/freight-calculator"
import { ZipcodeRepository } from "../domain/repositories/zipcode-repository"
import { DistanceCalculator } from "../domain/entity/distance-calculator"

export class Preview {
  constructor (
    private readonly itemRepository: ItemRepository, 
    private readonly couponRepository: CouponRepository,
    private readonly zipcodeRepository: ZipcodeRepository
  ) {}

  async execute (input: Input): Promise<number> {
    const order = new Order(input.cpf)
    let distance
    if (input.from && input.to) {
      const from = await this.zipcodeRepository.getByCode(input.from)
      const to = await this.zipcodeRepository.getByCode(input.to)
      distance = DistanceCalculator.calculate(from.coord, to.coord)
    }
    for (const orderItem of input.orderItems) {
      const item = await this.itemRepository.getItem(orderItem.idItem)
      order.addItem(item, orderItem.quantity)
      order.freight += FreightCalculator.calculate(item, distance) * orderItem.quantity
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
  from?: string
  to?: string
}
