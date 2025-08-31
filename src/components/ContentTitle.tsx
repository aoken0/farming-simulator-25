import { COLOR } from "@/utils/color";
import styled from "styled-components"

type Props = {
  children: React.ReactNode,
  $marginTop?: string,
  $marginBottom?: string,
}

const ContentTitle: React.FC<Props> = ({children, $marginTop, $marginBottom}) => {
  return (
    <Wrapper $marginTop={$marginTop} $marginBottom={$marginBottom}>
      <Title>{children}</Title>
    </Wrapper>
  )
}

export default ContentTitle

const Wrapper = styled.div<{$marginTop?: string, $marginBottom?: string}>`
  width: 100%;
  background-color: #e5e5e5;
  border-radius: 2px;
  margin-top: ${({$marginTop}) => $marginTop ? $marginTop : "0"};
  margin-bottom: ${({$marginBottom}) => $marginBottom ? $marginBottom : "0"};
`
const Title = styled.h2`
  color: ${COLOR.text};
  font-size: 0.6em;
  font-weight: bold;
  line-height: 2em;
  padding-left: 0.8em;
`