import { Request, Response } from "express";
import { parse } from "csv-parse/sync";
import AWS from "aws-sdk";
import dotenv from "dotenv";
import path from "path"
dotenv.config({ path: path.resolve(__dirname, ".env") });

const dynamo = new AWS.DynamoDB.DocumentClient({
    region: process.env.AWS_REGION,
});
const TABLE_NAME = process.env.DYNAMO_TABLE_NAME!;

export const uploadCsvHandler = async (req: Request, res: Response) => {
    try {
        const csv = req.body;

        const records = parse(csv, {
            columns: true,
            skip_empty_lines: true,
        });

        console.log("パース後のレコード数:", records.length);
        console.log("最初のレコード:", records[0]);

        for (const record of records) {
            try {
                if (!record.id) {
                    throw new Error("CSVのレコードに'id'フィールドがありません")
                }
                record.id = Number(record.id)
                if (Number.isNaN(record.id)) {
                    throw new Error(`idの値が数値に変換できませんでした: ${record.id}`)
                }

                console.log("A")
                await dynamo
                    .put({
                        TableName: TABLE_NAME,
                        Item: record,
                    })
                    .promise();

                console.log("B")
            } catch (err: any) {
                console.error("DynamoDBへの書き込みに失敗しました", err)
            }
        }

        console.log("hehe")

        res.status(200).json({ message: "CSV imported to DynamoDB"});
        console.log("hoge")

    } catch (err: any) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
}