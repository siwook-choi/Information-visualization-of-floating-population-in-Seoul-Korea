#-*- coding: utf-8 -*-
import json
from pprint import pprint

enum_food = [
    {'id_num': 1, 'name': "韓国料理"},
    {'id_num': 2, 'name': "洋食"},
    {'id_num': 3, 'name': "アジア料理"},
    {'id_num': 4, 'name': "和食"},
    {'id_num': 5, 'name': "中国料理"},
    {'id_num': 6, 'name': "屋台料理"},
    {'id_num': 7, 'name': "カフェ"},
    {'id_num': 8, 'name': "バイキング"},
    {'id_num': 9, 'name': "etc"}
]


with open('code.json', 'r', encoding='utf-8') as data_file:
    data = json.load(data_file)

code_data = []
for d in data:
    code_data.append(
        {'id_num': d['H_DNG_CD'], 'name': d['DO_NM'] + d['CT_NM'] + d['H_DNG_NM']})

for address in code_data:
    for food in enum_food:
        url = "https://store.naver.com/restaurants/list?filterId=r09110115&menu=" + str(food['id_num']) + "&query=" + address['name'] + "%20%EB%A7%9B%EC%A7%91"
        pprint(url)
