"use client";

import GlobalWrapper from "@/components/GlobalWrapper"
import data from '../../../public/data/selling_price.json'

const SellingPrice = () => {
  return (
    <GlobalWrapper>
      {data.map((item, index) => (
        <div key={index}>
          {item.name}：{item.maxPrice}円
        </div>
      ))}
    </GlobalWrapper>
  )
}

export default SellingPrice