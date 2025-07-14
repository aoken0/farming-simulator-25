import { ReactElement } from "react"
import styled from "styled-components"

type Props = {
  children: ReactElement<HTMLTableRowElement> | ReactElement<HTMLTableRowElement>[];
  $marginBottom?: string;
}

const MenuTable: React.FC<Props> = ({children, $marginBottom}) => {

  return (
    <TableWrapper $marginBottom={$marginBottom}>
      <tbody>
        {children}
      </tbody>
    </TableWrapper>
  )
}

export default MenuTable

const TableWrapper = styled.table<{$marginBottom: string | undefined}>`
  width: 100%;
  margin: 0 auto;
  border: 1px solid #999;
  border-collapse:separate;
  border-spacing: 0;
  margin-bottom: ${({$marginBottom}) => $marginBottom ? $marginBottom : "1em"};
`