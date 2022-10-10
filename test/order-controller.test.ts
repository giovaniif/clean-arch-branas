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

    expect(preview.total).toBe(6090)
  })
})
