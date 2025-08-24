import { COLOR } from "@/utils/color";
import styled from "styled-components"

type Props = {
  children: React.ReactNode;
}

const ContentTitle: React.FC<Props> = ({children}) => {
  return (
    <Wrapper>
      {children}
    </Wrapper>
  )
}

export default ContentTitle

const Wrapper = styled.div`
  width: 100%;
  color: ${COLOR.text};
  font-size: 0.6em;
  font-weight: bold;
  line-height: 2em;
  padding-left: 1em;
  margin-bottom: 1em;
  background-color: #e5e5e5;
`