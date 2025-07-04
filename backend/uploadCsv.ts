import { Request, Response } from "express";
import { parse } from "csv-parse/sync";
import AWS from "aws-sdk";

const dynamo = new AWS.DynamoDB.DocumentClient({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
const TABLE_NAME = process.env.DYNAMO_TABLE_NAME!;

export const uploadCsvHandler = async (req: Request, res: Response) => {
    try {
        const csv = req.body;

        const records = parse(csv, {
            columns: true,
            skip_empty_lines: true,
        });

        for (const record of records) {
            await dynamo
                .put({
                    TableName: TABLE_NAME,
                    Item: record,
                })
                .promise();
        }

        res.status(200).json({ message: "CSV imported to DynamoDB"});
    } catch (err: any) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
}