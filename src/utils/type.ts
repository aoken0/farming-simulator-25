export type Item = {
  name: string,
  reading: string,
  maxPrice: number,
  minPrice: number,
  maxMonths: number[],
  type: string,
  maxMonthLabel: string,
}
export type Product = {
  [productName: string]: {
    factory: string[],
    alias: string[],
  },
}
export type Factory = {
  [factoryName: string]: {
    price: number,
    storage: {
      [materialName: string]: number,
    },
    products: {
      [productName: string]: {
        input: {
          [materialName: string]: number,
        },
        output: {
          [materialName: string]: number,
        },
        cyclePerMonth: number,
        costPerMonth: number,
      }
    }
  }
}