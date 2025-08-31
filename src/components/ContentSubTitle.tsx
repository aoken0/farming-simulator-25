import { COLOR } from "@/utils/color"
import styled from "styled-components"

type Props = {
  children: React.ReactNode,
  $marginTop?: string,
  $marginBottom?: string,
}

const ContentSubTitle: React.FC<Props> = ({children, $marginTop, $marginBottom}) => {
  return (
    <Wrapper $marginTop={$marginTop} $marginBottom={$marginBottom}>
      <SubTitle>{children}</SubTitle>
    </Wrapper>
  )
}

export default ContentSubTitle

const Wrapper = styled.div<{$marginTop?: string, $marginBottom?: string}>`
  width: 100%;
  margin-top: ${({$marginTop}) => $marginTop ? $marginTop : "0"};
  margin-bottom: ${({$marginBottom}) => $marginBottom ? $marginBottom : "0"};
`
const SubTitle = styled.h3`
  font-size: 0.6em;
  line-height: 2em;
  padding-left: 0.5em;
  margin-top: 0.5em;
  margin-bottom: 0.2em;
  position: relative;
  border-bottom: 1px solid #ccc;
  &::before {
    position: absolute;
    content: "";
    height: 1.6em;
    aspect-ratio: 1/8;
    background-color: ${COLOR.main2};
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    border-radius: 2px;
  }
`