import boto3
from models import Band
from dotenv import load_dotenv
import os
load_dotenv(dotenv_path="../../backend/.env")

def fetch_bands_from_dynamodb(table_name: str, region="ap-northeast-1"):
    region = os.getenv("AWS_REGION", "ap-northeast-1")
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
        # start_time = int(item.get("start_time", 0))
        # end_time = int(item.get("end_time", 19))
        start_time = 0
        end_time = 19
        bands.append(Band(name, members, start_time, end_time))

    return bands