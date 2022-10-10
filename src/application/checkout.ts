import { ItemRepository } from "../domain/repositories/item-repository"
import { Order } from "../domain/entity/order"
import { OrderRepository } from "../domain/repositories/order-repository"

export class Checkout {
  constructor (private readonly itemRepository: ItemRepository, private readonly orderRepository: OrderRepository) {}

  async execute (input: Input): Promise<void> {
    const order = new Order(input.cpf)
    for (const orderItem of input.orderItems) {
      const item = await this.itemRepository.getItem(orderItem.idItem)
      order.addItem(item, orderItem.quantity)
    }
    await this.orderRepository.save(order)
  }
}

type Input = {
  orderItems: { idItem: number, quantity: number }[]
  cpf: string
}
