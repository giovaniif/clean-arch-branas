import axios from 'axios'

describe("Order Controller", () => {
  test("should test the calculate freight by the API", async () => {
    const input = {
      orderItems: [
        { volume: 0.03, density: 100, quantity: 1 },
      ],
    }
    
    const response = await axios.post('http://localhost:3001/calculateFreight', input)

    const freight = response.data
    expect(freight).toBe(30)
  })
})
