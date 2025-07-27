"use client";
import React from 'react';
import type { Product, Factory, SellingPrice, ProductAlias } from '@/utils/type';
import type { MiddleProductionInfo, ProductFinancials, MaterialFinancials, MaterialSummary } from './utils/type';
import { useState, useEffect } from 'react';
import ContentTitle from "@/components/ContentTitle";
import GlobalWrapper from "@/components/GlobalWrapper"
import MenuTable from "@/components/MenuTable";
import MenuTableTr from "@/components/MenuTableTr";
import MenuTableTrSelect from "@/components/MenuTableTrSelect";
import productDataJSON from '../../../public/data/product.json';
import factoryDataJSON from '../../../public/data/factory.json';
import productAliasJSON from '../../../public/data/alias_map.json';
import sellingPriceDataJSON from '../../../public/data/selling_price.json';
import { VolumeInfo, getProductionVolume, getConsumption } from '@/utils/calc';
import { formatSellingPriceData } from '@/utils/format';
import { getMiddleProductFinancials, getMaterialSummary, getMaterialProfitSum, getMiddleProductionData } from './utils/calc';
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
import ProductMaterialSummaryWrapper from '@/components/ProductMaterialSummaryWrapper';
import ProductMaterialSummaryTable from '@/components/ProductMaterialSummaryTable';
import ContentUL from '@/components/ContentUL';

const productAliasMap: ProductAlias = productAliasJSON;

