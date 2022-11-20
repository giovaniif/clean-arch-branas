import { StockEntry } from "../../src/domain/entity/stock-entry"
import { StockCalculator } from '../../src/domain/entity/stock-calculator'

describe('StockCalcualtor', () => {
  it('should calculate the stock of an item', () => {
    const stockEntries: StockEntry[] = [
      new StockEntry(1, 'in', 10),
      new StockEntry(1, 'in', 10),
      new StockEntry(1, 'out', 5),
    ]
    
    const total = StockCalculator.calculate(stockEntries)

    expect(total).toBe(15)
  })
})