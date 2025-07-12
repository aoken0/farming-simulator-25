import styled from "styled-components"

type Props = {
  $factoryName: string,
  $factories?: string[],
  $style?: React.CSSProperties,
  children: React.ReactNode,
  $onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void,
}

const ProductExportInfoWrapper: React.FC<Props> = ({$factoryName, $factories, children, $style, $onChange}) => {
  return (
    <Wrapper style={$style}>
      {$factories ? (
        <SelectorWrapper>
          <Selector value={$factoryName} onChange={$onChange ? (e) => $onChange(e) : () => {}}>
            {$factories.map((key, i) => (
              <option key={`factory-selector-${key}-${i}`} value="key">{key}</option>
            ))}
          </Selector>
        </SelectorWrapper>
      ):(
        <Title>{$factoryName}</Title>
      )
      }
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
const SelectorWrapper = styled.div`
  width: 100%;
  background-color: #ddd !important;
  line-height: 2.4em;
  position: relative;
  &::after {
    content: "▼";
    font-size: 0.8em;
    position: absolute;
    top: 50%;
    right: 1em;
    transform: translateY(-50%);
    pointer-events: none;
  }
`
const Selector = styled.select`
  width: 100%;
  background-color: #eee !important;
  padding-left: 1em;
  line-height: 2.4em;
  box-shadow: 0 0 4px 2px #ddd inset;
  outline: none;
`