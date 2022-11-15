export class Dimension {
  constructor (
    readonly width: number,
    readonly height: number,
    readonly length: number,
    readonly weight: number
  ) {
    if (!this.width || !this.height || !this.length || !this.weight) throw new Error("invalid dimension") 
    if (this.width < 0 || this.height < 0 || this.length < 0 || this.weight < 0) throw new Error("invalid dimension") 
  }


  getVolume () {
    return (this.width / 100) * (this.height / 100) * (this.length / 100)
  }

  getDensity () {
    return this.weight / this.getVolume()
  }
}