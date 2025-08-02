import boto3
import os
from models import Band

def fetch_bands_from_dynamodb():
    region = os.environ["AWS_REGION"]
    table_name = os.environ["TABLE_NAME"]
    
    dynamodb = boto3.resource("dynamodb", region_name=region)
    table = dynamodb.Table(table_name)
    response = table.scan()
    items = response.get("Items", [])

    bands = []
    for item in items:
        name = item["name"]
        members = (
            item.get("vocal_names", []) +
            item.get("guitar_names", []) +
            item.get("bass_names", []) +
            item.get("drum_names", []) +
            item.get("keyboard_names", []) +
            item.get("other_names", [])
        )
        members = list(set(members))
        start_time = int(item.get("start_time", 0))
        end_time = int(item.get("end_time", 19))
        bands.append(Band(name, members, start_time, end_time))

    return bands
