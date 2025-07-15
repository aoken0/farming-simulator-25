import styled from "styled-components"

type Props = {
  $title: string,
  $style?: React.CSSProperties,
  children: React.ReactNode,
}

const ProductProfitWrapper: React.FC<Props> = ({$title, children, $style}) => {
  return (
    <Wrapper style={$style}>
      <Title>{$title}</Title>
      {children}
    </Wrapper>
  )
}

export default ProductProfitWrapper

const Wrapper = styled.div`
  width: 100%;  
  line-height: 2em;
  font-size: 0.5em;
`
const Title = styled.h3`
  width: 100%;
  background-color: transparent !important;
  padding-left: 1em;
  line-height: 2.4em;
  position: relative;
  &::before {
    position: absolute;
    content: "▼";
    top: 32%;
    left: 0;
    transform: rotate(-90deg) translateX(100%);
    font-size: 12px;
    color: #444;
  }
`