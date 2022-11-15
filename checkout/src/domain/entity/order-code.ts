export class OrderCode {
  private value: string

  constructor (readonly date: Date, readonly sequence: number) {
    this.value = this.generate(date, sequence)
  }

  generate (date: Date, sequence: number) {
    const year = date.getFullYear()
    return `${year}${new String(sequence).padStart(8, "0")}`
  }

  getCode () {
    return this.value
  }
}