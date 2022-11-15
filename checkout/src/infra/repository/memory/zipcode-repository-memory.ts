import { Zipcode } from "../../../domain/entity/zipcode";
import { ZipcodeRepository } from "../../../domain/repositories/zipcode-repository";

export class ZipcodeRepositoryMemory implements ZipcodeRepository {
  zipcodes: Zipcode[] = []

  async save(zipcode: Zipcode): Promise<void> {
    this.zipcodes.push(zipcode)
  }

  async getByCode(code: string): Promise<Zipcode> {
    const zipcode = this.zipcodes.find(zipcode => zipcode.code === code)
    if (!zipcode) throw new Error('Zipcode not found')
    return zipcode
  }

}