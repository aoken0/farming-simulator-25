import { ReactElement } from "react"
import styled from "styled-components"

type Props = {
  children: ReactElement<HTMLOptionElement> | ReactElement<HTMLOptionElement>[],
  $name: string,
  $defaultValue?: string,
  $value?: string,
  $disabled?: boolean,
  $onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void,
}

const MenuTableTrSelect: React.FC<Props> = ({children,$name, $defaultValue, $value, $disabled, $onChange}) => {


  return (
    <Select name={$name} id={$name} defaultValue={$defaultValue} value={$value} onChange={(e) => $onChange(e)} disabled={$disabled}>
      {children}
    </Select>
  )
}

export default MenuTableTrSelect

const Select = styled.select`
  width: 100%;
  height: 100%;
  vertical-align: top;
  padding-left: 1em;
  box-shadow: 0 0 4px 2px #ddd inset;
  outline: none;
  &:disabled {
    background-color: #ccc;
    box-shadow: none;
  }
`