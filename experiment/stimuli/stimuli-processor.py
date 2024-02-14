import csv
import json

masc = ['Transgender Man', 'Trans Man', 'Biological Female']
fem = ['Transgender Woman', 'Trans Woman', 'Biological Male']

def csv_to_json(csv_file_path, json_file_path):
    replacements = ['Transgender Woman', 'Trans Woman', 'Biological Male', 'Transgender Man', 'Trans Man', 'Biological Female']
    data = []
    id_counter = 1

    with open(csv_file_path, 'r') as csv_file:
        reader = csv.DictReader(csv_file)
        for row in reader:
            row['text'] = row['text'].title()  # Convert to title case
            if row['dataType'] == 'Critical':
                for replacement in replacements:
                    new_row = row.copy()
                    new_row['text'] = new_row['text'].replace('%%', replacement)
                    if replacement in masc:
                        new_row['text'] = new_row['text'].replace('$$', "Men's")
                    elif replacement in fem:
                        new_row['text'] = new_row['text'].replace('$$', "Women's")
                    new_row['refExp'] = replacement
                    new_row['id'] = id_counter
                    data.append(new_row)
            else:
                row['id'] = id_counter
                if row['dataType'] == 'Attention':
                    row['correct'] = row['source']
                data.append(row)
            id_counter += 1

    with open(json_file_path, 'w') as json_file:
        json.dump(data, json_file, indent=4)

# Use the function
csv_to_json('stimuli.csv', 'stimuli.json')
