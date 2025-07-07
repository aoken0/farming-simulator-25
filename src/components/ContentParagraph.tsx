import styled from "styled-components"

type Props = {
  children: React.ReactNode;
}

const ContentParagraph: React.FC<Props> = ({children}) => {
  return (
    <Wrapper>
      {children}
    </Wrapper>
  )
}

export default ContentParagraph

const Wrapper = styled.div`
  width: 100%;
  font-size: 0.5em;
  padding-left: 1em;
  padding-right: 1em;
  margin-top: 1em;
  margin-bottom: 1em;
`