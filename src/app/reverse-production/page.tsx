"use client";
import React from 'react';
import { useState, useEffect } from 'react';
import ContentTitle from "@/components/ContentTitle";
import GlobalWrapper from "@/components/GlobalWrapper"
import MenuTable from "@/components/MenuTable";
import MenuTableTr from "@/components/MenuTableTr";
import MenuTableTrSelect from "@/components/MenuTableTrSelect";
import productDataJSON from '../../../public/data/product.json';
import factoryDataJSON from '../../../public/data/factory.json';
import sellingPriceDataJSON from '../../../public/data/selling_price.json';
import { Product, Factory } from '@/utils/type';
import { VolumeInfo, getProductionVolume, getConsumption, getRequiredMaterials } from '@/utils/calc';
import Small from '@/components/Small';
import ProductInfoWrapper from '@/components/ProductInfoWrapper';
import ProductExportInfoTable from '@/components/ProductExportInfoTable';
import ProductExportInfoTableGraph from '@/components/ProductExportInfoTableGraph';
import ProductInputInfoTable from '@/components/ProductInputInfoTable';
import styled from 'styled-components';
import ContentParagraph from '@/components/ContentParagraph';
import ContentP from '@/components/ContentP';
import ProductProfitWrapper from '@/components/ProductProfitWrapper';
import ProductProfitTable from '@/components/ProductProfitTable';

