"use client";
import styled from "styled-components";
import { useEffect, useState } from "react";
import data from '../../../public/data/selling_price.json'
import { formatMonths } from "../utils/formatMonths";
import { Item } from "@/utils/type";
import { sortBy } from "../utils/sort";
import GlobalWrapper from "@/components/GlobalWrapper"
import ContentTitle from "@/components/ContentTitle";
import ContentParagraph from "@/components/ContentParagraph";
import ContentUL from "@/components/ContentUL";

const SellingPrice = () => {
  const [sellingPrices, setSellingPrices] = useState<Item[]>([]);
  const [sortMode, setSortMode] = useState<string>("");
  const [isReverse, setIsReverse] = useState<boolean>(false);
  // const [difficulty, setDifficulty] = useState<string>("normal");
  const [multiplier, setMultiplier] = useState<number>(0.6);

  useEffect(() => {
    const tmp = data.map((items) => ({
      ...items,
      maxMonthLabel: formatMonths(items.maxMonths),
    }))
    setSellingPrices(tmp);
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
    setSellingPrices(sortBy(sellingPrices, mode, reverse))
  }

  return (
    <GlobalWrapper>
      <ContentTitle>売値一覧表</ContentTitle>
      <ContentParagraph>
        <ContentUL>
          <li>売値は、イージーと比べてノーマルでは約40%、ハードでは約66%減少する。</li>
          <li>売値は変動するため、それに伴い最高値月も変動する可能性がある。</li>
        </ContentUL>
      </ContentParagraph>
      <MenuTable>
        <tbody>
          <tr>
            <th>難易度</th>
            <td>
              <select name="difficulty" id="difficulty" defaultValue={"normal"} onChange={(e) => handleChangeDifficulty(e.target.value)}>
                <option value="easy">イージー</option>
                <option value="normal">ノーマル</option>
                <option value="hard">ハード</option>
              </select>
            </td>
          </tr>
        </tbody>
      </MenuTable>
      <Table>
      <tbody>
        <TableHeader>
          <th onClick={() => handleClick("aiueo", isReverse)}>品名 {sortMode == "aiueo" && <Arrow $isReverse={isReverse}>&#9660;</Arrow>}</th>
          <td onClick={() => handleClick("month", isReverse)}>最高値月 {sortMode == "month" && <Arrow $isReverse={isReverse}>&#9660;</Arrow>}</td>
          <td onClick={() => handleClick("highest", isReverse)}>最高値[&euro;] {sortMode == "highest" && <Arrow $isReverse={isReverse}>&#9660;</Arrow>}</td>
          <td onClick={() => handleClick("lowest", isReverse)}>最安値[&euro;] {sortMode == "lowest" && <Arrow $isReverse={isReverse}>&#9660;</Arrow>}</td>
        </TableHeader>
        {sellingPrices.map((item, index) => (
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

const MenuTable = styled.table`
  width: 100%;
  margin: 0 auto;
  border: 1px solid #999;
  border-collapse:separate;
  border-spacing: 0;
  margin-bottom: 1em;
  tr {
    line-height: 1.2em;
  }
  th, td {
    font-size: 0.5em;
  }
  th {
    width: 8em;
    padding-left: 1em;
    background-color: #f0f0f0;
  }
  td {
    position: relative;
    select {
      width: 100%;
      padding-left: 1em;
      box-shadow: 0 0 4px 2px #ddd inset;
    }
    &::after {
      content: "▼";
      position: absolute;
      top: 50%;
      right: 1em;
      transform: translateY(-50%);
      pointer-events: none;
    }
  }
`

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