import styled from "styled-components"

type Props = {
  children: React.ReactNode,
}

const ProductExportInfoTableGraph: React.FC<Props> = ({children}) => {
  return (
    <TableWrapper>
      <tbody>
        <tr>
          <TableTypeHeader>生産</TableTypeHeader>
          <TableHeader>生産品名</TableHeader>
          <TableHeader colSpan={2}>月間生産量</TableHeader>
        </tr>
        {children}
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