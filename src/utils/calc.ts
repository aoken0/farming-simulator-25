import { ProductionInfo } from "./type"

export const getProductionVolume = (productionInfo: ProductionInfo, productName: string) => {
  const output = Object.entries(productionInfo[productName].output);
  const cyclePerMonth = productionInfo[productName].cyclePerMonth;

  // 最終的に[製品名, 月間生産量, 年間生産量]にする
  const volumeInfo = output.map(([key, amount]) => {
    const volumePerMonth = amount * cyclePerMonth;
    const volumePerYear = volumePerMonth * 12;
    return [key, volumePerMonth, volumePerYear];
  })

  return volumeInfo;
}

export const getConsumption = () => {

}
