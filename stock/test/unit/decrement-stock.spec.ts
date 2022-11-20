import { DecrementStock } from "../../src/application/usecases/decrement-stock"
import { GetStock } from "../../src/application/usecases/get-stock"
import { StockEntry } from "../../src/domain/entity/stock-entry"
import { StockRepositoryMemory } from "../../src/infra/repository/memory/stock-repository-memory"

describe('DecrementStock', () => {
  it('should decrement the stock', async () => {
    const stockRepository = new StockRepositoryMemory()
    stockRepository.save(new StockEntry(1, 'in', 20))
    const decrementStock = new DecrementStock(stockRepository)
    const input = {
      idItem: 1,
      quantity: 10
    }

    await decrementStock.execute(input)

    const getStock = new GetStock(stockRepository)
    const output = await getStock.execute(1)

    expect(output.total).toBe(10)
  })
})