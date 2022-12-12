import { StockEntry } from "../../domain/entity/stock-entry"
import { StockRepository } from "../../domain/repositories/stock-repository"

export class DecrementStock {
  constructor (readonly stockRepository: StockRepository) {}

  async execute (input: Input): Promise<void> {
    await this.stockRepository.save(new StockEntry(input.idItem, 'out', input.quantity))
  }
}

type Input = {
  idItem: number
  quantity: number
}
