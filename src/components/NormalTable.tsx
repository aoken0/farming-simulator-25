import { COLOR } from "@/utils/color";
import styled from "styled-components"

type Props = {
  children: React.ReactNode;
}

const NormalTable: React.FC<Props> = ({children}) => {
  return (
    <Table>
      <tbody>
        {children}
      </tbody>
    </Table>
  )
}

export default NormalTable

const Table = styled.table`
  width: 100%;
  font-size: 0.5em;
  tr {
    width: 100%;
    line-height: 2.5;
    background-color: #f9f9f9;
    &:nth-child(odd) {
      background-color: #f0f0f0;
    }
    &:first-child {
      color: white;
      background-color: #666666;
    }
  }
  th, td {
    border: 1px solid #999;
  }
`
