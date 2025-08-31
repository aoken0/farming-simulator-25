"use client"

import styled from "styled-components"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import ContentP from "@/components/ContentP"
import ContentParagraph from "@/components/ContentParagraph"
import ContentTitle from "@/components/ContentTitle"
import ContentSubTitle from "@/components/ContentSubTitle"
import GlobalWrapper from "@/components/GlobalWrapper"
import MenuTable from "@/components/MenuTable"
import MenuTableTr from "@/components/MenuTableTr"
import MenuTableTrSelect from "@/components/MenuTableTrSelect"
import MaterialProductMapJSON from "../../../public/data/material_product_map.json"
import AliasMapJSON from "../../../public/data/alias_map.json"
import Error from "@/components/Error"
import Loading from "@/components/Loading"
import NormalTable from "@/components/NormalTable"
import LinkButton from "./components/LinkButton"
import type { MaterialProductMap, ProductAlias } from "@/utils/type"

const materialProductMap: MaterialProductMap = MaterialProductMapJSON;
const aliasMap: ProductAlias = AliasMapJSON;

const getMaterials = (): string[] => {
  const materialList = Object.keys(materialProductMap).sort((a, b) => a.localeCompare(b, 'ja'));
  return materialList
}

const ProductionSearch = () => {
  const [producibleItems, setProducibleItems] = useState<string[]>([]);

  const {data, isError, isLoading} = useQuery({
    queryKey: ["search-production"],
    queryFn: () => getMaterials()
  })

  const handleChangeProduct = (product: string) => {
    if (!product) return;
    setProducibleItems(materialProductMap[product])
  }

  if (isError) return <Error />
  if (isLoading) return <Loading />
  return (
    <GlobalWrapper $currentPage="生産品">
      <ContentTitle>検索ツール</ContentTitle>

      <ContentParagraph>
        <ContentP>
          作物などの材料を選択することで、作れる製品を検索できます。
        </ContentP>
      </ContentParagraph>
      <MenuTable $marginBottom='0.5em'>
        <MenuTableTr $label="材料">
          <MenuTableTrSelect $name="product" $onChange={(e) => handleChangeProduct(e.target.value)}>
            <>
              <option value={""}>-- 選択してください --</option>
              {data?.map((key, i) => (
                <option key={`product-${i}`} value={key}>{key}</option>
              ))}
            </>
          </MenuTableTrSelect>
        </MenuTableTr>
      </MenuTable>

      { producibleItems.length > 0 &&
      <>
        <ContentSubTitle $marginTop="1.5em">作成可能な製品一覧</ContentSubTitle>
        <NormalTable>
          <tr>
            <Th></Th>
            <Th>製品名</Th>
            <Th>製品タイプ名</Th>
            <Th>生産工程</Th>
          </tr>
          {producibleItems.map((key, i) => (
            <tr key={`producible-items-${i}`}>
              <TdNumber>{i+1}</TdNumber>
              <TdProductName>{aliasMap[key] || key}</TdProductName>
              <TdProductName>{key}</TdProductName>
              <TdDetail><LinkButton $url={`/recipe-viewer`} $productName={aliasMap[key] || key} $productType={aliasMap[key] ? key : ""} /></TdDetail>
            </tr>
          ))}
        </NormalTable>
      </>
      }

    </GlobalWrapper>
  )
}

export default ProductionSearch

const Th = styled.th `
  padding-left: 1em;
`
const TdNumber = styled.td`
  text-align: center;
`
const TdProductName = styled.td`
  padding-left: 1em;
`
const TdDetail = styled.td`
  min-width: 120px;
  padding-left: 1em;
  padding-right: 1em;
`