import axios from 'axios'

describe("Order Controller", () => {
  test("should test the preview by the API", async () => {
    const input = {
      cpf: '317.153.361-86',
      orderItems: [
        { idItem: 1, quantity: 1 },
        { idItem: 2, quantity: 1 },
        { idItem: 3, quantity: 3 },
      ]
    }
    const response = await axios.post('http://localhost:3000/preview', input)
    const preview = response.data

    expect(preview.total).toBe(6290)
  })

  test("should test the preview by the API with discount", async () => {
    const input = {
      cpf: '317.153.361-86',
      orderItems: [
        { idItem: 1, quantity: 1 },
        { idItem: 2, quantity: 1 },
        { idItem: 3, quantity: 3 },
      ],
      coupon: 'VALE20'
    }
    const response = await axios.post('http://localhost:3000/preview', input)
    const preview = response.data

    expect(preview.total).toBe(5072)
  })

  test("should test the simulate freight by the API", async () => {
    const input = {
      orderItems: [
        { idItem: 1, quantity: 1 },
      ],
    }
    
    const response = await axios.post('http://localhost:3000/simulateFreight', input)

    const freight = response.data
    expect(freight).toBe(200)
  })
})
