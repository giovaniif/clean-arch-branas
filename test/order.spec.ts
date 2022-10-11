import { Coupon } from '../src/domain/entity/coupon'
import Dimension from '../src/domain/entity/dimension'
import { Item } from '../src/domain/entity/item'
import { Order } from '../src/domain/entity/order'

describe('Order', () => {
  it('should not create an order with an invalid cpf', () => {
    expect(() => new Order('11111111111')).toThrow(new Error("invalid cpf"))
  })

  it('should create an order without items', () => {
    const order = new Order('111.444.777-35')
    
    expect(order.getTotal()).toBe(0)
  })

  it('should create an order with 3 items', () => {
    const order = new Order('111.444.777-35')
    order.addItem(new Item(1, "Guitarra", 1000), 1)
    order.addItem(new Item(2, "Amplificador", 5000), 1)
    order.addItem(new Item(3, "Cabo", 30), 3)
    
    expect(order.getTotal()).toBe(6090)
  })

  it('should create an order with 3 items with discount coupon', () => {
    const order = new Order('111.444.777-35')
    order.addItem(new Item(1, "Guitarra", 1000), 1)
    order.addItem(new Item(2, "Amplificador", 5000), 1)
    order.addItem(new Item(3, "Cabo", 30), 3)
    order.addCoupon(new Coupon("VALE20", 20))
    
    expect(order.getTotal()).toBe(4872)
  })

  it('should create an order with 3 items with an expired discount coupon', () => {
    const order = new Order('111.444.777-35', new Date("2022-01-01T10:00:00"))
    order.addItem(new Item(1, "Guitarra", 1000), 1)
    order.addItem(new Item(2, "Amplificador", 5000), 1)
    order.addItem(new Item(3, "Cabo", 30), 3)
    order.addCoupon(new Coupon("VALE20", 20, new Date("2021-01-01T10:00:00")))
    
    expect(order.getTotal()).toBe(6090)
  })

  it('should create an order with 3 items with a not expired discount coupon', () => {
    const order = new Order('111.444.777-35', new Date("2021-01-01T10:00:00"))
    order.addItem(new Item(1, "Guitarra", 1000), 1)
    order.addItem(new Item(2, "Amplificador", 5000), 1)
    order.addItem(new Item(3, "Cabo", 30), 3)
    order.addCoupon(new Coupon("VALE20", 20, new Date("2022-01-01T10:00:00")))
    
    expect(order.getTotal()).toBe(4872)
  })

  it('should not add duplicated items to order', () => {
    const order = new Order('111.444.777-35', new Date("2021-01-01T10:00:00"))
    order.addItem(new Item(1, "Guitarra", 1000), 1)

    expect(() => order.addItem(new Item(1, "Guitarra", 1000), 1)).toThrow(new Error("Duplicated item"))
  })

  it('should create an order with freight', () => {
    const order = new Order('111.444.777-35', new Date("2021-01-01T10:00:00"))
    order.addItem(new Item(1, "Guitarra", 1000, new Dimension(100, 30, 10, 3)), 1)

    const total = order.getTotal()

    expect(total).toBe(1030)
  })

  it('should create an order with code', () => {
    const order = new Order('111.444.777-35', new Date("2021-01-01T10:00:00"), 1)
    order.addItem(new Item(1, "Guitarra", 1000, new Dimension(100, 30, 10, 3)), 1)

    expect(order.getCode()).toBe("202100000001")
  })
})