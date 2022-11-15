import { Item } from "../entity/item";

export interface ItemRepository {
  getItem: (itemId: number) => Promise<Item>
  save: (item: Item) => Promise<void>
}