const ReverseProduction = () => {
  const [showTable, setShowTable] = useState<boolean>(false);
  const [sellingPriceData, setSellingPriceData] = useState<SellingPrice[]>([]);
  const [searchType, setSearchType] = useState<string>("search-by-product");
  const [productData, setProductData] = useState<Product>({});
  const [productChoices, setProductChoices] = useState<Product>({});
  const [productType, setProductType] = useState<string[]>([]);
  const [factoryData, setFactoryData] = useState<Factory>({});
  const [factoryChoices, setFactoryChoices] = useState<string[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [selectedProductType, setSelectedProductType] = useState<string>("");
  const [selectedFactory, setSelectedFactory] = useState<string>("");
  const [finalProductionVolume, setFinalProductionVolume] = useState<VolumeInfo[]>([]);
  const [finalConsumptionVolume, setFinalConsumptionVolume] = useState<VolumeInfo[]>([]);
  const [finalProductFinancials, setFinalProductFinancials] = useState<ProductFinancials>();
  const [middleProductFinancials, setMiddleProductFinancials] = useState<ProductFinancials[]>([]);
  const [middleProduction, setMiddleProduction] = useState<VolumeInfo[][][]>([]);
  const [middleProductionInfo, setMiddleProductionInfo] = useState<MiddleProductionInfo[]>([]);
  const [materialFinancials, setMaterialFinancials] = useState<MaterialFinancials[]>([]);
  const [materialProfitSum, setMaterialProfitSum] = useState<number>(0);
  const [multiplier, setMultiplier] = useState<number>(0.6);
  const [materialSummary, setMaterialSummary] = useState<MaterialSummary[]>([]);

  useEffect(() => {
    const sortedProductData = Object.fromEntries(
      Object.entries(productDataJSON).sort(([, a], [, b]) =>
        a.reading.localeCompare(b.reading, 'ja')
      )
    );
    const sortedFactoryData = Object.fromEntries(
      Object.entries(factoryDataJSON).sort(([a], [b]) => a.localeCompare(b, 'ja'))
    );
    setSellingPriceData(formatSellingPriceData(sellingPriceDataJSON));
    setProductData(sortedProductData);
    setProductChoices(sortedProductData);
    setFactoryData(sortedFactoryData);
    // setFactoryChoices(Object.keys(sortedFactoryData))
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
    const middleProdInfo = middleProducts.map(([product, monthly, yearly]) => {
      const factoryName = productData[product].factory[0];
      const productType = productData[product].alias[0] || product;
      const pVol = getProductionVolume(factoryData[factoryName].products, productType)
      const obj: MiddleProductionInfo = {
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
    setMiddleProductionInfo(middleProdInfo)
    const middleProdData = getMiddleProductionData(factoryData, middleProdInfo)
    setMiddleProduction(middleProdData)
    // 売上・コスト
    const MProductFinancials = middleProdInfo.map((item) => {
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
        monthlyRequired: item[1],
        yearlyRequired: item[2],
        yearlyMaxSales: Math.round(sellingData[0].maxPrice * item[2] / 1000 * multiplier),
      }
    })
    setMaterialFinancials(materialF)

    // 中間生産品 + 素材売上
    setMaterialProfitSum(getMaterialProfitSum(MProductFinancials, materialF))
    // 原材料まとめ
    const m: VolumeInfo[] = materialF.map(item => {
      return [item.materialName, item.monthlyRequired, item.yearlyRequired]
    })
    setMaterialSummary(getMaterialSummary(middleProdData, middleProdInfo, m))
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productType.length, selectedFactory, selectedProduct, selectedProductType, multiplier])


  useEffect(() => {
    const middleProdF = getMiddleProductFinancials(factoryData, middleProductionInfo, sellingPriceData, multiplier);
    const middleProdData = getMiddleProductionData(factoryData, middleProductionInfo)
    setMiddleProductFinancials(middleProdF)
    setMiddleProduction(middleProdData)
    setMaterialProfitSum(getMaterialProfitSum(middleProdF, materialFinancials))
    const m: VolumeInfo[] = materialFinancials.map(item => {
      return [item.materialName, item.monthlyRequired, item.yearlyRequired]
    })
    setMaterialSummary(getMaterialSummary(middleProdData, middleProductionInfo, m))
  }, [factoryData, materialFinancials, middleProductionInfo, multiplier, sellingPriceData])
  

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
  const initializeStateData = () => {
    setProductType([]);
    setProductChoices({});
    setFactoryChoices([]);
    setSelectedProduct("");
    setSelectedProductType("");
    setSelectedFactory("");
    setFinalConsumptionVolume([]);
    setFinalProductionVolume([]);
    setMaterialFinancials([]);
    setMaterialProfitSum(0);
    setMaterialSummary([]);
  }
  const handleChangeProduct = (product: string) => {
    switch (searchType) {
      case "search-by-product":
        if (!product) {
          initializeStateData();
          setProductChoices(productData);
          return;
        }
        if (product !== selectedProduct) {
          setSelectedProductType("");
          setSelectedFactory("");
        }
        setSelectedProduct(product);
        setProductType(productData[product].alias);
        setFactoryChoices(productData[product].factory);
        break;

      case "search-by-factory":
        setSelectedProduct(product);
        setProductType(productData[product].alias);
        break;
    
      default:
        break;
    }
  }
  const handleChangeProductType = (productType: string) => {
    setSelectedProductType(productType);
  }
  const handleChangeFactory = (factory: string) => {
    switch (searchType) {
      case "search-by-product":
        setSelectedFactory(factory);
        break;
      
      case "search-by-factory":
        if (!factory) {
          initializeStateData();
          setFactoryChoices(Object.keys(factoryData))
          return;
        }
        if (factory !== selectedFactory) {
          setSelectedProduct("");
          setSelectedProductType("");
        }
        setSelectedFactory(factory);
        setProductChoices({});
        const tmp = Object.entries(factoryData[factory].products).flatMap(([key]) => {
          if (key in productAliasMap) {
            const productName = productAliasMap[key]
            return [[productName, productData[productName]]]
          }
          if (key in productData) {
            return [[key, productData[key]]]
          }
          return []
        })
        const p: Product = Object.fromEntries(tmp)
        setProductChoices(p)
        break;
    
      default:
        break;
    }
  }
  const handleChangeSearchType = (searchType: string) => {
  if (!searchType) return;
  switch (searchType) {
    case "search-by-product":
      initializeStateData();
      setProductChoices(productData)
      setFactoryChoices([]);
      break;
    case "search-by-factory":
      initializeStateData();
      setProductChoices({});
      setFactoryChoices(Object.keys(factoryData))
      break;

    default:
      return;
    }
    setSearchType(searchType);
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
    setMiddleProductionInfo(updatedInfo)
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
    setMiddleProductionInfo(updatedInfo)
  }

  return (
    <GlobalWrapper>
      <ContentTitle>材料検索</ContentTitle>
      <ContentParagraph>
        <ContentP>
          生産品と施設を選択することで、必要な素材量や利益がわかります。<br />
          また、中間工程がある場合、以下の項目を変更できます。
        </ContentP>
        <ContentUL>
          <li>工場...例) 乳業工場（大）/ 乳業工場（小）</li>
          <li>生産タイプ...例) バター（牛乳）/ バター（ヤギ乳）/ バター（水牛のミルク）</li>
        </ContentUL>
      </ContentParagraph>
      <RadioSelector>
        <div>
          <input type="radio" id="search-by-product" name="search-type" value="search-by-product" onChange={(e) => handleChangeSearchType(e.target.value)} checked={searchType === "search-by-product"} />
          <label htmlFor="search-by-product">生産品から検索</label>
        </div>
        <div>
          <input type="radio" id="search-by-factory" name="search-type" value="search-by-factory" onChange={(e) => handleChangeSearchType(e.target.value)} />
          <label htmlFor="search-by-factory">施設から検索</label>
        </div>
      </RadioSelector>
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
          <MenuTableTrSelect $name="product" $defaultValue="" $onChange={(e) => handleChangeProduct(e.target.value)}  $disabled={Object.entries(productChoices).length ? false : true}>
            <>
              {Object.entries(productChoices).length ? <option value="">選択してください</option> : <option value="">---</option>}
              {Object.entries(productChoices).map(([key, ], i) => (
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
          <MenuTableTrSelect $name="factory" $value={selectedFactory} $onChange={(e) => handleChangeFactory(e.target.value)} $disabled={factoryChoices.length ? false : true}>
            <>
              {factoryChoices.length ? <option value="">選択してください</option> : <option value="">---</option>}
              {factoryChoices.map((e, i) => (
                <option key={`factory-${i}`} value={e}>{e}</option>
              ))}
            </>
          </MenuTableTrSelect>
        </MenuTableTr>
      </MenuTable>
      {showTable &&
      <>
      {/* ============================== 
        最終工程表示領域
      ================================== */}
      <Small>※ 量の単位はすべて&#08467; / 小数点以下切り上げ</Small>
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
      <ProductProfitWrapper $title='最終生産品' $style={{marginBottom:"1em"}}>
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
        <ProductProfitWrapper $title='原材料 - 中間生産品' $style={{marginBottom:"0.5em"}}>
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
        <ProductProfitWrapper $title='原材料 - その他' $style={{marginBottom:"0.5em"}}>
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
          <GraphBarWrapper $num={1} $marginBottom={"1.5em"}>
            <h5>素材合計売値</h5>
            <GraphBar 
              $width={materialProfitSum/finalProductFinancials.yearlyProfit*100}>
            </GraphBar>
            <p>&euro;{materialProfitSum.toLocaleString()}</p>
          </GraphBarWrapper>
          <TransitionWrapper>
            <img src="/img/arrow_to_bottom.svg" alt="" />
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


      {/* ============================== 
        まとめ
      ================================== */}
      <Small>※ 量の単位はすべて&#08467; / 小数点以下切り上げ</Small>
      <TableCategoryTitle>まとめ</TableCategoryTitle>
      <ProductMaterialSummaryWrapper $title='必要原材料一覧'>
        <ProductMaterialSummaryTable>
          {materialSummary.map((item, i) => (
            <tr key={`material-summary-${item}-${i}`}>
              {item.numOfSameMaterial > 1 ?
              i > 0 && item.materialName !== materialSummary[i-1].materialName && <th rowSpan={2}>{item.materialName}</th>
              :
              <th>{item.materialName}</th>
              }
              <td>{item.monthlyRequired}</td>
              <td>{item.yearlyRequired}</td>
              {item.factoryName ? 
              <>
                <td style={{backgroundColor: 'transparent'}}>→</td>
                <td>{item.factoryName}</td>
                <td>{item.productType}</td>
              </>
              : 
              <>
                <td style={{backgroundColor: 'transparent'}}></td>
                <td style={{backgroundColor: 'transparent'}}>-</td>
                <td style={{backgroundColor: 'transparent'}}>-</td>
              </>
              }
              
            </tr>
          ))}
        </ProductMaterialSummaryTable>
      </ProductMaterialSummaryWrapper>
      
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
const RadioSelector = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  font-size: 0.5em;
  line-height: 1.5;
  input[type=radio] {
    appearance: auto;
    -webkit-appearance: auto;
    margin-right: 0.5em;
  }
`
const CompareWrapper = styled.div`
  width: 100%;
  display: grid;
  padding: 0 0.5em;
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