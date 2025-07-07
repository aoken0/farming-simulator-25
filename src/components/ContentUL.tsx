import { ReactElement } from "react";
import styled from "styled-components"

type Props = {
  children: ReactElement<HTMLLIElement> | ReactElement<HTMLLIElement>[];
}


const ContentUL: React.FC<Props> = ({children}) => {
  return (
    <UL>
      {children}
    </UL>
  )
}

export default ContentUL

const UL = styled.ul`
  width: 100%;
  list-style-type: disc;
  list-style-position: inside;
  li {
    line-height: 1.5em; 
    margin-bottom: 1em;
  }
`