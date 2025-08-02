from scheduler import schedule
import json

def lambda_handler(event, context):
    result = schedule(
        studio_num=event.get("studio_num", 14),
        period_num=event.get("period_num", 20),
        rehearsal_min_num=event.get("rehearsal_num", 1),
    )

    if result is None:
        return {
            "statusCode": 200,
            "body": "can't find answer"
        }

    result_list = [{"band": b, "period": p, "studio": s} for (b, p, s) in result]
    return {
        "statusCode": 200,
        "body": json.dumps({"result": result_list})
    }
