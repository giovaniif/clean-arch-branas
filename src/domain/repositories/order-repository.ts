import { Order } from "../entity/order";

export interface OrderRepository {
  save: (order: Order) => Promise<void>
  getOrdersByCpf: (cpf: string) => Promise<Order[]>
}