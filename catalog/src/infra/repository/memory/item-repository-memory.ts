import { ItemRepository } from "../../../domain/repositories/item-repository";
import { Item } from "../../../domain/entity/item";

export class ItemRepositoryMemory implements ItemRepository {
  items: Item[]

  constructor () {
    this.items = []
  }

  async getItem (itemId: number): Promise<Item> {
    const item = this.items.find(item => item.idItem === itemId)
    if (!item) throw new Error("Item not found")
    return item
  }

  async save (item: Item): Promise<void> {
    this.items.push(item)
  }
}