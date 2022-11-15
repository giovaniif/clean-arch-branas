import { Item } from "../../domain/entity/item";

export interface GetItemGateway {
  getItem (idItem: number): Promise<Item>
}