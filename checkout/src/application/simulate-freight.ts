import { DistanceCalculator } from "../domain/entity/distance-calculator";
import FreightCalculator from "../domain/entity/freight-calculator";
import { ItemRepository } from "../domain/repositories/item-repository";
import { ZipcodeRepository } from "../domain/repositories/zipcode-repository";

export class SimulateFreight {
  constructor (readonly itemRepository: ItemRepository, readonly zipcodeRepository: ZipcodeRepository) {}

  async execute (input: Input): Promise<number> {
    let freight = 0
    let distance
    if (input.from && input.to) {
      const from = await this.zipcodeRepository.getByCode(input.from)
      const to = await this.zipcodeRepository.getByCode(input.to)
      distance = DistanceCalculator.calculate(from.coord, to.coord)
    }
    for (const orderItem of input.orderItems) {
      const item = await this.itemRepository.getItem(orderItem.idItem)
      freight += FreightCalculator.calculate(item, distance)
    }
    return freight
  }
}

type Input = {
  orderItems: { idItem: number, quantity: number }[],
  from?: string
  to?: string
}