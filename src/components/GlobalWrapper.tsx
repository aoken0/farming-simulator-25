import styled from "styled-components"

type Props = {
  children: React.ReactNode
}

const GlobalWrapper: React.FC<Props> = ({children}) => {
  return (
    <Wrapper>
      <Header>
        <h1><a href="">Farming Simulator 25 wiki</a></h1>
      </Header>
      <ContentWrapper>
        <SideCotent>
          <h4>価格</h4>
          <p>売値</p>
        </SideCotent>
        <MainContent>
          {children}
        </MainContent>
      </ContentWrapper>
    </Wrapper>
  )
}

export default GlobalWrapper

const Wrapper = styled.div`
  width: 72%;
  padding-bottom: 1em;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  gap: 32px;
  font-size: 32px;
  @media screen and (max-width: 768px) {
    width: 96%;
    font-size: 28px;
  }
`
const Header = styled.header`
  width: 100%;
  background-color: #444;
  padding: 0 1em;
  @media screen and (max-width: 768px) {
    width: 100vw;
  }
  h1 {
    width: fit-content;
    color: white;
    font-size: 1em;
    line-height: 3em;
    cursor: pointer;
  }
`
const ContentWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  // background-color: #fff;
  // box-shadow: 0 0 2px 2px #ddd;
  // padding: 1em;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: start;
  gap: 0.5em;
`
const SideCotent = styled.nav`
  width: 25%;
  min-width: 180px;
  background-color: white;
  box-shadow: 0 0 2px 1px #ddd;
  h4 {
    padding: 0 0.5em;
    font-size: 0.6em;
    font-weight: bold;
    line-height: 2em;
    color: white;
    background-color:rgb(0, 109, 24);
  }
  p {
    padding: 0 0.5em;
    font-size: 0.5em;
    line-height: 2em;
  }
`
const MainContent = styled.div`
  width: 75%;
  background-color: white;
  box-shadow: 0 0 2px 1px #ddd;
`