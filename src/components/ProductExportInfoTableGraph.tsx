import styled from "styled-components"

type Props = {
  children: React.ReactNode,
  $monthlyCapacity: number,
  $monthlyRequired: number,
}

const getColorByPercentage = (percent: number): string => {
  const clamped = Math.max(0, Math.min(100, percent));
  let r = 0, g = 0;

  if (clamped <= 50) {
    r = Math.round((clamped / 50) * 255);
    g = 255;
  } else {
    r = 255;
    g = Math.round(255 - ((clamped - 50) / 50) * 255);
  }

  return `rgb(${r},${g},0)`;
};

const ProductExportInfoTableGraph: React.FC<Props> = ({children, $monthlyCapacity, $monthlyRequired}) => {
  const operatingRate = $monthlyRequired/$monthlyCapacity*100;

  return (
    <TableWrapper>
      <tbody>
        <tr>
          <TableTypeHeader>生産</TableTypeHeader>
          <TableHeader>生産品名</TableHeader>
          <TableHeaderLeft colSpan={2}>稼働率</TableHeaderLeft>
        </tr>
        <tr>
          {children}
          <td colSpan={2}>
            <GraphWrapper>
              <Graph $width={operatingRate}></Graph>
              <GraphP>{operatingRate.toFixed(1)}%</GraphP>
            </GraphWrapper>
          </td>
        </tr>
      </tbody>
    </TableWrapper>
  )
}

export default ProductExportInfoTableGraph

const TableWrapper = styled.table`
  width: 100%;
  border-collapse: separate;
  table-layout: fixed;
  th {
    width: 8em;
    text-align: center;
    background-color: #dddddd;
    select {
      width: 100%;
      height: 2.4em;
      background-color: #eee !important;
      line-height: 2.4em;
      box-shadow: 0 0 4px 2px #ddd inset;
      outline: none;
    }
  }
  .product-export-info-th-selector {
    width: 100%;
    line-height: 2.4em;
    position: relative;
    &::after {
      content: "▼";
      font-size: 0.8em;
      position: absolute;
      top: 50%;
      right: 1em;
      transform: translateY(-50%);
      pointer-events: none;
    }
  }
  td {
    width: calc((100% - 8em) / 3);
    background-color: #f0f0f0;
    text-align: center;
    &:first-child {
      width: calc((100% - 8em) / 3);
    }
  }
`
const TableTypeHeader = styled.th`
  background-color:rgb(70, 175, 0) !important;
  color: #ffffff;
  text-align: center;
`
const TableHeader = styled.td`
  text-align: center !important;
  padding: 0 !important;
  background-color: #ccc !important;
`
const TableHeaderLeft = styled.td`
  text-align: left !important;
  padding: 0 !important;
  padding-left: 1em !important;
  background-color: #ccc !important;
`

const GraphWrapper = styled.div`
  width: 100%;
  height: 2.4em;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 1em;
`
const Graph = styled.div<{$width: number}>`
  width: 80%;
  height: 1em;
  background-color: #fff;
  position: relative;
  &::after {
    position: absolute;
    content: "";
    width: ${({$width}) => Math.min($width, 100)}%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: ${({$width}) => getColorByPercentage($width)};
    transition: width 0.5s ease-out;
  }
`
const GraphP = styled.p`
  padding-left: 0.5em;
  font-size: 12px;
`