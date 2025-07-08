import styled from "styled-components"

type Props = {
  $factoryName: string,
  children: React.ReactNode,
}

const ProductExportInfoTable: React.FC<Props> = ({$factoryName, children}) => {
  return (
    <TableWrapper>
      <tbody>
        <tr>
          <TableTitle colSpan={4}>{$factoryName}</TableTitle>
        </tr>
        <tr>
          <th style={{backgroundColor: "#fff"}}></th>
          <TableHeader>生産品名</TableHeader>
          <TableHeader>月間生産量</TableHeader>
          <TableHeader>年間生産量</TableHeader>
        </tr>
        {children}
      </tbody>
    </TableWrapper>
  )
}

export default ProductExportInfoTable

const TableWrapper = styled.table`
  width: 100%;
  border-collapse:separate;
  
  line-height: 1.2em;
  tr {
    width: 100%;
  }
  th, td {
    font-size: 0.5em;
  }
  th {
    width: 8em;
    padding-left: 1em;
    background-color: #ddd;
  }
  td {
    text-align: center;
    // padding-right: 1em;
    width: calc((100% - 8em)/3);
    background-color: #f0f0f0;
  }
  .productName {
    text-align: center;
  }
`
const TableTitle = styled.th`
  background-color: #bbbbbb !important;
`

const TableHeader = styled.td`
  text-align: center !important;
  padding: 0 !important;
`