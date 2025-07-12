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
import { Product, Factory } from '@/utils/type';
import { VolumeInfo, getProductionVolume, getConsumption, getRequiredMaterials } from '@/utils/calc';
import Small from '@/components/Small';
import ProductInfoWrapper from '@/components/ProductInfoWrapper';
import ProductExportInfoTable from '@/components/ProductExportInfoTable';
import ProductInputInfoTable from '@/components/ProductInputInfoTable';
import styled from 'styled-components';

type ProductionInfo = {
  factoryName: string[],
  productName: string,
  monthlyRequired: number,
  yearlyRequired: number,
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
  const [middleProduction, setMiddleProduction] = useState<VolumeInfo[][][]>([]);
  const [middleProductionInfo, setMiddleProductionInfo] = useState<ProductionInfo[]>([]);

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
    const factory = selectedFactory;
    const product = selectedProductType ? selectedProductType : selectedProduct;
    const finalProductionVol = getProductionVolume(factoryData[factory].products, product)
    const finalConsumptionVol = getConsumption(factoryData[factory].products, product)
    setFinalProductionVolume(finalProductionVol);
    setFinalConsumptionVolume(finalConsumptionVol);

    // 中間素材
    const middleMaterial = finalConsumptionVol.filter(item => Object.keys(productData).includes(item[0] as string));
    const middleMaterialInfo = middleMaterial.map(([material, monthly, yearly]) => {
      const materialName = productData[material].alias[0] || material; 
      return {factoryName: productData[material].factory, productName: materialName as string, monthlyRequired: Number(monthly), yearlyRequired: Number(yearly)}
    })
    const middleProductionVol = middleMaterial.map(([material, monthly, yearly]) => {
      const materialName = productData[material].alias[0] || material;
      return [[materialName, monthly, yearly]] as VolumeInfo[];
    })
    const middleConsumptionVol = middleMaterial.map(([material, monthly, ]) => {
      const materialName = productData[material].alias[0] || material;
      return getRequiredMaterials(factoryData[productData[material].factory[0]].products, materialName as string, Number(monthly))
    })
    
    const middleProd = middleProductionVol.map((e, i) => [e, middleConsumptionVol[i]]);
    setMiddleProductionInfo(middleMaterialInfo)
    setMiddleProduction(middleProd);
    // console.log(middleProd)
  }, [factoryData, productData, productType.length, selectedFactory, selectedProduct, selectedProductType])

  const handleChangeProduct = (product: string) => {
    if (!product) {
      setProductType([]);
      setFactories([]);
      setSelectedProduct("");
      setSelectedProductType("");
      setSelectedFactory("");
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

  return (
    <GlobalWrapper>
      <ContentTitle>材料逆引きツール</ContentTitle>
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
      <Small>※ 量の単位はすべてL / 小数点以下切り上げ</Small>

      <TableCategoryTitle>最終工程</TableCategoryTitle>
      <ProductInfoWrapper $factoryName={selectedFactory} $style={{marginBottom:"4em"}}>
        <ProductExportInfoTable>
          <tr>
            <th>{selectedProductType}</th>
            {finalProductionVolume.map(([key, volPerM, volPerY], i) => (
              <React.Fragment key={`export-${key}-${i}`}>
                <td>{key}</td>
                <td>{volPerM}</td>
                <td>{volPerY}</td>
              </React.Fragment>
            ))}
          </tr>
        </ProductExportInfoTable>
        <ProductInputInfoTable>
          {finalConsumptionVolume.map(([key, volPerM, volPerY], i) => (
            <tr key={`input-${key}-${i}`}>
              <th>{key}</th>
              <td>{key}</td>
              <td>{volPerM}</td>
              <td>{volPerY}</td>
            </tr>
          ))}
        </ProductInputInfoTable>
      </ProductInfoWrapper>


      <TableCategoryTitle>中間工程</TableCategoryTitle>
      {middleProduction.map((e, i) => (
        <ProductInfoWrapper key={`midProd-${i}`} $factoryName={middleProductionInfo[i].factoryName[0]} $style={{marginBottom:"3em"}}>
          <ProductExportInfoTable>
            <tr>
              {e[0].map(([key, volPerM, volPerY], i) => (
                <React.Fragment key={`mid-export-${key}-${i}`}>
                  <th>{key}</th>
                  <td>{key}</td>
                  <td>{volPerM}</td>
                  <td>{volPerY}</td>
                </React.Fragment>
              ))}
            </tr>
          </ProductExportInfoTable>
          <ProductInputInfoTable>
            {e[1].map(([key, volPerM, volPerY], i) => (
              <tr key={`mid-input-${key}-${i}`}>
                <th>{key}</th>
                <td>{key}</td>
                <td>{volPerM}</td>
                <td>{volPerY}</td>
              </tr>
            ))}
          </ProductInputInfoTable>
        </ProductInfoWrapper>
      ))}
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