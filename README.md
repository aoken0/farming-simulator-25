# farming-simulator-25

## ゲーム内データ

* `selling_price.json`  
  製品(作物、生産品等)の売値情報

* `factory.json`  
  工場の情報(価格、容量、生産工程等)

* `product.json`  
  生産品の情報(生産できる工場、別名等)

* `alias_map.json`  
  `product.json`から自動生成。各生産品別名から生産品名の辞書。以下のコード実行。
  ```
  python scripts/generate_alias_map.py
  ```

## 難易度と価格減少割合

| 難易度 | 価格比 |
| -- | -- |
| イージー | 1 |
| ノーマル | 3/5 |
| ハード | 1/3 |

## パッケージ
```
yarn add styled-components
yarn add framer-motion
yarn add -D typescript @types/node ts-node
yarn add @tanstack/react-query
```