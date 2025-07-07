import { ReactElement } from "react"
import styled from "styled-components"

type Props = {
  children: ReactElement<HTMLTableRowElement> | ReactElement<HTMLTableRowElement>[];
}

const MenuTable: React.FC<Props> = ({children}) => {

  return (
    <TableWrapper>
      <tbody>
        {children}
      </tbody>
    </TableWrapper>
  )
}

export default MenuTable

const TableWrapper = styled.table`
  width: 100%;
  margin: 0 auto;
  border: 1px solid #999;
  border-collapse:separate;
  border-spacing: 0;
  margin-bottom: 1em;
`