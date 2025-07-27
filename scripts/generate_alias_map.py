import json
import os

INPUT_PATH = './public/data/product.json'
OUTPUT_PATH = './public/data/alias_map.json'

def generate_alias_map():
  with open(INPUT_PATH, 'r', encoding='utf-8') as f:
    data = json.load(f)

  alias_map = {}

  for product_name, info in data.items():
    aliases = info.get('alias', [])
    for alias in aliases:
      alias_map[alias] = product_name

  with open(OUTPUT_PATH, 'w', encoding='utf-8') as f:
    json.dump(alias_map, f, ensure_ascii=False, indent=2)

if __name__ == "__main__":
  generate_alias_map()
