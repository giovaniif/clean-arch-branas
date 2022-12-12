import { RepositoryFactory } from "../../domain/factory/repository"
import { OrderRepository } from "../../domain/repositories/order-repository"

export class GetOrdersByCpf {
  private readonly orderRepository: OrderRepository
  constructor (repositoryFactory: RepositoryFactory) {
    this.orderRepository = repositoryFactory.createOrderRepository()
  }

  async execute (cpf: string): Promise<Output[]> {
    const output = []
    const orders = await this.orderRepository.getOrdersByCpf(cpf)
    for (const order of orders) {
      output.push({
        total: order.getTotal(),
        code: order.getCode()
      })
    }
    return output
  }
}

type Output = {
  total: number
  code: string
}
