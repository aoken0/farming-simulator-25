import styled from "styled-components"

type Props = {
  children: string;
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
  line-height: 1.5em; 
  margin-bottom: 0.5em;
  // margin-left: -1em;
`