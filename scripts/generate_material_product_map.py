import json
import os

INPUT_PATH = './public/data/factory.json'
OUTPUT_PATH = './public/data/material_product_map.json'

def generate_material_list():
  with open(INPUT_PATH, 'r', encoding='utf-8') as f:
    data = json.load(f)

  material_dict = {}

  for _, factory_data in data.items():
    for product_name, production_data in factory_data.get('products').items():
      for material_name, _ in production_data.get('input').items():
        if material_name not in material_dict.keys():
          material_dict[material_name] = []
        if product_name not in material_dict[material_name]:
          material_dict[material_name].append(product_name)

  with open(OUTPUT_PATH, 'w', encoding='utf-8') as f:
    json.dump(material_dict, f, ensure_ascii=False, indent=2)

if __name__ == "__main__":
  generate_material_list()