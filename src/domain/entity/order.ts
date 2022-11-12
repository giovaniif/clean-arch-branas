import { Cpf } from "./cpf";
import { Coupon } from "./coupon";
import { Item } from "./item";
import { OrderItem } from "./order-item";
import { OrderCode } from "./order-code";
import { OrderCoupon } from "./order-coupon";

export class Order {
  cpf: Cpf 
  orderItems: OrderItem[]
  coupon?: OrderCoupon
  freight = 0
  private code: OrderCode
  
  constructor (cpf: string, readonly date: Date = new Date(), readonly sequence: number = 1) {
    this.cpf = new Cpf(cpf)
    this.orderItems = []
    this.code = new OrderCode(date, sequence)
  }

  addItem (orderItem: Item, quantity: number) {
    if (this.orderItems.some(item => item.itemId === orderItem.idItem)) throw new Error("Duplicated item")
    this.orderItems.push(new OrderItem(orderItem.idItem, orderItem.price, quantity))
  }

  addCoupon (coupon: Coupon) {
    if (coupon.isExpired(this.date)) return
    this.coupon = new OrderCoupon(coupon.code, coupon.percentage) 
  }

  getCode () {
    return this.code.getCode()
  }

  getTotal () {
    let total = this.orderItems.reduce((total, orderItem) => {
      total += orderItem.getTotal()
      return total
    }, 0)
    if (this.coupon) {
      total -= this.coupon.calculateDiscount(total)
    }
    total += this.freight
    return total
  }
}