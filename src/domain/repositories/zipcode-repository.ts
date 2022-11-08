import { Zipcode } from "../entity/zipcode"

export interface ZipcodeRepository {
  save (zipcode: Zipcode): Promise<void>
  getByCode (code: string): Promise<Zipcode>
}