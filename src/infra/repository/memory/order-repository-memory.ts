import { Order } from "../../../domain/entity/order";
import { OrderRepository } from "../../../domain/repositories/order-repository";

export class OrderRepositoryMemory implements OrderRepository {
  orders: Order[]

  constructor () {
    this.orders = []
  }

  async save (order: Order): Promise<void> {
    this.orders.push(order)
  }

  async getOrdersByCpf (cpf: string): Promise<Order[]> {
    return this.orders.filter(order => order.cpf.getValue() === cpf)
  }
  
  async count(): Promise<number> {
    return this.orders.length
  }
}
