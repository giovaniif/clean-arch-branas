import { OrderItem } from "../../src/domain/entity/order-item"

describe('OrderItem', () => {
  it('should create an order item', () => {
    const item = new OrderItem(1, 10, 2)

    expect(item.getTotal()).toBe(20)
  })

  it('should not create an order item with negative quantity', () => {
    expect(() => new OrderItem(1, 10, -1)).toThrow(new Error("quantity must not be a negative number"))
  })
})