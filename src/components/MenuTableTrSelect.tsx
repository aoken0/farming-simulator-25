import { ReactElement } from "react"
import styled from "styled-components"

type Props = {
  children: ReactElement<HTMLOptionElement> | ReactElement<HTMLOptionElement>[];
  $name: string;
  $defaultValue: string;
  $onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const MenuTableTrSelect: React.FC<Props> = ({children,$name, $defaultValue, $onChange}) => {


  return (
    <Select name={$name} id={$name} defaultValue={$defaultValue} onChange={(e) => $onChange(e)}>
    {/* <Select name="difficulty" id="difficulty" defaultValue={"normal"} onChange={(e) => handleChangeDifficulty(e.target.value)}> */}
      {/* <option value="easy">イージー</option>
      <option value="normal">ノーマル</option>
      <option value="hard">ハード</option> */}
      {children}
    </Select>
  )
}

export default MenuTableTrSelect

const Select = styled.select`
  width: 100%;
  padding-left: 1em;
  box-shadow: 0 0 4px 2px #ddd inset;
`