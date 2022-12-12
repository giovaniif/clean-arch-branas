import { OrderCode } from "../../src/domain/entity/order-code"

describe('OrderCode', () => {
  it('should create an order code', () => {
    const orderCode = new OrderCode(new Date("2021-01-01T10:00:00"), 1)
    expect(orderCode.getCode()).toBe("202100000001")
  })
})