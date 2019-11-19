import json

try:
    card_set = json.load(open('templates/set1-en_us.json'))
    print("card_set loaded")
except:
    card_set = {}
    print("card_set failed to load")
