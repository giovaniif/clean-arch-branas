import { Cpf } from "./cpf";
import { Coupon } from "./coupon";
import { Item } from "./item";
import { OrderItem } from "./order-item";
import FreightCalculator from "./freight-calculator";
import { OrderCode } from "./order-code";

export class Order {
  cpf: Cpf 
  orderItems: OrderItem[]
  coupon?: Coupon
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
    this.freight += FreightCalculator.calculate(orderItem) * quantity
  }

  addCoupon (coupon: Coupon) {
    this.coupon = coupon
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
      total -= this.coupon.calculateDiscount(total, this.date)
    }
    total += this.freight
    return total
  }

}