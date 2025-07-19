export type MiddleProductionInfo = {
  factoryName: string,
  factories: string[],
  productType: string,
  productAlias: string | string[],
  productName: string,
  monthlyRequired: number,
  yearlyRequired: number,
  monthlyMax: number,
  yearlyMax: number,
}
export type ProductFinancials = {
  productName: string,
  yearlyMaxSales: number,
  yearlyCost: number,
  yearlyProfit: number,
}
export type MaterialFinancials = {
  materialName: string,
  monthlyRequired: number,
  yearlyRequired: number,
  yearlyMaxSales: number,
}
export type MaterialSummary = {
  materialName: string,
  monthlyRequired: number,
  yearlyRequired: number,
  factoryName: string,
  productType: string,
  numOfSameMaterial: number,
}