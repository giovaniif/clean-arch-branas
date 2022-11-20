import { StockEntry } from "../entity/stock-entry";

export interface StockRepository {
  getStockEntries (idItem: number): Promise<StockEntry[]>
  save (stockEntry: StockEntry): Promise<void>
  clear (): Promise<void>
}