import styled from "styled-components"

type Props = {
  $factoryName: string,
  $style?: React.CSSProperties,
  children: React.ReactNode,
}

const ProductExportInfoWrapper: React.FC<Props> = ({$factoryName, children, $style}) => {
  return (
    <Wrapper style={$style}>
      <Title>{$factoryName}</Title>
      {children}
    </Wrapper>
  )
}

export default ProductExportInfoWrapper

const Wrapper = styled.div`
  width: 100%;  
  line-height: 2em;
  font-size: 0.5em;
`
const Title = styled.h3`
  width: 100%;
  background-color: #aaaaaa !important;
  padding-left: 1em;
  line-height: 2.4em;
`