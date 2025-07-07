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

const ReverseProduction = () => {
  const [productData, setProductData] = useState<Product[]>([]);
  const [factoryData, setFactoryData] = useState<Factory[]>([]);

  useEffect(() => {
    console.log(factoryDataJSON);
    console.log(productDataJSON)
  },[])

  const handleChangeProduct = (production: string) => {
    console.log(production)
  }

  return (
    <GlobalWrapper>
      <ContentTitle>材料逆引きツール</ContentTitle>
      <MenuTable>
        <MenuTableTr $label="生産品">
          <MenuTableTrSelect $name="product" $defaultValue="" $onChange={(e) => handleChangeProduct(e.target.value)}>
            <option value="パン">パン</option>
            <option value="ケーキ">ケーキ</option>
          </MenuTableTrSelect>
        </MenuTableTr>
      </MenuTable>
    </GlobalWrapper>
  )
}

export default ReverseProduction