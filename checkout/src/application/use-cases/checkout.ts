import { Order } from "../../domain/entity/order"
import { OrderRepository } from "../../domain/repositories/order-repository"
import { CouponRepository } from "../../domain/repositories/coupon-repository"
import { RepositoryFactory } from "../../domain/factory/repository"
import { GetItemGateway } from "../gateways/get-item"
import { CalculateFreightGateway } from "../gateways/calculate-freight"

export class Checkout {
  private readonly orderRepository: OrderRepository
  private readonly couponRepository: CouponRepository 

  constructor (
    repositoryFactory: RepositoryFactory,
    readonly getItemGateway: GetItemGateway,
    readonly calculateFreightGateway: CalculateFreightGateway,
  ) {
    this.couponRepository = repositoryFactory.createCouponRepository()
    this.orderRepository = repositoryFactory.createOrderRepository()
  }

  async execute (input: Input): Promise<void> {
    const nextSequence = (await this.orderRepository.count()) + 1
    const order = new Order(input.cpf, input.date, nextSequence)
    const orderItems = []
    for (const orderItem of input.orderItems) {
      const item = await this.getItemGateway.getItem(orderItem.idItem)
      order.addItem(item, orderItem.quantity)
      orderItems.push({ volume: item.getVolume(), density: item.getDensity(), quantity: orderItem.quantity })
    }
    const freight = await this.calculateFreightGateway.calculate(orderItems, input.from, input.to)
    order.freight += freight
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
  from?: string
  to?: string
}
