import { Request, Response } from "express";
import AWS from "aws-sdk";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, ".env") });

const dynamo = new AWS.DynamoDB.DocumentClient({
    region: process.env.AWS_REGION,
});

const TABLE_NAME = process.env.DYNAMO_TABLE_NAME!;

export const getMembersHandler = async (req: Request, res: Response) => {
    try {
        const result = await dynamo
            .scan({
                TableName: TABLE_NAME,
                ProjectionExpression: "#n",
                ExpressionAttributeNames: {
                    "#n": "name",
                }
            })
            .promise();
        
        const members = result.Items?.map((item) => item.name).filter(Boolean) ?? [];

        res.status(200).json({ members });
    } catch (err: any) {
        console.error("DynamoDB scan error:", err);
        res.status(500).json({ error: "Failed to fetch members" });
    }
}