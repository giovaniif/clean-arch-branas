import { Item } from "./item";

export class OrderItem {
  readonly quantity: number
  
  constructor (readonly itemId: number, readonly price: number, quantity: number) {
    if (quantity < 0) throw new Error("quantity must not be a negative number")
    this.quantity = quantity
  }

  getTotal () {
    return this.price * this.quantity
  }
}