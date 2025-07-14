import styled from "styled-components"

type Props = {
  children: React.ReactNode,
}

const ProductProfitTable: React.FC<Props> = ({children}) => {
  return (
    <TableWrapper>
      <tbody>
        <tr>
          <TableHeader>生産品名</TableHeader>
          <TableHeader>年間最高売上</TableHeader>
          <TableHeader>年間生産コスト</TableHeader>
          <TableHeader>年間売上&minus;コスト</TableHeader>
        </tr>
        {children}
      </tbody>
    </TableWrapper>
  )
}

export default ProductProfitTable

const TableWrapper = styled.table`
  width: 100%;
  border-collapse: separate;
  table-layout: fixed;
  th {
    width: 8em;
    height: 2.4em;
    text-align: center;
    background-color: #dddddd;
    select {
      width: 100%;
      background-color: #eee !important;
      box-shadow: 0 0 4px 2px #ddd inset;
      outline: none;
    }
  }
  .product-export-info-th-selector {
    width: 100%;
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
const TableHeader = styled.td`
  text-align: center !important;
  padding: 0 !important;
  background-color: #ccc !important;
`