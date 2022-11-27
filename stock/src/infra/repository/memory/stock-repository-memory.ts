import { StockEntry } from "../../../domain/entity/stock-entry";
import { StockRepository } from "../../../domain/repositories/stock-repository";

export class StockRepositoryMemory implements StockRepository {
  stockEntries: StockEntry[]

  constructor ()  {
    this.stockEntries = []
  }

  async getStockEntries(idItem: number): Promise<StockEntry[]> {
    return this.stockEntries.filter(stockEntry => stockEntry.idItem === Number(idItem))
  }

  async save(stockEntry: StockEntry): Promise<void> {
    this.stockEntries.push(stockEntry)
  }

  async clear(): Promise<void> {
    this.stockEntries = []
  }
}