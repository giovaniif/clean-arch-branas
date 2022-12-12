import { Order } from "../../domain/entity/order"
import { RepositoryFactory } from "../../domain/factory/repository"
import { CouponRepository } from "../../domain/repositories/coupon-repository"
import { CalculateFreightGateway } from "../gateways/calculate-freight"
import { GetItemGateway } from "../gateways/get-item"

export class Preview {
  private readonly couponRepository: CouponRepository
  constructor (
    repositoryFactory: RepositoryFactory,
    private readonly getItemGateway: GetItemGateway,
    private readonly calculateFreightGateway: CalculateFreightGateway
  ) {
    this.couponRepository = repositoryFactory.createCouponRepository()
  }

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
      if (coupon) order.addCoupon(coupon)
    }
    const total = order.getTotal()
    return total
  }
}

type Input = {
  orderItems: { idItem: number, quantity: number }[]
  cpf: string
  coupon?: string
  from?: string
  to?: string
}
