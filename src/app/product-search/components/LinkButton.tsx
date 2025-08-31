import React from 'react'
import Link from 'next/link'
import styled from 'styled-components';
import { COLOR } from '@/utils/color';

type Props = {
  $url: string,
  $productName: string,
  $productType: string,
  $text?: string,
}

const LinkButton: React.FC<Props> = ({$url, $productName, $productType, $text}) => {
  const text = $text || "詳細はこちら";
  return (
    <Wrapper>
      <Link href={{
        pathname: $url,
        query: {productName: $productName, productType: $productType}
      }}>
        {text}
      </Link>
    </Wrapper>
  )
}

export default LinkButton

const Wrapper = styled.div`
  width: fit-content;
  font-size: max(0.4em, 10px);
  background-image: linear-gradient(90deg, ${COLOR.main2} 2%, ${COLOR.main1});
  color: white;
  border-radius: 4px;
  a {
    display: inline-block;
    width: 100%;
    height: 100%;
    padding: 0 1em;
  }
`