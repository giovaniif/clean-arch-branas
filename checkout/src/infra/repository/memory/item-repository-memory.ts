import { ItemRepository } from "../../../domain/repositories/item-repository";
import { Item } from "../../../domain/entity/item";
import Dimension from "../../../domain/entity/dimension";

export class ItemRepositoryMemory implements ItemRepository {
  items: Item[]

  constructor () {
    this.items = [
      new Item(1, "Guitarra", 1000, new Dimension(100, 30, 10, 3)),
      new Item(1, "Guitarra", 1000, new Dimension(100, 30, 10, 3)),
      new Item(1, "Guitarra", 1000, new Dimension(100, 30, 10, 3))
    ]
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