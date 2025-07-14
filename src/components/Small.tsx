import styled from "styled-components"

type Props = {
  children: React.ReactNode,
}

const Small: React.FC<Props> = ({children}) => {
  return (
    <SmallWrapper>
      {children}
    </SmallWrapper>
  )
}

export default Small

const SmallWrapper = styled.small`
  font-size: max(0.3em, 10px);
`