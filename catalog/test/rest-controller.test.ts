import axios from 'axios'

describe("Rest Controller", () => {
  test("should test getItems by the API", async () => {
    const response = await axios.get('http://localhost:3002/items/1')
    
    const item = response.data
    expect(item.price).toBe(1000)
  })
})
