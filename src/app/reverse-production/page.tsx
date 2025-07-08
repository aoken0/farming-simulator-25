"use client";
import { useState, useEffect } from 'react';
import ContentTitle from "@/components/ContentTitle";
import GlobalWrapper from "@/components/GlobalWrapper"
import MenuTable from "@/components/MenuTable";
import MenuTableTr from "@/components/MenuTableTr";
import MenuTableTrSelect from "@/components/MenuTableTrSelect";
import productDataJSON from '../../../public/data/product.json';
import factoryDataJSON from '../../../public/data/factory.json';
import { Product, Factory } from '@/utils/type';
import { getProductionVolume, getConsumption } from '@/utils/calc';
import React from 'react';
import Small from '@/components/Small';
import ProductInfoWrapper from '@/components/ProductInfoWrapper';
import ProductExportInfoTable from '@/components/ProductExportInfoTable';
import ProductInputInfoTable from '@/components/ProductInputInfoTable';

const ReverseProduction = () => {
  const [productData, setProductData] = useState<Product>({});
  const [productType, setProductType] = useState<string[]>([]);
  const [factoryData, setFactoryData] = useState<Factory>({});
  const [factories, setFactories] = useState<string[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [selectedFactory, setSelectedFactory] = useState<string>("");

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

  const handleChangeProduct = (product: string) => {
    if (!product) {
      setProductType([]);
      setFactories([]);
      setSelectedProduct("");
      setSelectedFactory("");
      return;
    }
    if (!productData[product].alias.length) {
      setSelectedProduct(product);
    }
    setProductType(productData[product].alias);
    setFactories(productData[product].factory);
  }
  const handleChangeProductType = (productType: string) => {
    setSelectedProduct(productType);
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
          <MenuTableTrSelect $name="product-type" $defaultValue="" $onChange={(e) => handleChangeProductType(e.target.value)} $disabled={productType.length ? false : true}>
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
          <MenuTableTrSelect $name="factory" $defaultValue="" $onChange={(e) => handleChangeFactory(e.target.value)} $disabled={factories.length ? false : true}>
            <>
              {factories.length ? <option value="">選択してください</option> : <option value="">---</option>}
              {factories.map((e, i) => (
                <option key={`factory-${i}`} value={e}>{e}</option>
              ))}
            </>
          </MenuTableTrSelect>
        </MenuTableTr>
      </MenuTable>
      {selectedFactory && selectedProduct &&
      <>
      <Small>※ 量の単位はすべてL / 小数点以下切り上げ</Small>
      <ProductInfoWrapper $factoryName={selectedFactory}>
        <ProductExportInfoTable>
          <tr>
            <th>{selectedProduct}</th>
            {getProductionVolume(factoryData[selectedFactory].products, selectedProduct).map(([key, volPerM, volPerY], i) => (
              <React.Fragment key={`export-${key}-${i}`}>
                <td>{key}</td>
                <td>{volPerM}</td>
                <td>{volPerY}</td>
              </React.Fragment>
            ))}
          </tr>
        </ProductExportInfoTable>
        <ProductInputInfoTable>
          {getConsumption(factoryData[selectedFactory].products, selectedProduct).map(([key, volPerM, volPerY], i) => (
            <tr key={`input-${key}-${i}`}>
              <th>{key}</th>
              <td>{key}</td>
              <td>{volPerM}</td>
              <td>{volPerY}</td>
            </tr>
          ))}
        </ProductInputInfoTable>
      </ProductInfoWrapper>
      </>
      }
    </GlobalWrapper>
  )
}

export default ReverseProduction