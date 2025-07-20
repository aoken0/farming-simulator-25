import { ProductionInfo } from "./type"

export type VolumeInfo = [
  key: string,
  volumePerMonth: number,
  volumePerYear: number,
]

export const getProductionVolume = (productionInfo: ProductionInfo, productName: string): VolumeInfo[] => {
  const outputs = Object.entries(productionInfo[productName].output);
  const cyclePerMonth = productionInfo[productName].cyclePerMonth;

  // 最終的に[製品名, 月間生産量, 年間生産量]にする
  const volumeInfo = outputs.map(([key, amount]) => {
    const volumePerMonth = Math.ceil(amount * cyclePerMonth);
    const volumePerYear = volumePerMonth * 12;
    return [key, volumePerMonth, volumePerYear] as VolumeInfo;
  })

  return volumeInfo;
}

export const getConsumption = (productionInfo: ProductionInfo, productName: string): VolumeInfo[]  => {
  const inputs = Object.entries(productionInfo[productName].input);
  const cyclePerMonth = productionInfo[productName].cyclePerMonth;

  // 最終的に[製品名, 月間生産量, 年間生産量]にする
  const volumeInfo = inputs.map(([key, amount]) => {
    const volumePerMonth = Math.ceil(amount * cyclePerMonth);
    const volumePerYear = volumePerMonth * 12;
    return [key, volumePerMonth, volumePerYear] as VolumeInfo;
  })

  return volumeInfo;
}

export const getRequiredMaterials = (productionInfo: ProductionInfo, productName: string, monthlyProductionVolume: number) => {
  const inputs = Object.entries(productionInfo[productName].input);
  const outputs = Object.entries(productionInfo[productName].output)
  // const cyclePerMonth = productionInfo[productName].cyclePerMonth;

  const volumeInfo = inputs.map(([key, amount], ) => {
    const changeRate = amount / outputs[0][1]; // 製品を1としたときの材料費
    const requiredPerMonth = monthlyProductionVolume * changeRate;
    return [key, Math.ceil(requiredPerMonth), Math.ceil(requiredPerMonth*12)] as VolumeInfo;
  })

  return volumeInfo;
}