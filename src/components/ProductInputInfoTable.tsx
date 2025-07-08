import styled from "styled-components"

type Props = {
  children: React.ReactNode,
}

const ProductInputInfoTable: React.FC<Props> = ({children}) => {
  return (
    <TableWrapper>
      <tbody>
        <tr>
          <TableTypeHeader>消費</TableTypeHeader>
          <TableHeader>消費品名</TableHeader>
          <TableHeader>月間消費量</TableHeader>
          <TableHeader>年間消費量</TableHeader>
        </tr>
        {children}
      </tbody>
    </TableWrapper>
  )
}

export default ProductInputInfoTable

const TableWrapper = styled.table`
  width: 100%;
  border-collapse: separate;
  margin-top: 1em;
  table-layout: fixed;
  th {
    width: 8em;
    text-align: center;
    background-color: #dddddd;
  }
  td {
    width: calc((100% - 8em) / 3);
    background-color: #f0f0f0;
    text-align: center;
  }
`
const TableTypeHeader = styled.th`
  background-color:rgb(175, 0, 0) !important;
  color: #ffffff;
  text-align: center;
`
const TableHeader = styled.td`
  text-align: center !important;
  padding: 0 !important;
  background-color: #ccc !important;
`