type MiddleProductionData = {
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
type ProductFinancials = {
  productName: string,
  yearlyMaxSales: number,
  yearlyCost: number,
  yearlyProfit: number,
}
type MaterialFinancials = {
  materialName: string,
  yearlyMaxSales: number,
}

const ReverseProduction = () => {
  const [showTable, setShowTable] = useState<boolean>(false);
  const [productData, setProductData] = useState<Product>({});
  const [productType, setProductType] = useState<string[]>([]);
  const [factoryData, setFactoryData] = useState<Factory>({});
  const [factories, setFactories] = useState<string[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [selectedProductType, setSelectedProductType] = useState<string>("");
  const [selectedFactory, setSelectedFactory] = useState<string>("");
  const [finalProductionVolume, setFinalProductionVolume] = useState<VolumeInfo[]>([]);
  const [finalConsumptionVolume, setFinalConsumptionVolume] = useState<VolumeInfo[]>([]);
  const [finalProductFinancials, setFinalProductFinancials] = useState<ProductFinancials>();
  const [middleProductFinancials, setMiddleProductFinancials] = useState<ProductFinancials[]>([]);
  const [middleProduction, setMiddleProduction] = useState<VolumeInfo[][][]>([]);
  const [middleProductionInfo, setMiddleProductionInfo] = useState<MiddleProductionData[]>([]);
  const [materialFinancials, setMaterialFinancials] = useState<MaterialFinancials[]>([]);
  const [materialProfitSum, setMaterialProfitSum] = useState<number>(0);
  const [multiplier, setMultiplier] = useState<number>(0.6);

  useEffect(() => {
    const sortedProductData = Object.fromEntries(
      Object.entries(productDataJSON).sort(([, a], [, b]) =>
        a.reading.localeCompare(b.reading, 'ja')
      )
    );
    const sortedFactoryData = Object.fromEntries(
      Object.entries(factoryDataJSON).sort(([a], [b]) => a.localeCompare(b, 'ja'))
    );

    setProductData(sortedProductData);
    setFactoryData(sortedFactoryData);
  },[])

  useEffect(() => {
    setShowTable(false);
    if (!(factoryData && selectedFactory && selectedProduct)) return;
    if (productType.length && !selectedProductType) return;
    setShowTable(true);

    // 最終生産物
    // 生産・消費量
    const factory = selectedFactory;
    const product = selectedProductType ? selectedProductType : selectedProduct;
    const finalProductionVol = getProductionVolume(factoryData[factory].products, product)
    const finalConsumptionVol = getConsumption(factoryData[factory].products, product)
    setFinalProductionVolume(finalProductionVol);
    setFinalConsumptionVolume(finalConsumptionVol);
    // 売上・コスト
    const finalProductSellingData = sellingPriceDataJSON.filter((item) => item.name === selectedProduct)
    const sales = Math.round(finalProductSellingData[0].maxPrice * finalProductionVol[0][2] / 1000 * multiplier);
    const cost = factoryData[factory].products[product].costPerMonth * 12;
    const fProductFinancials: ProductFinancials = {
      productName: selectedProduct,
      yearlyMaxSales: sales,
      yearlyCost: cost,
      yearlyProfit: sales - cost,
    }
    setFinalProductFinancials(fProductFinancials)

    // 中間生産品
    // 生産・消費量
    const middleProducts = finalConsumptionVol.filter(item => Object.keys(productData).includes(item[0] as string));
    const middleProductInfo = middleProducts.map(([product, monthly, yearly]) => {
      const factoryName = productData[product].factory[0];
      const productType = productData[product].alias[0] || product;
      const pVol = getProductionVolume(factoryData[factoryName].products, productType)
      const obj: MiddleProductionData = {
        factoryName: factoryName,
        factories: productData[product].factory,
        productType: productType,
        productAlias: productData[product].alias.length ? productData[product].alias :  product,
        productName: product,
        monthlyRequired: Number(monthly),
        yearlyRequired: Number(yearly),
        monthlyMax: pVol[0][1],
        yearlyMax: pVol[0][2],
      }
      return obj;
    })
    setMiddleProductionInfo(middleProductInfo)
    setMiddleProduction(getMiddleProductionData(middleProductInfo))
    // 売上・コスト
    const MProductFinancials = middleProductInfo.map((item) => {
      const sellingData = sellingPriceDataJSON.filter((e) => e.name === item.productName)
      const sales = Math.round(sellingData[0].maxPrice * item.yearlyRequired / 1000 * multiplier);
      const cost = factoryData[item.factoryName].products[item.productType].costPerMonth * 12;
      const finances: ProductFinancials = {
        productName: item.productName,
        yearlyMaxSales: sales,
        yearlyCost: cost,
        yearlyProfit: sales - cost,
      }
      return finances
    })
    setMiddleProductFinancials(MProductFinancials)

    // 原材料(加工を必要としないもの)
    // 売上
    const middleProductNames = middleProducts.map(item => (item[0]))
    const materials = finalConsumptionVol.filter(item => !middleProductNames.includes(item[0]))
    const materialF: MaterialFinancials[] = materials.map(item => {
      const sellingData = sellingPriceDataJSON.filter((e) => e.name === item[0])
      return {
        materialName: item[0],
        yearlyMaxSales: Math.round(sellingData[0].maxPrice * item[2] / 1000 * multiplier),
      }
    })
    setMaterialFinancials(materialF)

    // 中間生産品 + 素材売上
    setMaterialProfitSum(getMaterialProfitSum(MProductFinancials, materialF))
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [factoryData, productData, productType.length, selectedFactory, selectedProduct, selectedProductType, multiplier])


  const getMiddleProductionData = (middleProductInfo: MiddleProductionData[]) => {
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
  const getMiddleProductFinancials = (middleProductInfo: MiddleProductionData[]) => {
    const financials = middleProductInfo.map((item) => {
      const sellingData = sellingPriceDataJSON.filter((e) => e.name === item.productName)
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
  const getMaterialProfitSum = (middleProdF: ProductFinancials[], materialF: MaterialFinancials[]) => {
    const middleProdProfit = middleProdF.reduce((sum, item) => sum + item.yearlyProfit, 0);
    const materialProfit = materialF.reduce((sum, item) => sum + item.yearlyMaxSales, 0)
    return middleProdProfit + materialProfit;
  }



  const handleChangeDifficulty = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        setMultiplier(1.0)
        break;
      case "normal":
        setMultiplier(0.6)
        break;
      case "hard":
        setMultiplier(1/3)
        break;
    
      default:
        break;
    }
  }
  const handleChangeProduct = (product: string) => {
    if (!product) {
      setProductType([]);
      setFactories([]);
      setSelectedProduct("");
      setSelectedProductType("");
      setSelectedFactory("");
      setFinalConsumptionVolume([]);
      setFinalProductionVolume([]);
      setMaterialFinancials([]);
      setMaterialProfitSum(0);
      return;
    }
    if (product !== selectedProduct) {
      setSelectedProductType("");
      setSelectedFactory("");
    }
    setSelectedProduct(product);
    setProductType(productData[product].alias);
    setFactories(productData[product].factory);
  }
  const handleChangeProductType = (productType: string) => {
    setSelectedProductType(productType);
  }
  const handleChangeFactory = (factory: string) => {
    setSelectedFactory(factory);
  }


  const handleChangeMiddleFactory = (i: number, newFactory: string) => {
    const updatedInfo = middleProductionInfo.map((item, j) => {
      if (j === i) {
        const productType = item.productType;
        const pVol = getProductionVolume(factoryData[newFactory].products, productType);

        return {
          ...item,
          factoryName: newFactory,
          monthlyMax: Number(pVol[0][1]),
          yearlyMax: Number(pVol[0][2]),
        };
      }
      return item;
    });
    const middleProdF = getMiddleProductFinancials(updatedInfo);
    setMiddleProductFinancials(middleProdF)
    setMiddleProduction(getMiddleProductionData(updatedInfo))
    setMiddleProductionInfo(updatedInfo)
    setMaterialProfitSum(getMaterialProfitSum(middleProdF, materialFinancials))
  }
  const handleChangeMiddleProductType = (i: number, newProductType: string) => {
    const updatedInfo = middleProductionInfo.map((item, j) => {
      if (j === i) {
        const factoryName = item.factoryName
        const pVol = getProductionVolume(factoryData[factoryName].products, newProductType);

        return {
          ...item,
          productType: newProductType,
          monthlyMax: Number(pVol[0][1]),
          yearlyMax: Number(pVol[0][2]),
        };
      }
      return item;
    });
    const middleProdF = getMiddleProductFinancials(updatedInfo)
    setMiddleProductFinancials(middleProdF)
    setMiddleProduction(getMiddleProductionData(updatedInfo))
    setMiddleProductionInfo(updatedInfo)
    setMaterialProfitSum(getMaterialProfitSum(middleProdF, materialFinancials))
  }

  return (
    <GlobalWrapper>
      <ContentTitle>材料逆引きツール</ContentTitle>
      <ContentParagraph>
        <ContentP>
          生産品と施設を選択することで、必要な素材量や利益がわかります。
        </ContentP>
      </ContentParagraph>
      <MenuTable $marginBottom='0.5em'>
        <MenuTableTr $label="難易度">
          <MenuTableTrSelect $name="difficulty" $defaultValue="normal" $onChange={(e) => handleChangeDifficulty(e.target.value)}>
            <>
              <option value="easy">イージー</option>
              <option value="normal">ノーマル</option>
              <option value="hard">ハード</option>
            </>
          </MenuTableTrSelect>
        </MenuTableTr>
      </MenuTable>
      <MenuTable $marginBottom='0.5em'>
        <MenuTableTr $label="生産品">
          <MenuTableTrSelect $name="product" $defaultValue="" $onChange={(e) => handleChangeProduct(e.target.value)}>
            <>
              <option value="">選択してください</option>
              {Object.entries(productData).map(([key, ], i) => (
                <option key={`product-${i}`} value={key}>{key}</option>
              ))}
            </>
          </MenuTableTrSelect>
        </MenuTableTr>
      </MenuTable>
      <MenuTable $marginBottom='0.5em'>
        <MenuTableTr $label="種類">
          <MenuTableTrSelect $name="product-type" $value={selectedProductType} $onChange={(e) => handleChangeProductType(e.target.value)} $disabled={productType.length ? false : true}>
            <>
              {productType.length ? <option value="">選択してください</option> : <option value="">---</option>}
              {productType.map((e, i) => (
                <option key={`product-type-${i}`} value={e}>{e}</option>
              ))}
            </>
          </MenuTableTrSelect>
        </MenuTableTr>
      </MenuTable>
      <MenuTable $marginBottom='0.5em'>
        <MenuTableTr $label="施設">
          <MenuTableTrSelect $name="factory" $value={selectedFactory} $onChange={(e) => handleChangeFactory(e.target.value)} $disabled={factories.length ? false : true}>
            <>
              {factories.length ? <option value="">選択してください</option> : <option value="">---</option>}
              {factories.map((e, i) => (
                <option key={`factory-${i}`} value={e}>{e}</option>
              ))}
            </>
          </MenuTableTrSelect>
        </MenuTableTr>
      </MenuTable>
      {showTable &&
      <>
      <Small>※ 量の単位はすべて&#08467; / 小数点以下切り上げ</Small>
      {/* ============================== 
        最終工程表示領域
      ================================== */}
      <TableCategoryTitle>最終工程</TableCategoryTitle>
      <ProductInfoWrapper $factoryName={selectedFactory}  $style={{marginBottom:"4em"}}>
        <ProductExportInfoTable>
          <tr>
            <th>{selectedProductType ? selectedProductType : selectedProduct}</th>
            {finalProductionVolume.map(([key, volPerM, volPerY], i) => (
              <React.Fragment key={`export-${key}-${i}`}>
                <td>{key}</td>
                <td>{volPerM.toLocaleString()}</td>
                <td>{volPerY.toLocaleString()}</td>
              </React.Fragment>
            ))}
          </tr>
        </ProductExportInfoTable>
        <ProductInputInfoTable>
          {finalConsumptionVolume.map(([key, volPerM, volPerY], i) => (
            <tr key={`input-${key}-${i}`}>
              <th>{key}</th>
              <td>{key}</td>
              <td>{volPerM.toLocaleString()}</td>
              <td>{volPerY.toLocaleString()}</td>
            </tr>
          ))}
        </ProductInputInfoTable>
      </ProductInfoWrapper>


      {/* ============================== 
        中間工程表示領域
      ================================== */}
      {middleProductionInfo.length > 0 && 
        <TableCategoryTitle>中間工程</TableCategoryTitle>
      }
      {middleProduction.map((e, i) => (
        <ProductInfoWrapper key={`midProd-${i}`}
          $factoryName={middleProductionInfo[i].factoryName}
          $factories={middleProductionInfo[i].factories}
          $onChange={(e) => handleChangeMiddleFactory(i, e.target.value)}
          $style={{marginBottom:"3em"}}
          >
          <ProductExportInfoTableGraph 
            $monthlyCapacity={middleProductionInfo[i].monthlyMax}
            $monthlyRequired={middleProductionInfo[i].monthlyRequired}
          >
            {e[0].map(([key, , ], j) => (
            // {e[0].map(([key, volPerM, volPerY], j) => (
              <React.Fragment key={`mid-export-${key}-${j}`}>
                {Array.isArray(middleProductionInfo[i].productAlias) ? (
                  <th className={"product-export-info-th-selector"}>
                    <select defaultValue={key} name={`middle-production-material-selector-${e}-${i}`} onChange={(e) => handleChangeMiddleProductType(i, e.target.value)}>
                      {middleProductionInfo[i].productAlias.map((e, i) => (
                        <option key={`middle-production-info-material-${e}-${i}`} value={e}>{e}</option>
                      ))}
                    </select>
                  </th>
                ):(
                  <th>{key}</th>
                )}
                <td>{middleProductionInfo[i].productName}</td>
                {/* <td>{volPerM}</td>
                <td>{volPerY}</td> */}
              </React.Fragment>
            ))}
          </ProductExportInfoTableGraph>
          <ProductInputInfoTable>
            {e[1].map(([key, volPerM, volPerY], i) => (
              <tr key={`mid-input-${key}-${i}`}>
                <th>{key}</th>
                <td>{key}</td>
                <td>{volPerM.toLocaleString()}</td>
                <td>{volPerY.toLocaleString()}</td>
              </tr>
            ))}
          </ProductInputInfoTable>
        </ProductInfoWrapper>
      ))}


      {/* ============================== 
        利益関連表示領域
      ================================== */}
      <Small>※ 金額の単位は、すべて&euro; / 小数点以下四捨五入</Small>
      <TableCategoryTitle>利益</TableCategoryTitle>
      {finalProductFinancials &&
      <ProductProfitWrapper $title='最終生産品' $style={{marginBottom:"2em"}}>
        <ProductProfitTable>
          <tr>
            <th>{finalProductFinancials.productName}</th>
            <td>{finalProductFinancials.yearlyMaxSales.toLocaleString()}</td>
            <td>{finalProductFinancials.yearlyCost.toLocaleString()}</td>
            <td>{finalProductFinancials.yearlyProfit.toLocaleString()}</td>
          </tr>
        </ProductProfitTable>
      </ProductProfitWrapper>}
      {middleProductionInfo.length > 0 && 
        <ProductProfitWrapper $title='中間生産品' $style={{marginBottom:"2em"}}>
        <ProductProfitTable>
          {middleProductFinancials.map((item, i) => (
            <tr key={`middle-product-financials-${item.productName}-${i}`}>
              <th>{item.productName}</th>
              <td>{item.yearlyMaxSales.toLocaleString()}</td>
              <td>{item.yearlyCost.toLocaleString()}</td>
              <td>{item.yearlyProfit.toLocaleString()}</td>
            </tr>
          ))}
          <tr>
            <td style={{backgroundColor: 'transparent'}}></td>
            <td style={{backgroundColor: 'transparent'}}></td>
            <td style={{backgroundColor: 'transparent', textAlign: "right", paddingRight: "1em"}}>
              計
            </td>
            <td style={{backgroundColor: 'transparent'}}>
              {middleProductFinancials.reduce((sum, item) => sum + item.yearlyProfit, 0).toLocaleString()}
            </td>
          </tr>
        </ProductProfitTable>
      </ProductProfitWrapper>}
      {materialFinancials.length > 0 &&
        <ProductProfitWrapper $title='原材料' $style={{marginBottom:"2em"}}>
        <ProductProfitTable>
          {materialFinancials.map((item, i) => (
            <tr key={`middle-product-financials-${item.materialName}-${i}`}>
              <th>{item.materialName}</th>
              <td>{item.yearlyMaxSales.toLocaleString()}</td>
              <td>-</td>
              <td>{item.yearlyMaxSales.toLocaleString()}</td>
            </tr>
          ))}
          <tr>
            <td style={{backgroundColor: 'transparent'}}></td>
            <td style={{backgroundColor: 'transparent'}}></td>
            <td style={{backgroundColor: 'transparent', textAlign: "right", paddingRight: "1em"}}>
              計
            </td>
            <td style={{backgroundColor: 'transparent'}}>
              {materialFinancials.reduce((sum, item) => sum + item.yearlyMaxSales, 0).toLocaleString()}
            </td>
          </tr>
        </ProductProfitTable>
      </ProductProfitWrapper>}
      
      {finalProductFinancials &&
      <ProductProfitWrapper $title='売上比較' $style={{marginBottom:"4em"}}>
          <CompareWrapper>
          <GraphBarWrapper $num={1} $marginBottom={"1em"}>
            <h5>素材合計売値</h5>
            <GraphBar 
              $width={materialProfitSum/finalProductFinancials.yearlyProfit*100}>
            </GraphBar>
            <p>&euro;{materialProfitSum.toLocaleString()}</p>
          </GraphBarWrapper>
          <TransitionWrapper>
            <img src="img/arrow_to_bottom.svg" alt="" />
            <p>
              {(finalProductFinancials.yearlyProfit-materialProfitSum) > 0 ?
               <span>+</span>:<span>- </span>}&thinsp;
              &euro;{(finalProductFinancials.yearlyProfit-materialProfitSum).toLocaleString()}
            </p>
          </TransitionWrapper>
          <GraphBarWrapper $num={3}>
            <h5>最終生産品売値</h5>
            <GraphBar $width={100}></GraphBar>
            <p>&euro;{finalProductFinancials.yearlyProfit.toLocaleString()}</p>
          </GraphBarWrapper>
        </CompareWrapper>
      </ProductProfitWrapper>}
      </>
      }
    </GlobalWrapper>
  )
}

export default ReverseProduction

const TableCategoryTitle = styled.h3`
  font-size: 0.6em;
  line-height: 2em;
  padding-left: 0.5em;
  margin-top: 0.5em;
  margin-bottom: 0.2em;
  position: relative;
  &::before {
    position: absolute;
    content: "";
    height: 1.6em;
    aspect-ratio: 1/8;
    background-color: #444;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    border-radius: 2px;
  }
`
const CompareWrapper = styled.div`
  width: 100%;
  display: grid;
  margin-top: 1em;
  padding: 0 1em;
`
const GraphBarWrapper = styled.div<{$num: number, $marginBottom?: string}>`
  width: 100%;
  margin-bottom: ${({$marginBottom}) => $marginBottom ? $marginBottom : 0};
  grid-row: ${({$num}) => `${$num}/${$num+1}`};
  grid-column: 1 / 2;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: end;
  gap: 2px;
  h5 {
    width: 100%;
  }
`
const TransitionWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 0.5em;
  img {
    width: auto;
    height: 32px;
  }
`
const GraphBar = styled.div<{$width?: number}>`
  width: 80%;
  height: 2em;
  position: relative;
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: ${({$width}) => $width ? `${$width}%`: "1%"};
    height: 100%;
    background-color: rgb(57, 200, 0);
    border-radius: 5px;
  }
`