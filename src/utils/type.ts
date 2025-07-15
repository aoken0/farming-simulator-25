export type RawSellingPrice = {
  name: string,
  reading: string,
  maxPrice: number,
  minPrice: number,
  maxMonths: number[],
  type: string,
}
export type SellingPrice = {
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
    reading: string,
    factory: string[],
    alias: string[],
  }
}
export type ProductionInfo = {
  [productName: string]: {
    input: {
      [materialName: string]: number,
    }
    output: {
      [materialName: string]: number,
    }
    cyclePerMonth: number,
    costPerMonth: number,
  }
}
export type Factory = {
  [factoryName: string]: {
    price: number,
    storage: {
      [materialName: string]: number,
    }
    products: ProductionInfo,
  }
}