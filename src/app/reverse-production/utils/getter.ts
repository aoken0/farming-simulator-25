import { MiddleProductionInfo, ProductFinancials, MaterialSummary, MaterialFinancials } from "../page";
import { VolumeInfo, getRequiredMaterials } from "@/utils/calc";
import type { Factory, SellingPrice } from "@/utils/type";

export const getMiddleProductionData = (factoryData: Factory, middleProductInfo: MiddleProductionInfo[]) => {
  const middleProductionVol = middleProductInfo.map((info, ) => {
    const productName = info.productType;
    return [[productName, info.monthlyRequired, info.yearlyRequired]] as VolumeInfo[];
  })
  const middleConsumptionVol = middleProductInfo.map((info, ) => {
    const productName = info.productType;
    return getRequiredMaterials(factoryData[info.factoryName].products, productName as string, info.monthlyRequired)
  })
  const middleProd = middleProductionVol.map((e, i) => [e, middleConsumptionVol[i]]);
  return middleProd;
}

export const getMiddleProductFinancials = (factoryData: Factory, middleProductInfo: MiddleProductionInfo[], sellingPriceData: SellingPrice[], multiplier: number) => {
  const financials = middleProductInfo.map((item) => {
    const sellingData = sellingPriceData.filter((e) => e.name === item.productName)
    const sales = Math.round(sellingData[0].maxPrice * item.yearlyRequired / 1000  * multiplier);
    const cost = factoryData[item.factoryName].products[item.productType].costPerMonth * 12;
    const finances: ProductFinancials = {
      productName: item.productName,
      yearlyMaxSales: sales,
      yearlyCost: cost,
      yearlyProfit: sales - cost,
    }
    return finances
  })
  return financials;
}

export const getMaterialProfitSum = (middleProdF: ProductFinancials[], materialF: MaterialFinancials[]) => {
  const middleProdProfit = middleProdF.reduce((sum, item) => sum + item.yearlyProfit, 0);
  const materialProfit = materialF.reduce((sum, item) => sum + item.yearlyMaxSales, 0)
  return middleProdProfit + materialProfit;
}
export const getMaterialSummary = (middleProdData: VolumeInfo[][][], middleProdInfo: MiddleProductionInfo[]) => {
  const m = middleProdData.map((items, i) => {
    const output = items[0][0];
    const factoryName = middleProdInfo[i].factoryName;
    const inputs = items[1].map(item => {
      const obj: MaterialSummary = {
        materialName: item[0],
        monthlyRequired: item[1],
        yearlyRequired: item[2],
        factoryName: factoryName,
        productType: output[0],
        numOfSameMaterial: 0,
      }
      return obj
    })
    return inputs
  }).flat();
  const countM = m.reduce<Record<string, number>>((acc, item) => {
    acc[item.materialName] = (acc[item.materialName] || 0) + 1;
    return acc;
  }, {});
  const updatedM = m.map((item) => ({
    ...item,
    numOfSameMaterial: countM[item.materialName]
  }));
  const sortedM = updatedM.sort((a, b) => {
    const nameComp = a.materialName.localeCompare(b.materialName, 'ja');
    if (nameComp !== 0) return nameComp;
    return a.factoryName.localeCompare(b.factoryName, 'ja');
  })

  return sortedM
}