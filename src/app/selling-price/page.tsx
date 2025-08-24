"use client";
import styled from "styled-components";
import { useEffect, useState } from "react";
import sellingPriceDataJSON from '../../../public/data/selling_price.json'
import { formatSellingPriceData } from "@/utils/format";
import { sortBy } from "../utils/sort";
import GlobalWrapper from "@/components/GlobalWrapper"
import ContentTitle from "@/components/ContentTitle";
import ContentParagraph from "@/components/ContentParagraph";
import ContentUL from "@/components/ContentUL";
import MenuTable from "@/components/MenuTable";
import MenuTableTr from "@/components/MenuTableTr";
import MenuTableTrSelect from "@/components/MenuTableTrSelect";
import Small from "@/components/Small";
import type { SellingPrice } from "@/utils/type";

const SellingPrice = () => {
  const [sellingPriceData, setSellingPriceData] = useState<SellingPrice[]>([]);
  const [sortMode, setSortMode] = useState<string>("");
  const [isReverse, setIsReverse] = useState<boolean>(false);
  const [multiplier, setMultiplier] = useState<number>(0.6);

  useEffect(() => {
    setSellingPriceData(formatSellingPriceData(sellingPriceDataJSON));
  }, [])

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

  const handleClick = (mode: string, reverse: boolean) => {
    if (mode !== sortMode) {
      reverse = false;
      setSortMode(mode);
      setIsReverse(reverse);
    } else {
      reverse = !reverse
      setIsReverse(reverse)
    }
    setSellingPriceData(sortBy(sellingPriceData, mode, reverse))
  }

  return (
    <GlobalWrapper $currentPage="売値">
      <ContentTitle>売値一覧表</ContentTitle>
      <ContentParagraph>
        <ContentUL>
          <li>売値は、イージーと比べてノーマルでは約40%、ハードでは約66%減少する。</li>
          <li>売値は変動するため、それに伴い最高値月も変動する可能性がある。</li>
        </ContentUL>
      </ContentParagraph>
      <MenuTable>
        <MenuTableTr $label="難易度">
          <MenuTableTrSelect $name="difficulty" $defaultValue="normal" $onChange={(e) => handleChangeDifficulty(e.target.value)}>
            <option value="easy">イージー</option>
            <option value="normal">ノーマル</option>
            <option value="hard">ハード</option>
          </MenuTableTrSelect>
        </MenuTableTr>
      </MenuTable>
      <Small>※ 項目名クリックでソート</Small>
      <Table>
      <tbody>
        <TableHeader>
          <th onClick={() => handleClick("aiueo", isReverse)}>品名 {sortMode == "aiueo" && <Arrow $isReverse={isReverse}>&#9660;</Arrow>}</th>
          <td onClick={() => handleClick("month", isReverse)}>最高値月 {sortMode == "month" && <Arrow $isReverse={isReverse}>&#9660;</Arrow>}</td>
          <td onClick={() => handleClick("highest", isReverse)}>最高値[&euro;] {sortMode == "highest" && <Arrow $isReverse={isReverse}>&#9660;</Arrow>}</td>
          <td onClick={() => handleClick("lowest", isReverse)}>最安値[&euro;] {sortMode == "lowest" && <Arrow $isReverse={isReverse}>&#9660;</Arrow>}</td>
        </TableHeader>
        {sellingPriceData.map((item, index) => (
          <tr key={`tr_${index}`}>
            <th key={`th_${index}`}>{item.name}</th>
            <MonthLabel key={`td0_${index}`}>{item.maxMonthLabel}</MonthLabel>
            <td key={`td1_${index}`}>{Math.round(item.maxPrice*multiplier).toLocaleString()}</td>
            <td key={`td2_${index}`}>{Math.round(item.minPrice*multiplier).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
      </Table>
    </GlobalWrapper>
  )
}

export default SellingPrice

const Table = styled.table`
  width: 100%;
  margin: 0 auto;
  border: 1px solid #999;
  border-collapse:separate;
  border-spacing: 0;
  tr {
    line-height: 1.2em;
    background-color: #fff;
    &:nth-child(odd) {
      background-color: #f0f0f0;
    }
  }
  th {
    width: 15em;
    padding-left: 1em;
  }
  td {
    text-align: right;
    padding-right: 1em;
    width: 8em;
  }
  th, td {
    font-size: 0.5em;
  }
`
const TableHeader = styled.tr`
  background-color: #666 !important;
  th, td {
    color: white;
    cursor: pointer;
  }
` 
const Arrow = styled.span<{$isReverse: boolean}>`
  font-size: 8px;
  line-height: 8px;
  display: inline-block;
  transform: ${({$isReverse}) => $isReverse ? "rotateZ(180deg)" : "none"};
`
const MonthLabel = styled.td`
  width: 8em;
`