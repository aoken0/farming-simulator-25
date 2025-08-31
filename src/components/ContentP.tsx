import { ReactNode } from "react";
import styled from "styled-components"

type Props = {
  children: ReactNode;
}


const ContentP: React.FC<Props> = ({children}) => {
  return (
    <P>
      {children}
    </P>
  )
}

export default ContentP

const P = styled.p`
  width: 100%;
  line-height: 1.7em; 
  margin-bottom: 0.5em;  
`