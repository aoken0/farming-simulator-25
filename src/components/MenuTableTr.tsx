import styled from "styled-components"

type Props = {
  children: React.ReactNode;
  $label: string;
}

const MenuTableTr: React.FC<Props> = ({children, $label}) => {
  return (
    <Tr>
      <th>{$label}</th>
      <td>
        {children}
      </td>
    </Tr>
  )
}

export default MenuTableTr

const Tr = styled.tr`
  line-height: 1.2em;
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
`

