import { ItemRepository } from "../domain/repositories/item-repository"
import { Order } from "../domain/entity/order"

export class Preview {
  constructor (private readonly itemRepository: ItemRepository) {}

  async execute (input: Input): Promise<number> {
    const order = new Order(input.cpf)
    for (const orderItem of input.orderItems) {
      const item = await this.itemRepository.getItem(orderItem.idItem)
      order.addItem(item, orderItem.quantity)
    }
    return order.getTotal()
  }
}

type Input = {
  orderItems: { idItem: number, quantity: number }[]
  cpf: string
}
