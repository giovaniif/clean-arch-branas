import { ItemRepository } from "../domain/repositories/item-repository";

export class GetItem {
  constructor (readonly itemRepository: ItemRepository) {}

  async execute (idItem: number): Promise<Output> {
    const item = await this.itemRepository.getItem(Number(idItem))
    return {
      idItem: item.idItem,
      description: item.description,
      price: item.price,
      density: item.getDensity(),
      volume: item.getVolume(),
      width: item.dimension?.width,
      height: item.dimension?.height,
      weight: item.dimension?.weight,
      length: item.dimension?.length,
    }
  }
}

type Output = {
  idItem: number
  description: string
  price: number
  volume: number
  density: number
  width?: number
  height?: number
  weight?: number
  length?: number
}