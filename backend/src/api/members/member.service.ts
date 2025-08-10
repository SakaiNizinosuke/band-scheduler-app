import { dynamo, MEMBERS_TABLE_NAME } from "../../lib/dynamo";
import { parse } from "csv-parse/sync";

export const getMembers = async () => {
  const result = await dynamo
    .scan({
      TableName: MEMBERS_TABLE_NAME,
      ProjectionExpression: "#n",
      ExpressionAttributeNames: {
        "#n": "name",
      },
    })
    .promise();
  return result.Items?.map((item) => item.name).filter(Boolean) ?? [];
};

export const uploadMembersCsv = async (csvString: string) => {
  const records = parse(csvString, {
    columns: true,
    skip_empty_lines: true,
  });

  for (const record of records) {
    try {
      if (!record.id) {
        throw new Error("ID is missing");
      }
      record.id = Number(record.id);
      if (Number.isNaN(record.id)) {
        throw new Error(`idの値が数値に変換できませんでした: ${record.id}`);
      }

      await dynamo
        .put({
          TableName: MEMBERS_TABLE_NAME,
          Item: record,
        })
        .promise();
    } catch (err: any) {
      console.error("DynamoDBへの書き込みに失敗しました", err);
    }
  }
};
