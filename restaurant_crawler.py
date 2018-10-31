#-*- coding: utf-8 -*-
import json
from pprint import pprint

with open('code.json') as data_file:    
    data = json.load(data_file)

code_data = []
for d in data:
    code_data.append({'id':d['H_DNG_CD'], 'name':d['DO_NM'] + d['CT_NM'] + d['H_DNG_NM']})

pprint(code_data)